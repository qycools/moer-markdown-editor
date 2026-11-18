import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { browserCandidates, expandHome } from '../src/browser';
import { findBrowser } from '../src/export';

export async function checkPlatforms() {
  assert.equal(expandHome('~/Documents', '/Users/tester', 'darwin'), '/Users/tester/Documents');
  assert.equal(expandHome('~', '/Users/tester', 'darwin'), '/Users/tester');
  assert.equal(expandHome('~\\Documents', 'C:\\Users\\tester', 'win32'), 'C:\\Users\\tester\\Documents');
  const candidates = browserCandidates('', 'darwin', '/Users/tester');
  assert.ok(candidates.includes('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'));
  assert.ok(candidates.includes('/Users/tester/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'));
  assert.equal(browserCandidates('~/Applications/Brave Browser.app', 'darwin', '/Users/tester')[0], '/Users/tester/Applications/Brave Browser.app/Contents/MacOS/Brave Browser');
  assert.deepEqual(browserCandidates('/custom/chrome', 'darwin'), ['/custom/chrome']);
  assert.ok(browserCandidates('', 'win32', '', { PROGRAMFILES: 'D:\\Apps' }).includes('D:\\Apps\\Google\\Chrome\\Application\\chrome.exe'));
  const folder = await mkdtemp(path.join(os.tmpdir(), 'moer-browser-'));
  try {
    const file = path.join(folder, 'browser'); await writeFile(file, 'fixture');
    assert.equal(await findBrowser(file), file);
    const directory = path.join(folder, 'directory'); await mkdir(directory);
    await assert.rejects(findBrowser(directory), /浏览器不存在/);
  } finally {
    if (path.dirname(folder) !== path.resolve(os.tmpdir()) || !path.basename(folder).startsWith('moer-browser-')) throw new Error('Unexpected temporary directory');
    await rm(folder, { recursive: true, force: true });
  }
  console.log('PASS platform browser discovery, app paths, home expansion and directory rejection');
}
