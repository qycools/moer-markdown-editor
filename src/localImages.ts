import { open, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import * as vscode from 'vscode';

const imageTypes: Record<string, string> = {
  '.png': 'png', '.jpg': 'jpeg', '.jpeg': 'jpeg', '.gif': 'gif', '.webp': 'webp',
  '.bmp': 'bmp', '.svg': 'svg+xml', '.avif': 'avif', '.ico': 'x-icon',
};
const maxBytes = 20 * 1024 * 1024;

function inside(root: string, filename: string) {
  const relative = path.relative(root, filename);
  return relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative);
}

async function resolveLocalImage(source: string, document: vscode.Uri, roots: readonly vscode.Uri[]) {
  if (document.scheme !== 'file' || !source || source.length > 16384 || source.startsWith('//')) return;
  let filename: string;
  if (/^file:/i.test(source)) filename = vscode.Uri.parse(source).fsPath;
  else {
    const decoded = decodeURIComponent(source.split(/[?#]/, 1)[0]);
    const windowsPath = process.platform === 'win32' && /^[a-z]:[\\/]/i.test(decoded);
    if (!windowsPath && /^[a-z][a-z\d+.-]*:/i.test(decoded)) return;
    const workspace = vscode.workspace.getWorkspaceFolder(document)?.uri;
    filename = decoded.startsWith('/') && workspace?.scheme === 'file'
      ? path.resolve(workspace.fsPath, '.' + decoded)
      : path.resolve(path.dirname(document.fsPath), decoded);
  }
  const candidates = roots.filter(root => root.scheme === 'file' && inside(root.fsPath, filename));
  if (!candidates.length) return;
  const canonical = await realpath(filename);
  const approvedRoots = await Promise.allSettled(candidates.map(root => realpath(root.fsPath)));
  if (approvedRoots.some(root => root.status === 'fulfilled' && inside(root.value, canonical))) return { canonical, filename };
}

export async function imageReferenceStatus(source: string, document: vscode.Uri, roots: readonly vscode.Uri[]) {
  if (/^(?:https?:|data:|blob:|\/\/)/i.test(source)) return 'ignored';
  try {
    const file = await resolveLocalImage(source, document, roots);
    if (!file) return 'unverified';
    return (await stat(file.canonical)).isFile() ? 'available' : 'missing';
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code === 'ENOENT' || code === 'ENOTDIR' ? 'missing' : 'unverified';
  }
}

export async function localImageData(source: string, document: vscode.Uri, roots: readonly vscode.Uri[]) {
  try {
    const file = await resolveLocalImage(source, document, roots);
    if (!file) return;
    const mime = imageTypes[path.extname(file.filename).toLowerCase()];
    if (!mime) return;

    const handle = await open(file.canonical, 'r');
    try {
      const stat = await handle.stat();
      if (!stat.isFile() || stat.size > maxBytes) return;
      const bytes = await handle.readFile();
      if (bytes.length && bytes.length <= maxBytes) return `data:image/${mime};base64,${bytes.toString('base64')}`;
    } finally {
      await handle.close();
    }
  } catch {
    return;
  }
}
