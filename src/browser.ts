import os from 'node:os';
import path from 'node:path';

export function expandHome(target: string, home = os.homedir(), platform: NodeJS.Platform = process.platform): string {
  if (target === '~') return home;
  const paths = platform === 'win32' ? path.win32 : path.posix;
  return /^~[/\\]/.test(target) ? paths.join(home, target.slice(2)) : target;
}

export function browserCandidates(configured = '', platform: NodeJS.Platform = process.platform, home = os.homedir(), env: NodeJS.ProcessEnv = process.env): string[] {
  const paths = platform === 'win32' ? path.win32 : path.posix;
  const target = expandHome(configured.trim(), home, platform);
  if (target) {
    if (platform === 'darwin' && /\.app$/i.test(target)) {
      const apps = [paths.basename(target).replace(/\.app$/i, ''), 'Google Chrome', 'Microsoft Edge', 'Chromium', 'Brave Browser'];
      return [...new Set(apps)].map(app => paths.join(target, 'Contents/MacOS', app));
    }
    return [target];
  }
  if (platform === 'darwin') {
    const apps = ['Google Chrome', 'Microsoft Edge', 'Chromium', 'Brave Browser'];
    return ['/Applications', paths.join(home, 'Applications')].flatMap(root => apps.map(app => paths.join(root, `${app}.app/Contents/MacOS`, app)));
  }
  if (platform === 'win32') {
    return [
      paths.join(env['PROGRAMFILES(X86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
      paths.join(env.PROGRAMFILES || 'C:/Program Files', 'Microsoft/Edge/Application/msedge.exe'),
      paths.join(env.LOCALAPPDATA || '', 'Microsoft/Edge/Application/msedge.exe'),
      paths.join(env.PROGRAMFILES || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'),
      paths.join(env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe'),
    ];
  }
  return ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/microsoft-edge', '/usr/bin/microsoft-edge-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium'];
}
