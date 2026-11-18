import { build } from 'esbuild';
import { runTests } from '@vscode/test-electron';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

await mkdir('.test-results', { recursive: true });
delete process.env.ELECTRON_RUN_AS_NODE;
await build({ entryPoints: ['test/integration.ts'], outfile: 'dist/integration-tests.cjs', bundle: true, platform: 'node', format: 'cjs', packages: 'external' });
await runTests({
  vscodeExecutablePath: path.join(process.env.LOCALAPPDATA, 'Programs/Microsoft VS Code/Code.exe'),
  extensionDevelopmentPath: [process.env.VM_EXTENSION_PATH || process.cwd(), path.resolve('test/fixtures/themes')], extensionTestsPath: path.resolve('dist/integration-tests.cjs'),
  launchArgs: ['--user-data-dir=' + path.resolve('.vscode-test/profile'), '--extensions-dir=' + path.resolve('.vscode-test/extensions'), '--disable-extensions', '--disable-workspace-trust', '--skip-welcome', '--skip-release-notes', '--remote-debugging-port=9337', '--disable-gpu'],
});
