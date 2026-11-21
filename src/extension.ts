import * as vscode from 'vscode';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { expandHome } from './browser';
import { commands, APP_NAME, defaults, escapeHTML, minimalEdit, PREFIX, VIEW_TYPE, type HistoryLocation, type Settings, validateExport, validPageWidth, validPalette } from './shared';
import { exportDocument } from './export';
import { themeCatalog, clearThemeCache } from './codeTheme';
import { localImageData } from './localImages';

type Session = { panel: vscode.WebviewPanel; document: vscode.TextDocument; queue: Promise<void>; applying: boolean; id: string; dialogOpen: boolean; canGoBack: boolean };
const sessions = new Set<Session>();
let active: Session | undefined;

export function activate(context: vscode.ExtensionContext) {
  const setActive = (session?: Session) => {
    active = session;
    void vscode.commands.executeCommand('setContext', 'vditorMarkdown.dialogOpen', session?.dialogOpen ?? false);
    void vscode.commands.executeCommand('setContext', 'vditorMarkdown.canGoBack', session?.canGoBack ?? false);
  };
  const settings = (uri?: vscode.Uri): Settings => {
    const config = vscode.workspace.getConfiguration(PREFIX, uri);
    return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, config.get(key, value)])) as Settings;
  };
  const sendConfig = (session: Session) => {
    const catalog = themeCatalog();
    return session.panel.webview.postMessage({
      type: 'config', settings: settings(session.document.uri), dark: isDark(), ...catalog,
      codePalette: catalog.themes.find(theme => theme.id === catalog.activeTheme)?.tokens || {},
      exportDefaults: vscode.workspace.getConfiguration(PREFIX, session.document.uri).get('exportDefaults', {}),
    });
  };
  const provider: vscode.CustomTextEditorProvider = {
    async resolveCustomTextEditor(document, panel) {
      const session: Session = { document, panel, queue: Promise.resolve(), applying: false, id: randomBytes(8).toString('hex'), dialogOpen: false, canGoBack: false };
      sessions.add(session);
      if (panel.active) setActive(session);
      const documentDirectory = vscode.Uri.joinPath(document.uri, '..');
      const imageRoots = [documentDirectory, ...(vscode.workspace.workspaceFolders || []).map(f => f.uri)];
      const roots = [context.extensionUri, ...imageRoots];
      let imageQueue = Promise.resolve();
      panel.webview.options = { enableScripts: true, localResourceRoots: roots };
      panel.webview.html = webviewHTML(panel.webview, context, document, settings(document.uri));
      const disposables = [
        panel.onDidChangeViewState(() => {
          if (panel.active) setActive(session);
          else if (active === session) setActive();
        }),
        vscode.workspace.onDidChangeTextDocument(e => {
          if (e.document.uri.toString() === document.uri.toString() && !session.applying) {
            const action = e.reason === vscode.TextDocumentChangeReason.Undo ? 'undo' : e.reason === vscode.TextDocumentChangeReason.Redo ? 'redo' : undefined;
            const offset = e.contentChanges.reduce((first, change) => Math.min(first, change.rangeOffset), Infinity);
            const history: HistoryLocation | undefined = action && Number.isFinite(offset) ? { action, offset } : undefined;
            void panel.webview.postMessage({ type: 'document', text: document.getText(), version: document.version, history });
          }
        }),
        panel.webview.onDidReceiveMessage(message => {
          const handle = () => handleMessage(message, session).catch(error => {
            const text = error instanceof Error ? error.message : String(error);
            void panel.webview.postMessage({ type: 'error', message: text, requestId: message?.requestId });
            void vscode.window.showErrorMessage(`${APP_NAME}：${text}`);
          });
          if (message?.type === 'localImage') imageQueue = imageQueue.then(handle);
          else session.queue = session.queue.then(handle);
        }),
      ];
      panel.onDidDispose(() => { sessions.delete(session); if (active === session) setActive(); disposables.forEach(d => d.dispose()); });
      async function handleMessage(message: any, s: Session) {
        if (!message || typeof message.type !== 'string') return;
        const reply = (value: unknown) => panel.webview.postMessage({ type: 'result', requestId: message.requestId, value });
        switch (message.type) {
          case 'ready':
            await panel.webview.postMessage({ type: 'document', text: document.getText(), version: document.version, initial: true });
            await sendConfig(s); break;
          case 'edit': {
            if (typeof message.text !== 'string' || typeof message.baseText !== 'string' || message.text.length > 32 * 1024 * 1024) throw new Error('文档同步消息无效。');
            const current = document.getText();
            const eol = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';
            const next = message.text.replace(/\r?\n/g, eol);
            if (current !== message.baseText && current !== next) {
              const backup = await vscode.workspace.openTextDocument({ language: 'markdown', content: next });
              await vscode.window.showTextDocument(backup, { preview: false });
              await panel.webview.postMessage({ type: 'document', text: current, version: document.version });
              throw new Error('检测到并发修改，未覆盖文件。你的编辑已保留在新的未保存文档中。');
            }
            const diff = minimalEdit(current, next);
            s.applying = true;
            try {
              if (diff) {
                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, new vscode.Range(document.positionAt(diff.start), document.positionAt(diff.end)), diff.text);
                if (!await vscode.workspace.applyEdit(edit)) throw new Error('无法更新文档，文件可能为只读。');
              }
            } finally { s.applying = false; }
            await panel.webview.postMessage({ type: 'ack', seq: message.seq, text: document.getText(), version: document.version });
            break;
          }
          case 'save':
            if (!await document.save()) throw new Error('文件未保存，请检查路径和写入权限。');
            await panel.webview.postMessage({ type: 'saved' }); await reply(true); break;
          case 'source':
            await vscode.commands.executeCommand('vscode.openWith', document.uri, 'default', { viewColumn: panel.viewColumn }); break;
          case 'undo': case 'redo':
            await vscode.commands.executeCommand(message.type); break;
          case 'shortcuts':
            await vscode.commands.executeCommand('workbench.action.openGlobalKeybindings', `@ext:${context.extension.id}`); break;
          case 'clipboardWrite':
            if (typeof message.text !== 'string') throw new Error('剪贴板内容无效。');
            await vscode.env.clipboard.writeText(message.text); await reply(true); break;
          case 'localImage':
            await reply(typeof message.source === 'string' ? await localImageData(message.source, document.uri, imageRoots) ?? null : null);
            break;
          case 'dialog':
            s.dialogOpen = !!message.open;
            if (panel.active) await vscode.commands.executeCommand('setContext', 'vditorMarkdown.dialogOpen', s.dialogOpen); break;
          case 'linkHistory':
            s.canGoBack = message.canGoBack === true;
            if (panel.active) await vscode.commands.executeCommand('setContext', 'vditorMarkdown.canGoBack', s.canGoBack);
            break;
          case 'setting': {
            if (!(message.key in defaults) || typeof message.value !== typeof defaults[message.key as keyof Settings]) throw new Error('设置项无效。');
            if (message.key === 'browserPath' && !vscode.workspace.isTrusted) throw new Error('请先信任工作区再配置浏览器。');
            if (message.key === 'pageWidth' && !validPageWidth(message.value)) throw new Error('页面宽度应为 100% 或 240–6000px 范围内的固定尺寸。');
            if (['textColors', 'backgroundColors'].includes(message.key) && !validPalette(message.value)) throw new Error('每组配色应包含 1–8 个十六进制颜色。');
            if (message.key === 'outlineWidth' && (!Number.isFinite(message.value) || message.value < 120 || message.value > 1600)) throw new Error('大纲宽度超出范围。');
            if (['theme', 'codeTheme'].includes(message.key) && message.value !== 'auto' && !themeCatalog().themes.some(theme => theme.id === message.value)) throw new Error('该主题当前不可用，请重新选择已安装的主题。');
            if (message.key === 'theme') await vscode.workspace.getConfiguration(PREFIX).update('colorMode', 'auto', vscode.ConfigurationTarget.Global);
            await vscode.workspace.getConfiguration(PREFIX).update(message.key, message.value, vscode.ConfigurationTarget.Global);
            await reply(true); break;
          }
          case 'resetSettings':
            for (const key of Object.keys(defaults)) await vscode.workspace.getConfiguration(PREFIX).update(key, undefined, vscode.ConfigurationTarget.Global);
            await reply(true); break;
          case 'browse': {
            const folder = await vscode.window.showOpenDialog({ canSelectFiles: false, canSelectFolders: true, canSelectMany: false, openLabel: '选择导出目录', defaultUri: vscode.Uri.file(path.dirname(document.uri.fsPath)) });
            await reply(folder?.[0].fsPath); break;
          }
          case 'exportMindmap': {
            const { format, text, detailed } = message;
            if ((format !== 'svg' && format !== 'md') || typeof text !== 'string' || !text || text.length > 32 * 1024 * 1024) {
              throw new Error('思维导图导出数据无效。');
            }
            const stem = path.basename(document.uri.fsPath).replace(/\.(md|markdown)$/i, '') || '文档';
            const folder = document.isUntitled ? vscode.workspace.workspaceFolders?.[0]?.uri : documentDirectory;
            const filename = `${stem}-${detailed ? '详细' : '精简'}思维导图.${format}`;
            const target = await vscode.window.showSaveDialog({
              defaultUri: folder && vscode.Uri.joinPath(folder, filename),
              filters: { [format === 'svg' ? 'SVG 矢量图' : 'Markdown']: [format] },
              saveLabel: '导出思维导图',
            });
            if (!target) { await reply({ cancelled: true }); break; }
            const temporary = target.with({ path: `${target.path}.${randomBytes(5).toString('hex')}.tmp` });
            try {
              await vscode.workspace.fs.writeFile(temporary, Buffer.from(text, 'utf8'));
              await vscode.workspace.fs.rename(temporary, target, { overwrite: true });
            } catch (error) {
              await vscode.workspace.fs.delete(temporary).then(undefined, () => {});
              throw error;
            }
            await reply({ path: target.fsPath });
            break;
          }
          case 'export': {
            if (!vscode.workspace.isTrusted) throw new Error('请先信任工作区，再运行本机导出。');
            const options = validateExport(message.options);
            const sourceDir = path.dirname(document.uri.fsPath);
            let directory = expandHome(options.directory.replaceAll('${fileDir}', sourceDir));
            if (!path.isAbsolute(directory)) directory = path.resolve(sourceDir, directory);
            const stem = path.basename(document.uri.fsPath).replace(/\.(md|markdown)$/i, '') || 'document';
            const target = await vscode.window.showSaveDialog({ defaultUri: vscode.Uri.file(path.join(directory, `${stem}.${options.format}`)), filters: { [options.format.toUpperCase()]: [options.format] }, saveLabel: '导出' });
            if (!target) { await reply({ cancelled: true }); break; }
            const result = await vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: `正在导出 ${options.format.toUpperCase()}`, cancellable: true }, async (progress, token) => {
              const abort = new AbortController();
              const listener = token.onCancellationRequested(() => abort.abort());
              try {
                const current = settings(document.uri), catalog = themeCatalog();
                const resolveTheme = (id: string) => catalog.themes.find(theme => theme.id === (id === 'auto' ? catalog.activeTheme : id));
                return await exportDocument({ root: context.extensionPath, markdown: document.getText(), sourcePath: document.uri.fsPath, outputPath: target.fsPath, options, settings: current, dark: isDark(), appearance: { page: resolveTheme(current.theme), code: resolveTheme(current.codeTheme) }, signal: abort.signal, progress: text => progress.report({ message: text }) });
              } finally { listener.dispose(); }
            });
            await vscode.workspace.getConfiguration(PREFIX).update('exportDefaults', options, vscode.ConfigurationTarget.Global);
            await reply(result);
            void vscode.window.showInformationMessage(`已导出：${target.fsPath}`, '打开文件', '显示所在目录').then(async selected => {
              if (selected === '打开文件') await vscode.env.openExternal(target);
              if (selected === '显示所在目录') await vscode.commands.executeCommand('revealFileInOS', target);
            });
            break;
          }
          case 'image': {
            if (!vscode.workspace.isTrusted) throw new Error('请先信任工作区再保存图片。');
            if (document.isUntitled) throw new Error('请先保存 Markdown 文件，再插入本地图片。');
            if (typeof message.data !== 'string' || message.data.length > 28 * 1024 * 1024 || !/^image\/(png|jpeg|gif|webp|bmp)$/.test(message.mime)) throw new Error('仅支持 20MB 以内的 PNG、JPEG、GIF、WebP 和 BMP 图片。');
            const ext = message.mime.split('/')[1].replace('jpeg', 'jpg');
            const filename = `image-${Date.now()}-${randomBytes(3).toString('hex')}.${ext}`;
            const folder = vscode.Uri.file(path.join(sourceDirFor(document), 'assets'));
            await vscode.workspace.fs.createDirectory(folder);
            await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(folder, filename), Buffer.from(message.data, 'base64'));
            await reply(`assets/${filename}`); break;
          }
          case 'openLink': {
            if (typeof message.href !== 'string' || !message.href) return;
            const href = message.href;
            const scheme = /^[a-z][a-z\d+.-]*:/i.exec(href)?.[0].toLowerCase();
            if (scheme === 'http:' || scheme === 'https:' || scheme === 'mailto:' || href.startsWith('//')) {
              await vscode.env.openExternal(vscode.Uri.parse(href.startsWith('//') ? `https:${href}` : href));
            } else if (scheme === 'file:') await vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(href));
            else if (!scheme || (process.platform === 'win32' && /^[a-z]:[\\/]/i.test(href))) {
              const parts = vscode.Uri.parse(href);
              const spelling = href.split(/[?#]/, 1)[0];
              let filename = spelling;
              try { filename = decodeURIComponent(spelling); } catch { /* A literal percent is valid in a filename. */ }
              const target = vscode.Uri.file(path.resolve(sourceDirFor(document), filename)).with({ fragment: parts.fragment, query: parts.query });
              await vscode.commands.executeCommand('vscode.open', target);
            }
            break;
          }
        }
      }
    },
  };
  context.subscriptions.push(vscode.window.registerCustomEditorProvider(VIEW_TYPE, provider, { supportsMultipleEditorsPerDocument: true, webviewOptions: { retainContextWhenHidden: true } }));
  context.subscriptions.push(vscode.commands.registerCommand(`${PREFIX}.open`, async (uri?: vscode.Uri) => {
    const target = uri || vscode.window.activeTextEditor?.document.uri || active?.document.uri;
    if (target) await vscode.commands.executeCommand('vscode.openWith', target, VIEW_TYPE);
  }));
  for (const [id] of commands) context.subscriptions.push(vscode.commands.registerCommand(`${PREFIX}.${id}`, async () => {
    if (active) await active.panel.webview.postMessage({ type: 'command', action: id });
  }));
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => { if ([PREFIX, 'workbench.colorTheme', 'workbench.colorCustomizations', 'editor.tokenColorCustomizations'].some(key => e.affectsConfiguration(key))) for (const session of sessions) void sendConfig(session); }));
  const refreshThemes = () => { clearThemeCache(); for (const session of sessions) void sendConfig(session); };
  context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(refreshThemes), vscode.extensions.onDidChange(refreshThemes));
}
function sourceDirFor(document: vscode.TextDocument) { return path.dirname(document.uri.fsPath); }
function isDark() { return [vscode.ColorThemeKind.Dark, vscode.ColorThemeKind.HighContrast].includes(vscode.window.activeColorTheme.kind); }
function webviewHTML(webview: vscode.Webview, context: vscode.ExtensionContext, document: vscode.TextDocument, settings: Settings) {
  const nonce = randomBytes(18).toString('base64');
  const asset = (name: string) => webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, name)).toString();
  const base = webview.asWebviewUri(document.uri).toString();
  const catalog = themeCatalog();
  const boot = JSON.stringify({ cdn: asset('media/vditor'), base, settings, dark: isDark(), ...catalog, codePalette: catalog.themes.find(theme => theme.id === catalog.activeTheme)?.tokens || {}, filename: path.basename(document.uri.fsPath) }).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} data: blob: https: http:; media-src ${webview.cspSource} https: http: data:; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource} data:; script-src 'nonce-${nonce}' ${webview.cspSource} 'wasm-unsafe-eval'; worker-src blob: ${webview.cspSource}; connect-src ${webview.cspSource}; object-src https://www.plantuml.com; frame-src https:;"><link href="${asset('dist/webview.css')}" rel="stylesheet"><title>${escapeHTML(path.basename(document.uri.fsPath))}</title></head><body><div id="app"><div id="editor"></div><footer id="status" aria-live="polite" hidden></footer></div><div id="overlay"></div><script nonce="${nonce}">window.VM_BOOT=${boot};</script><script nonce="${nonce}" src="${asset('dist/webview.js')}"></script></body></html>`;
}
export function deactivate() { sessions.clear(); active = undefined; }
