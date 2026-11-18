import assert from 'node:assert/strict';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Frame } from 'playwright-core';

export async function checkContentTools(frame: Frame, replaceDocument: (text: string) => Promise<void>, folder: string, clipboard: () => Promise<string>, save: (text: string) => Promise<void>) {
  const setMode = async (mode: string) => {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await frame.waitForFunction(mode => window.VM_APP.editor.vditor.currentMode === mode, mode);
  };
  const images = path.join(folder, 'pms2_codec_comparison_assets');
  await mkdir(images, { recursive: true });
  const png = path.join(images, 'rate_psnr.png');
  await copyFile(path.resolve(__dirname, '../screenshots/editor.png'), png);
  const encoded = '含空格 #%.svg';
  await copyFile(path.join(folder, 'sample.svg'), path.join(images, encoded));
  await replaceDocument([
    '# Local images', '',
    '![relative](pms2_codec_comparison_assets/rate_psnr.png)', '',
    `![absolute](${pathToFileURL(png).href})`, '',
    `![encoded](pms2_codec_comparison_assets/${encodeURIComponent(encoded)})`, '',
    ...(process.platform === 'win32' ? ['![windows](pms2_codec_comparison_assets\\rate_psnr.png)', ''] : []),
    'End of local images.',
  ].join('\n'));
  await frame.waitForFunction(count => {
    const images = [...document.querySelectorAll<HTMLImageElement>('.vditor-ir img')];
    return images.length === count && images.every(image => image.naturalWidth > 0);
  }, process.platform === 'win32' ? 4 : 3, { timeout: 15000 });
  const absolute = frame.locator('.vditor-ir img[alt=absolute]');
  assert.match(await absolute.evaluate(image => (image as HTMLImageElement).currentSrc), /^data:image\/png;base64,/);
  assert.match(await absolute.getAttribute('src') || '', /^file:/);
  const current = () => frame.evaluate(() => window.VM_APP.getValue()) as Promise<string>;
  assert.doesNotMatch(await current(), /data:image/);

  for (const mode of ['ir', 'wysiwyg']) {
    await setMode(mode);
    await replaceDocument('# Images and table\n\nBefore ![inline](sample.svg "Chart") after.\n\n![standalone](sample.svg)\n\n| Name | Longer header |\n| --- | --- |\n| Alpha | Beta |\n| Gamma | Delta |\n\nEnd of content.\n');
    const root = frame.locator(`.vditor-${mode}`);
    const inline = root.locator('img[alt=inline]');
    await inline.click();
    await frame.locator('.vm-image-tools [name=width]').fill('160');
    await frame.locator('.vm-image-tools [name=height]').fill('80');
    await frame.locator('[data-image-action=apply]').click();
    assert.match(await current(), /Before <img [^>]*title="Chart"[^>]*width="160" height="80"> after\./);
    assert.equal(await inline.getAttribute('width'), '160');
    await inline.click();
    await frame.locator('.vm-image-tools [name=scale]').fill('50');
    assert.equal(await frame.locator('.vm-image-tools [name=width]').inputValue(), '80');
    assert.equal(await frame.locator('.vm-image-tools [name=height]').inputValue(), '40');
    await frame.locator('[data-image-action=apply]').click();
    await inline.click();
    await frame.locator('[data-image-action=copy]').click();
    await frame.waitForFunction(() => document.getElementById('status')?.textContent === '图片引用已复制');
    assert.match(await clipboard(), /<img [^>]*width="80" height="40">/);
    await frame.locator('[data-image-action=delete]').click();
    assert.match(await current(), /Before +after\./);
    const standalone = root.locator('img[alt=standalone]');
    await standalone.click();
    await frame.locator('.vm-image-tools [name=scale]').fill('25');
    await frame.locator('[data-image-action=apply]').click();
    assert.match(await current(), /alt="standalone" width="120" height="30"/);

    const table = root.locator('table');
    const first = table.locator('tbody td').first();
    const bounds = (await first.boundingBox())!;
    await first.click({ position: { x: Math.floor(bounds.width) - 3, y: Math.floor(bounds.height / 2) } });
    assert.match(await frame.locator('.vm-table-group.active').innerText(), /第 1 列/);
    const action = (id: string) => frame.locator(`[data-table-action=${id}]`).click();
    await action('align-right');
    assert.equal(await first.evaluate(cell => getComputedStyle(cell).textAlign), 'right');
    assert.match(await current(), /-+:\s*\|/);
    await action('row-above');
    assert.equal(await table.locator('tbody tr').count(), 3);
    await action('row-delete');
    assert.equal(await table.locator('tbody tr').count(), 2);
    await action('column-left');
    assert.equal(await table.locator('th').count(), 3);
    await action('layout-auto');
    assert.equal(await table.evaluate(element => getComputedStyle(element).tableLayout), 'auto');
    await action('column-delete');
    assert.equal(await table.locator('th').count(), 2);
    assert.match(await current(), /<wbr data-moye-table="auto">/);
    assert.match(await current(), /Alpha\s*\|\s*Beta/);
    const stored = await current();
    await save(stored);
    await setMode(mode === 'ir' ? 'wysiwyg' : 'ir');
    await setMode(mode);
    assert.equal(await current(), stored);
    assert.equal(await standalone.getAttribute('width'), '120');
    assert.equal(await table.evaluate(element => getComputedStyle(element).tableLayout), 'auto');
    await table.locator('th').first().click();
    await action('layout-equal');
    assert.equal(await table.evaluate(element => getComputedStyle(element).tableLayout), 'fixed');
    assert.doesNotMatch(await current(), /data-moye-table/);
  }
  await setMode('ir');
  console.log('PASS local image URI fallback, image edits, and table operations in IR and WYSIWYG');
}
