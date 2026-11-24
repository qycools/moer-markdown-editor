import assert from 'node:assert/strict';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Frame, Locator, Page } from 'playwright-core';

async function moveEdge(page: Page, target: Locator, delta: number, edge = false) {
  await target.scrollIntoViewIfNeeded();
  const bounds = (await target.boundingBox())!;
  const x = bounds.x + (edge ? bounds.width - 3 : bounds.width / 2), y = bounds.y + bounds.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down(); await page.mouse.move(x + delta, y, { steps: 5 }); await page.mouse.up();
}

async function dragBy(page: Page, target: Locator, dx: number, dy: number, corner = false) {
  const { x, y, width, height } = (await target.boundingBox())!;
  const startX = x + (corner ? width - 5 : width / 2);
  const startY = y + (corner ? height - 5 : height / 2);
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + dx, startY + dy, { steps: 6 });
  await page.mouse.up();
}

export async function checkDirectContentEditing(frame: Page | Frame, replaceDocument: (text: string) => Promise<void>, align?: (key: 'e' | 'l' | 'r') => Promise<void>) {
  const page = 'page' in frame ? frame.page() : frame;
  for (const mode of ['wysiwyg', 'ir']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    const fixture = '# Direct content editing\n\n<img src="sample.svg" alt="Drag image" width="120" height="30">\n\n| Name | Count |\n| --- | --- |\n| Alpha | 2 |\n\n**Edit** the [linked paragraph](#direct-content-editing).\n\nKeep this paragraph.\n';
    await replaceDocument(fixture);
    const surface = frame.locator(`.vditor-${mode}>.vditor-reset`);
    const image = surface.locator('img[alt="Drag image"]');
    await frame.waitForFunction(() => (document.querySelector(`img[alt="Drag image"]`) as HTMLImageElement | null)?.naturalWidth);
    const before = (await image.boundingBox())!.width;
    const ratio = await image.evaluate((element: HTMLImageElement) => element.naturalWidth / element.naturalHeight);
    await image.dblclick();
    assert.equal(await frame.locator('.vditor-img,.vm-image-dialog').count(), 0);
    const beforeBackspace = await frame.evaluate(() => window.VM_APP.getValue());
    await image.click();
    await frame.locator('.vm-image-selection').waitFor();
    await page.keyboard.press('Backspace');
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), beforeBackspace);
    assert.equal(await frame.locator('.vm-image-tools').count(), 0);
    await moveEdge(page, frame.locator('[data-image-edge=e]'), 60);
    await frame.waitForFunction(() => Number(window.document.querySelector('img[alt="Drag image"]:not([width="120"])')?.getAttribute('width')) > 120);
    const width = Number(await image.getAttribute('width')), height = Number(await image.getAttribute('height'));
    assert.ok(width > before + 40 && Math.abs(height - width / ratio) <= 1);
    const positions: number[] = [];
    for (const [key, action, left, right] of [
      ['e', 'imageCenter', 'auto', 'auto'], ['r', 'imageRight', 'auto', '0px'], ['l', 'imageLeft', '0px', 'auto'],
    ] as const) {
      if (align) await align(key);
      else await frame.evaluate(action => window.VM_APP.action(action), action);
      await frame.waitForFunction(({ mode, left, right }) => {
        const updated = window.document.querySelector<HTMLImageElement>(`.vditor-${mode}>.vditor-reset img[alt="Drag image"]`);
        return updated?.style.marginLeft === left && updated.style.marginRight === right;
      }, { mode, left, right }, { timeout: 4000 });
      positions.push((await image.boundingBox())!.x);
    }
    assert.ok(positions[1] > positions[0] && positions[0] > positions[2], 'Image alignment moves the rendered image');
    const column = surface.locator('table th').first();
    await column.click();
    await frame.locator('[data-table-action=layout-equal][aria-pressed=true]').waitFor();
    const selectedColors = await frame.evaluate(() => {
      const option = document.querySelector('[data-table-action=layout-equal]')!;
      const toolbar = document.querySelector('#toolbar')!;
      const button = document.createElement('button');
      button.setAttribute('aria-pressed', 'true');
      toolbar.append(button);
      const colors = (element: Element) => {
        const { backgroundColor, color, outlineColor } = getComputedStyle(element);
        return [backgroundColor, color, outlineColor];
      };
      const result = [colors(option), colors(button)];
      button.remove();
      return result;
    });
    assert.deepEqual(selectedColors[0], selectedColors[1]);
    const columnBefore = (await column.boundingBox())!.width;
    await moveEdge(page, column, -45, true);
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('data-moye-col-width'));
    assert.ok((await column.boundingBox())!.width < columnBefore - 30);
    await column.click();
    const input = frame.getByRole('spinbutton', { name: '第 1 列宽度（像素）' });
    await input.fill('220');
    await input.press('Enter');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('data-moye-col-width="220"'));
    assert.ok(Math.abs((await column.boundingBox())!.width - 220) <= 2);
    const stored = await frame.evaluate(() => window.VM_APP.getValue() as string);
    await replaceDocument(stored);
    assert.equal(Number(await image.getAttribute('width')), width);
    assert.ok(Math.abs((await column.boundingBox())!.width - 220) <= 2);
    const table = surface.locator('table');
    await table.evaluate(element => {
      (element.closest('[contenteditable=true]') as HTMLElement).focus();
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
    });
    for (const [key, target] of [['e', 'center'], ['r', 'right'], ['l', 'left']] as const) {
      if (align) await align(key);
      else await frame.evaluate(action => window.VM_APP.action(action), target === 'left' ? 'tableLeft' : target === 'right' ? 'tableRight' : 'tableCenter');
      await frame.waitForFunction(({ mode, target }) => {
        const cells = [...document.querySelectorAll<HTMLTableCellElement>(`.vditor-${mode}>.vditor-reset table :is(th,td)`)];
        return cells.length === 4 && cells.every(cell => cell.align === target);
      }, { mode, target }, { timeout: 4000 });
    }
    assert.match(await frame.evaluate(() => getSelection()?.toString() || ''), /Alpha/);
    assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /:\s*-+\s*\|/);
    await replaceDocument(stored);
    const link = surface.locator('p').filter({ hasText: 'linked paragraph' }).locator('a,.vditor-ir__link');
    await link.click({ clickCount: 2 });
    assert.ok((await frame.evaluate(() => getSelection()?.toString() || '')).trim());
    assert.equal(await frame.locator('#block-source').count(), 0);
    await link.click({ clickCount: 3 });
    assert.equal(await frame.locator('#block-source').count(), 0);
    assert.match(await frame.evaluate(() => getSelection()?.toString() || ''), /Edit/);
    await link.click({ clickCount: 4 });
    const source = frame.locator('#block-source');
    assert.equal(await source.inputValue(), '**Edit** the [linked paragraph](#direct-content-editing).');
    await frame.locator('.vm-block-source-preview strong').filter({ hasText: /^Edit$/ }).waitFor();
    await frame.locator('.vm-block-source-highlight .hljs-strong').waitFor();
    const dialog = frame.locator('.vm-block-source-dialog');
    const initialSize = (await dialog.boundingBox())!;
    const outerGrip = frame.getByRole('button', { name: '调整源码窗口尺寸' });
    await dragBy(page, outerGrip, -92, -54);
    assert.ok((await dialog.boundingBox())!.width < initialSize.width - 70);
    assert.ok((await dialog.boundingBox())!.height < initialSize.height - 40);
    await dragBy(page, outerGrip, 95, 55);
    const divider = frame.getByRole('separator', { name: '调整源码和预览宽度' });
    const initialWidth = (await source.boundingBox())!.width;
    await moveEdge(page, divider, 45);
    assert.ok((await source.boundingBox())!.width > initialWidth + 36);
    for (const box of [frame.locator('.vm-block-source-pane'), frame.locator('.vm-block-source-preview')]) {
      const height = (await box.boundingBox())!.height;
      await dragBy(page, box, 0, -45, true);
      assert.ok((await box.boundingBox())!.height < height - 30, 'Each pane is vertically resizable');
    }
    const long = '中文与LongUnbrokenWord'.repeat(32);
    await source.fill(long);
    assert.ok(await source.evaluate(element => element.scrollWidth > element.clientWidth));
    const wrap = frame.getByRole('button', { name: '自动换行' });
    await wrap.click();
    assert.equal(await wrap.getAttribute('aria-pressed'), 'true');
    assert.ok(await source.evaluate(element => element.scrollWidth <= element.clientWidth + 1));
    assert.equal(await source.inputValue(), long);
    await source.fill('**Edited** Markdown source.');
    await frame.locator('.vm-block-source-preview strong').filter({ hasText: /^Edited$/ }).waitFor();
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), stored, 'Live preview must not edit the document before applying');
    await source.press('Control+Enter');
    await surface.getByText('Markdown source.').waitFor();
    const changed = await frame.evaluate(() => window.VM_APP.getValue() as string);
    assert.equal(changed, stored.replace('**Edit** the [linked paragraph](#direct-content-editing).', '**Edited** Markdown source.'));
    await surface.locator('p').filter({ hasText: 'Markdown source.' }).click();
    await frame.evaluate(() => window.VM_APP.action('blockSource'));
    await source.fill('$x^2+1$\n\n```mermaid\nflowchart LR\n  A[Start] --> B[Finish]\n```');
    const preview = frame.locator('.vm-block-source-preview');
    await preview.locator('.katex').waitFor();
    await preview.locator('.language-mermaid svg .node').first().waitFor();
    const diagramColors = await preview.locator('.language-mermaid svg .node rect').first().evaluate(element => ({
      fill: getComputedStyle(element).fill, mode: document.documentElement.dataset.mode,
    }));
    assert.equal(diagramColors.fill, diagramColors.mode === 'dark' ? 'rgb(35, 66, 63)' : 'rgb(224, 240, 235)');
    await source.fill('$x^2+1$\n\n```mermaid\nflowchart LR\n  A[\n```');
    await preview.locator('.language-mermaid.vditor-reset--error').waitFor();
    await source.fill('```mermaid\nflowchart LR\n  A[Updated] --> B[Finish]\n```');
    await preview.locator('.language-mermaid svg').getByText('Updated').waitFor();
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), changed);
    await frame.locator('#cancel-block-source').click();
    await surface.locator('h1').scrollIntoViewIfNeeded();
    await frame.locator('.vm-block-handle[data-heading-level="H1"]:visible').click();
    await frame.getByRole('menuitem', { name: '编辑 Markdown 源码' }).click();
    assert.equal(await source.inputValue(), '# Direct content editing');
    await source.fill('# Edited from the block menu');
    await source.press('Control+Enter');
    await surface.getByRole('heading', { name: 'Edited from the block menu' }).waitFor();
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), changed.replace('# Direct content editing', '# Edited from the block menu'));
  }
  console.log('PASS image double-click suppression, table and image alignment, four-click and grip-menu editing, resizable source and live preview');
}

export async function checkTableMarkerRepair(frame: Page | Frame, replaceDocument: (text: string) => Promise<void>, readDocument: () => Promise<string>) {
  const plain = '| 维度 | BLIP| CoCa| BEiT-3|\n| ---------------------------------- | --- | --- | --- |\n| 预训练目标                        | 图文对比、图文匹配、图像条件 LM | 图文对比、图像条件字幕预测 | 纯图、纯文、图文对的掩码预测 |\n';
  const legacy = plain.replace(plain.split('\n')[0], '| 维度<wbrdata-moye-col-width="185"> | BLIP<wbr data-moye-col-width="196">| CoCa<wbr data-moye-col-width="196">| BEiT-3<wbrdata-moye-col-width="196">|')
    + '\n| `<wbrdata-moye-col-width="100">` |\n| --- |\n| Literal |\n';
  for (const mode of ['ir', 'wysiwyg', 'sv']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(legacy);
    const content = frame.locator(mode === 'sv' ? '.vditor-preview .vditor-reset' : `.vditor-${mode}>.vditor-reset`);
    const header = content.locator('table').first().locator('thead th');
    await header.first().filter({ hasText: '维度' }).waitFor();
    assert.deepEqual(await header.allInnerTexts(), ['维度', 'BLIP', 'CoCa', 'BEiT-3']);
    assert.deepEqual(await header.evaluateAll(cells => cells.map(cell => (cell as HTMLElement).style.getPropertyValue('--vm-column-width'))),
      ['185px', '196px', '196px', '196px']);
    assert.match(await content.locator('table').last().innerText(), /<wbrdata-moye-col-width=/);
    assert.equal(await readDocument(), legacy, 'Opening older documents must not silently save them');
    if (mode === 'sv') continue;
    await replaceDocument(plain);
    await header.first().click();
    const input = frame.getByRole('spinbutton', { name: '第 1 列宽度（像素）' });
    await input.fill('185');
    await input.press('Enter');
    await frame.waitForFunction(() => document.querySelector('[data-action=save]')?.getAttribute('aria-busy') === 'false');
    const saved = await readDocument();
    assert.equal([...saved.matchAll(/<wbr data-moye-col-width="\d+">/g)].length, 4);
    assert.doesNotMatch(saved, /<wbrdata-moye-col-width/);
    await replaceDocument(saved);
    assert.deepEqual(await header.allInnerTexts(), ['维度', 'BLIP', 'CoCa', 'BEiT-3']);
  }
  console.log('PASS malformed legacy column widths render correctly in three modes and width changes save complete markers');
}

export async function checkImagePersistence(frame: Page | Frame, replaceDocument: (text: string) => Promise<void>, readDocument: () => Promise<string>, readClipboard?: () => Promise<string>) {
  const page = 'page' in frame ? frame.page() : frame;
  async function storedImage(markdown: string, label: string) {
    const markup = [...markdown.matchAll(/<img\b(?:[^"'>]|"[^"]*"|'[^']*')*>/gi)].map(match => match[0]).find(tag => tag.includes(` alt="${label}"`));
    assert.ok(markup, `Saved Markdown contains the image ${label}`);
    const attributes = await frame.evaluate(tag => {
      const template = document.createElement('template');
      template.innerHTML = tag;
      return Object.fromEntries([...template.content.querySelector('img')!.attributes].map(attribute => [attribute.name, attribute.value]));
    }, markup);
    return { markup, attributes };
  }
  const fixture = [
    '# Image round trips',
    '![Standalone](<sample.svg> "Standalone title")',
    'Before ![Inline](<sample%2Esvg> "Inline title") after.',
    '[![Linked](<sample.svg> "Linked title")](https://example.org)',
    '![Reference][diagram]',
    '<figure class="retained">\n<img src="sample.svg" alt="Figure" width="120">\n<figcaption>Figure caption</figcaption>\n</figure>',
    '[diagram]: <sample.svg> "Reference title"',
  ].join('\n\n') + '\n';
  for (const mode of ['ir', 'wysiwyg']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    const surface = frame.locator(`.vditor-${mode}>.vditor-reset`);
    const image = (label: string) => surface.locator(`img[alt="${label}"]`);
    const checkLoaded = async () => {
      await frame.waitForFunction(mode => {
        const images = [...document.querySelectorAll<HTMLImageElement>(`.vditor-${mode}>.vditor-reset img`)];
        return images.length === 5 && images.every(element => element.naturalWidth > 0);
      }, mode);
    };
    const saved = async () => {
      await frame.waitForFunction(() => document.querySelector('[data-action=save]')?.getAttribute('aria-busy') === 'false');
      return readDocument();
    };
    const align = async (label: string, action: string) => {
      await image(label).click();
      await frame.evaluate(action => window.VM_APP.action(action), action);
      return saved();
    };
    await replaceDocument(fixture);
    await checkLoaded();
    let text = await align('Standalone', 'imageCenter');
    const standalone = await storedImage(text, 'Standalone');
    assert.equal(standalone.attributes.src, 'sample.svg');
    assert.equal(standalone.attributes.title, 'Standalone title');
    assert.match(standalone.attributes.style, /margin-left: auto; margin-right: auto;/);
    assert.equal(text.replace(standalone.markup, '![Standalone](<sample.svg> "Standalone title")'), fixture);
    await replaceDocument(text);
    await checkLoaded();
    await image('Inline').click();
    await moveEdge(page, frame.locator('[data-image-edge=e]'), -24);
    text = await saved();
    const inline = await storedImage(text, 'Inline');
    assert.equal(inline.attributes.src.toLowerCase(), 'sample%2esvg');
    assert.equal(inline.attributes.title, 'Inline title');
    assert.ok(Number(inline.attributes.width) > 0 && Number(inline.attributes.height) > 0);
    assert.ok(text.includes(`Before ${inline.markup} after.`));
    await replaceDocument(text);
    await checkLoaded();
    text = await align('Linked', 'imageRight');
    const linked = await storedImage(text, 'Linked');
    assert.equal(linked.attributes.src, 'sample.svg');
    assert.equal(linked.attributes.title, 'Linked title');
    assert.match(linked.attributes.style, /margin-left: auto; margin-right: 0px;/);
    assert.ok(text.includes(`[${linked.markup}](https://example.org)`));
    await replaceDocument(text);
    await checkLoaded();
    if (readClipboard) {
      await image('Reference').click();
      await page.keyboard.press('Control+c');
      await frame.waitForFunction(() => document.querySelector('#status')?.textContent === '图片引用已复制');
      assert.match(await readClipboard(), /<img src="sample\.svg" alt="Reference" title="Reference title">/);
    }
    text = await align('Reference', 'imageLeft');
    const reference = await storedImage(text, 'Reference');
    assert.equal(reference.attributes.src, 'sample.svg');
    assert.equal(reference.attributes.title, 'Reference title');
    assert.match(reference.attributes.style, /margin-left: 0px; margin-right: auto;/);
    assert.match(text, /^\[diagram\]: <sample\.svg> "Reference title"$/m);
    await replaceDocument(text);
    await checkLoaded();
    text = await align('Figure', 'imageCenter');
    const figure = await storedImage(text, 'Figure');
    assert.equal(figure.attributes.src, 'sample.svg');
    assert.equal(figure.attributes.width, '120');
    assert.match(figure.attributes.style, /margin-left: auto; margin-right: auto;/);
    assert.match(text, /<figure class="retained">\n.*\n<figcaption>Figure caption<\/figcaption>\n<\/figure>/);
    await replaceDocument(text);
    await checkLoaded();
    await image('Inline').click();
    await page.keyboard.press('Delete');
    const deleted = await saved();
    assert.equal(deleted, text.replace(inline.markup, ''));
    assert.doesNotMatch(deleted, /src="[^"]*>"/);
  }
  console.log('PASS image alignment, resizing, linked and reference images, HTML figures and exact deletion across saved reloads');
}

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
    await moveEdge(frame.page(), frame.locator('[data-image-edge=e]'), -80);
    assert.match(await current(), /Before <img [^>]*title="Chart"[^>]*width="\d+" height="\d+"[^>]*> after\./);
    await frame.page().keyboard.press('Control+c');
    await frame.waitForFunction(() => document.getElementById('status')?.textContent === '图片引用已复制');
    assert.match(await clipboard(), /<img [^>]*width="\d+" height="\d+"/);
    await frame.page().keyboard.press('Delete');
    assert.match(await current(), /Before +after\./);
    const standalone = root.locator('img[alt=standalone]');
    await standalone.click();
    await moveEdge(frame.page(), frame.locator('[data-image-edge=e]'), -120);
    const imageWidth = await standalone.getAttribute('width');
    assert.match(await current(), /alt="standalone" width="\d+" height="\d+"/);

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
    assert.equal(await standalone.getAttribute('width'), imageWidth);
    assert.equal(await table.evaluate(element => getComputedStyle(element).tableLayout), 'auto');
    await table.locator('th').first().click();
    await action('layout-equal');
    assert.equal(await table.evaluate(element => getComputedStyle(element).tableLayout), 'fixed');
    assert.doesNotMatch(await current(), /data-moye-table/);
  }
  await setMode('ir');
  console.log('PASS local image URI fallback, image edits, and table operations in IR and WYSIWYG');
}
