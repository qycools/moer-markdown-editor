import { open, realpath } from 'node:fs/promises';
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

export async function localImageData(source: string, document: vscode.Uri, roots: readonly vscode.Uri[]) {
  if (document.scheme !== 'file' || !source || source.length > 16384 || source.startsWith('//')) return;
  try {
    let filename: string;
    if (/^file:/i.test(source)) {
      filename = vscode.Uri.parse(source).fsPath;
    } else {
      const spelling = source.split(/[?#]/, 1)[0];
      const decoded = decodeURIComponent(spelling);
      if (process.platform === 'win32' && /^[a-z]:[\\/]/i.test(decoded)) {
        filename = path.normalize(decoded);
      } else {
        if (/^[a-z][a-z\d+.-]*:/i.test(decoded)) return;
        const workspace = vscode.workspace.getWorkspaceFolder(document)?.uri;
        filename = decoded.startsWith('/') && workspace?.scheme === 'file'
          ? path.resolve(workspace.fsPath, '.' + decoded)
          : path.resolve(path.dirname(document.fsPath), decoded);
      }
    }
    const mime = imageTypes[path.extname(filename).toLowerCase()];
    const candidates = roots.filter(root => root.scheme === 'file' && inside(root.fsPath, filename));
    if (!mime || !candidates.length) return;
    const canonical = await realpath(filename);
    const approvedRoots = await Promise.allSettled(candidates.map(root => realpath(root.fsPath)));
    if (!approvedRoots.some(root => root.status === 'fulfilled' && inside(root.value, canonical))) return;

    const handle = await open(canonical, 'r');
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
