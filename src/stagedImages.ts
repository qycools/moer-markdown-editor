import { randomUUID } from 'node:crypto';
import path from 'node:path';
import * as vscode from 'vscode';

const prefix = '.moye-pending-image/';
const filenamePattern = 'image-[a-f0-9-]{36}\\.(?:png|jpg|gif|webp|bmp)';
const stagedReference = `\\.${prefix.slice(1)}(${filenamePattern})`;
const stagedPath = new RegExp(`^${stagedReference}$`);
const stagedDestination = new RegExp(`(!\\[(?:\\\\.|[^\\]\\r\\n])*\\]\\([\\t ]*<?|^ {0,3}\\[[^\\r\\n\\]]+\\]:[\\t ]*<?|<img\\b[^<>]*?\\bsrc=["'])${stagedReference}(?=[>"'\\s)])`, 'gm');
const maxBytes = 20 * 1024 * 1024;
export const hasStagedReferences = (text: string) => [...text.matchAll(stagedDestination)].length > 0;

export function stagedImages(context: vscode.ExtensionContext) {
  const stage = vscode.Uri.joinPath(context.globalStorageUri, 'staged-images');
  const processing = new Set<string>();
  async function read(name: string, file = vscode.Uri.joinPath(stage, name)) {
    try {
      const stat = await vscode.workspace.fs.stat(file);
      if (stat.type !== vscode.FileType.File || stat.size > maxBytes) return;
      return await vscode.workspace.fs.readFile(file);
    } catch (error) {
      if (!(error instanceof vscode.FileSystemError && error.code === 'FileNotFound')) throw error;
    }
  }

  async function finalize(document: vscode.TextDocument) {
    if (!vscode.workspace.isTrusted || document.uri.scheme !== 'file' || document.languageId !== 'markdown' || document.isDirty) return;
    const key = document.uri.toString();
    const text = document.getText(), version = document.version;
    const destinations = [...text.matchAll(stagedDestination)];
    if (!destinations.length || processing.has(key)) return;
    processing.add(key);
    try {
      const saved = new Set<string>();
      const assets = vscode.Uri.joinPath(document.uri, '..', 'assets');
      for (const name of new Set(destinations.map(match => match[2]))) {
        const found = await findImage(name, document.uri);
        if (!found) continue;
        await vscode.workspace.fs.createDirectory(assets);
        const target = vscode.Uri.joinPath(assets, name);
        try {
          if (found.file.toString() !== target.toString()) await vscode.workspace.fs.copy(found.file, target, { overwrite: false });
        } catch (error) {
          if (!(error instanceof vscode.FileSystemError && error.code === 'FileExists')) throw error;
          if (!Buffer.from(await vscode.workspace.fs.readFile(target)).equals(found.bytes)) throw error;
        }
        saved.add(name);
      }
      if (!saved.size || document.isClosed || document.version !== version || document.isDirty) return;
      const edit = new vscode.WorkspaceEdit();
      for (const match of destinations) {
        if (!saved.has(match[2])) continue;
        const offset = match.index + match[1].length;
        edit.replace(document.uri, new vscode.Range(document.positionAt(offset), document.positionAt(offset + prefix.length)), 'assets/');
      }
      if (!await vscode.workspace.applyEdit(edit) || !await document.save()) throw new Error('无法保存图片整理后的 Markdown 文件。');
      await Promise.allSettled([...saved].map(name => rememberCopy(name, vscode.Uri.joinPath(assets, name))));
    } catch (error) {
      void vscode.window.showErrorMessage(`图片整理失败，仍可从暂存位置读取图片。${error instanceof Error ? ' ' + error.message : ''}`);
    } finally { processing.delete(key); }
  }

  function receipt(name: string) { return vscode.Uri.joinPath(stage, name + '.saved'); }
  function rememberCopy(name: string, file: vscode.Uri) {
    return vscode.workspace.fs.writeFile(receipt(name), Buffer.from(file.toString(), 'utf8'));
  }
  function inUse(name: string) {
    return vscode.workspace.textDocuments.some(document => document.getText().includes(prefix + name));
  }
  async function savedCopy(name: string, document: vscode.Uri, matches?: Uint8Array) {
    const recorded = await read(name, receipt(name));
    const saved = recorded ? vscode.Uri.parse(Buffer.from(recorded).toString('utf8')) : undefined;
    const adjacent = document.scheme === 'file' ? vscode.Uri.joinPath(document, '..', 'assets', name) : undefined;
    for (const file of [saved, adjacent]) {
      if (file?.scheme !== 'file' || path.basename(file.fsPath) !== name || path.basename(path.dirname(file.fsPath)) !== 'assets') continue;
      const bytes = await read(name, file);
      if (bytes?.length && (!matches || Buffer.from(bytes).equals(matches))) return { file, bytes };
    }
  }
  async function findImage(name: string, document: vscode.Uri) {
    const bytes = await read(name);
    return bytes?.length ? { file: vscode.Uri.joinPath(stage, name), bytes } : savedCopy(name, document);
  }
  async function findCleanableCopy(name: string, document: vscode.Uri) {
    if (inUse(name)) return;
    const bytes = await read(name);
    if (bytes?.length) return savedCopy(name, document, bytes);
  }
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(document => void finalize(document)));
  return {
    finalize,
    async status(source: string, document: vscode.Uri) {
      const filename = stagedPath.exec(source)?.[1];
      if (filename) return await findImage(filename, document) ? 'available' : 'missing';
    },
    async cleanup(document: vscode.Uri) {
      if (!vscode.workspace.isTrusted) throw new Error('请先信任工作区再清理暂存图片。');
      const entries = await vscode.workspace.fs.readDirectory(stage).then(undefined, error => {
        if (error instanceof vscode.FileSystemError && error.code === 'FileNotFound') return [];
        throw error;
      });
      const candidates: string[] = [];
      for (const [name, type] of entries) {
        if (type === vscode.FileType.File && stagedPath.test(prefix + name) && await findCleanableCopy(name, document)) candidates.push(name);
      }
      if (!candidates.length) return { removed: 0, failed: 0 };
      const answer = await vscode.window.showQuickPick([
        { label: '取消', confirmed: false },
        { label: '移到回收站', detail: '仅清理已有相同 assets 副本、且当前打开的文档未引用的暂存图片。', confirmed: true },
      ], { title: `清理 ${candidates.length} 张暂存图片`, ignoreFocusOut: true });
      if (!answer?.confirmed) return { cancelled: true };
      let removed = 0, failed = 0;
      for (const name of candidates) {
        try {
          const copy = await findCleanableCopy(name, document);
          if (!copy || inUse(name)) continue;
          await rememberCopy(name, copy.file);
          if (inUse(name)) continue;
          await vscode.workspace.fs.delete(vscode.Uri.joinPath(stage, name), { useTrash: true });
          removed++;
        } catch { failed++; }
      }
      return { removed, failed };
    },
    async write(document: vscode.TextDocument, mime: string, bytes: Uint8Array) {
      if (bytes.length > maxBytes) throw new Error('图片大小不能超过 20 MB。');
      const name = `image-${randomUUID()}.${mime.split('/')[1].replace('jpeg', 'jpg')}`;
      const folder = document.isUntitled ? stage : vscode.Uri.joinPath(document.uri, '..', 'assets');
      await vscode.workspace.fs.createDirectory(folder);
      await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(folder, name), bytes);
      return `${document.isUntitled ? prefix : 'assets/'}${name}`;
    },
    async data(source: string, document: vscode.Uri) {
      const filename = stagedPath.exec(source)?.[1];
      if (!filename) return;
      const found = await findImage(filename, document);
      const mime = filename.split('.').at(-1)!.replace('jpg', 'jpeg');
      if (found) return `data:image/${mime};base64,${Buffer.from(found.bytes).toString('base64')}`;
    },
  };
}
