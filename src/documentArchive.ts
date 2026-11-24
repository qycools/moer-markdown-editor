import { createWriteStream } from 'node:fs';
import { lstat, readdir, realpath } from 'node:fs/promises';
import path from 'node:path';
import type { PassThrough } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { ZipFile } from 'yazl';

export async function writeDocumentArchive(filename: string, text: string, destination: string) {
  const root = path.join(await realpath(path.dirname(filename)), 'assets');
  const files: { file: string; entry: string }[] = [];
  const directories = ['assets/'];
  let skipped = 0;
  async function collect(folder: string, entry: string) {
    for (const name of await readdir(folder)) {
      const file = path.join(folder, name);
      const item = await lstat(file);
      const archiveName = entry + name;
      if (name.includes('\\')) { skipped++; continue; }
      if (item.isDirectory()) {
        directories.push(archiveName + '/');
        await collect(file, archiveName + '/');
      } else if (item.isFile()) {
        if (await realpath(file) === file) files.push({ file, entry: archiveName });
        else skipped++;
      } else skipped++;
    }
  }
  const assets = await lstat(root).catch(error => {
    if (error.code !== 'ENOENT') throw error;
  });
  if (assets?.isDirectory()) await collect(root, 'assets/');
  else if (assets) skipped++;
  const archive = new ZipFile();
  const output = archive.outputStream as PassThrough;
  archive.on('error', error => output.destroy(error));
  const written = pipeline(output, createWriteStream(destination, { flags: 'wx' }));
  try {
    archive.addBuffer(Buffer.from(text, 'utf8'), path.basename(filename));
    for (const directory of directories) archive.addEmptyDirectory(directory);
    for (const { file, entry } of files) archive.addFile(file, entry);
    archive.end();
    await written;
  } catch (error) {
    output.destroy();
    await written.catch(() => {});
    throw error;
  }
  return { files: files.length, skipped };
}
