import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const require = createRequire(import.meta.url);
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const output = path.join('artifacts', `${pkg.name}-${pkg.version}.vsix`);
await mkdir('artifacts', { recursive: true });
const args = ['package', '--out', output];
if (!pkg.repository) args.push('--allow-missing-repository');
const result = spawnSync(process.execPath, [require.resolve('@vscode/vsce/vsce'), ...args], { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const bytes = await readFile(output);
const sha256 = createHash('sha256').update(bytes).digest('hex');
await writeFile(`${output}.sha256`, `${sha256}  ${path.basename(output)}\n`);
console.log(`SHA-256: ${sha256}`);
