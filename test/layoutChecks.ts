import assert from 'node:assert/strict';
import type { Frame, Page } from 'playwright-core';

export async function checkLayoutUI(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, clipboard: { read: () => Promise<string> }) {
  const page = 'page' in frame ? frame.page() : frame;
  const mode = async (value: string) => {
    await frame.locator('[data-action=settings]').click(); await frame.locator('[data-setting=mode]').selectOption(value); await frame.locator('#settings-done').click();
    await frame.waitForFunction(value => window.VM_APP.editor.vditor.currentMode === value, value);
  };
  const fixture = '# Block controls\n\nFirst paragraph **bold**.\n\nSecond paragraph.\n\n<div><img alt="Test image" src="sample.svg" /></div>\n\n- item one\n- item two\n\nEnd of blocks.\n';
  const reset = async () => {
    await replaceDocument(fixture);
    await frame.evaluate(() => { const root = window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element; root.scrollTop = 0; root.parentElement.scrollLeft = 0; });
    await frame.waitForFunction(() => window.document.querySelectorAll('.vm-block-handle:not([hidden])').length === 7);
    await frame.waitForFunction(() => window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element.querySelector('img')?.naturalWidth > 0);
  };
  const open = async (index: number) => { await frame.locator('.vm-block-handle:not([hidden])').nth(index).click(); await frame.locator('#block-menu').waitFor(); };
  const choose = async (action: string) => {
    const prefix = action.split(':')[0]; if (action.includes(':')) await frame.locator(`[data-block-action="${prefix}"]`).click();
    try { await frame.locator(`[data-block-action="${action}"]`).click(); }
    catch (error) {
      console.log('BLOCK_MENU_DIAGNOSTIC',action,JSON.stringify(await frame.evaluate(()=>({mode:window.VM_APP.editor.vditor.currentMode,doc:window.VM_APP.getValue(),menu:window.document.querySelector('#block-menu')?.outerHTML,viewport:[innerWidth,innerHeight],rects:[...window.document.querySelectorAll('#block-menu,#block-menu button,.block-menu-sub')].map(e=>({action:(e as HTMLElement).dataset.blockAction,x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))}))));
      await frame.locator('body').screenshot({path:'.test-results/block-menu-failure.png'}); throw error;
    }
  };
  await mode('ir'); await reset();
  const original = await frame.evaluate(() => window.VM_APP.getValue());
  const centered = await frame.evaluate(() => {
    const toolbar = window.document.querySelector('#toolbar')!.getBoundingClientRect(), controls = window.document.querySelector('#toolbar-controls')!.getBoundingClientRect();
    return { space: toolbar.width - controls.width, offset: (controls.left + controls.right - toolbar.left - toolbar.right) / 2 };
  });
  if (centered.space > 20) assert.ok(Math.abs(centered.offset) <= 1, 'Toolbar controls are centered as a group');
  await frame.locator('#status').waitFor({ state: 'hidden' });
  await frame.locator('[data-action=settings]').click();
  assert.equal(await frame.locator('[role=dialog],.scrim').count(), 0, 'Settings use an anchored dropdown');
  const gear = await frame.locator('[data-action=settings]').boundingBox(), dropdown = await frame.locator('#settings-menu').boundingBox();
  assert.ok(Math.abs(dropdown!.y - gear!.y - gear!.height - 4) < 2, 'Settings are anchored below the gear');
  assert.deepEqual(await frame.locator('#page-width-select option').evaluateAll(items => items.map(e => (e as HTMLOptionElement).value)), ['100%', '210mm', '148mm', '176mm', '8.5in', '768px', '960px', 'custom']);
  for (const [value, pixels] of [['210mm', 210 * 96 / 25.4], ['148mm', 148 * 96 / 25.4], ['176mm', 176 * 96 / 25.4], ['8.5in', 816], ['768px', 768], ['960px', 960]] as const) {
    await frame.locator('#page-width-select').selectOption(value);
    assert.ok(Math.abs(await frame.evaluate(() => window.VM_APP.editor.vditor.ir.element.getBoundingClientRect().width) - pixels) < 1, `Page width ${value}`);
  }
  const fixed = await frame.evaluate(() => innerWidth + 320);
  await frame.locator('#page-width-select').selectOption('custom'); await frame.locator('#page-width-pixels').fill(String(fixed)); await frame.locator('#page-width-apply').click();
  await frame.waitForFunction(fixed => window.VM_APP.settings().pageWidth === `${fixed}px`, fixed);
  await frame.locator('#settings-done').click();
  const dimensions = await frame.evaluate(() => {
    const root = window.VM_APP.editor.vditor.ir.element, wrapper = root.parentElement;
    const left = root.getBoundingClientRect().left; wrapper.scrollLeft = 150;
    return { width: root.getBoundingClientRect().width, moved: left - root.getBoundingClientRect().left, range: wrapper.scrollWidth - wrapper.clientWidth, horizontal: getComputedStyle(wrapper).overflowX };
  });
  assert.equal(dimensions.width, fixed); assert.equal(dimensions.moved, 150); assert.ok(dimensions.range >= 320); assert.equal(dimensions.horizontal, 'auto');
  await frame.locator('body').screenshot({ path: '.test-results/fixed-width-0.1.3.png' });
  await frame.locator('[data-action=settings]').click(); await frame.locator('#page-width-select').selectOption('100%');
  await frame.locator('[data-action=settings]').click(); assert.equal(await frame.locator('#settings-menu').count(), 0, 'Gear toggles the dropdown');
  await frame.waitForFunction(() => { const wrapper = window.VM_APP.editor.vditor.ir.element.parentElement; return wrapper.scrollLeft === 0 && wrapper.scrollWidth === wrapper.clientWidth; });
  await frame.evaluate(() => window.VM_APP.editor.vditor.ir.element.parentElement.scrollLeft = 0);
  if (!await frame.locator('#outline').isVisible()) await frame.locator('[data-action=outline]').click();
  await frame.locator('#outline-resizer').dblclick(); await frame.waitForFunction(() => window.VM_APP.settings().outlineWidth === 216);
  for (const fraction of [.15, .5, .85]) {
    const edge = await frame.locator('#outline-resizer').boundingBox(), before = await frame.locator('#outline').evaluate(e => e.getBoundingClientRect().width);
    await page.mouse.move(edge!.x + edge!.width / 2, edge!.y + edge!.height * fraction); await page.mouse.down(); await page.mouse.move(edge!.x + edge!.width / 2 + 24, edge!.y + edge!.height * fraction, { steps: 4 }); await page.mouse.up();
    await frame.waitForFunction(before => Math.abs(window.VM_APP.settings().outlineWidth - before - 24) < 2, before);
  }
  await frame.locator('#outline-resizer').focus(); const beforeKey = await frame.locator('#outline').evaluate(e => e.getBoundingClientRect().width); await page.keyboard.press('ArrowLeft');
  await frame.waitForFunction(width => Math.abs(window.VM_APP.settings().outlineWidth - width + 10) < 1, beforeKey);
  assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), original, 'Display settings do not change Markdown');
  console.log('PASS centered toolbar, settings dropdown, page presets/custom fixed width, horizontal scrolling, full-height outline resizing, hidden status');
  for (const value of ['ir', 'wysiwyg']) {
    await mode(value); await reset();
    await replaceDocument('# Page layout\n\nParagraph.\n\n1. Ordered item\n   1. Nested ordered item\n\n| A | B |\n| --- | --- |\n| ' + 'wide_content_'.repeat(30) + ' | Result |\n\nEnd of layout.\n');
    for (const width of ['768px','960px','210mm']) {
      await frame.locator('[data-action=settings]').click(); await frame.locator('#page-width-select').selectOption(width); await frame.locator('#settings-done').click();
      const geometry = await frame.evaluate(() => {
        const root = window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element, wrapper = root.parentElement, table = root.querySelector('table'), bounds = root.getBoundingClientRect(), available = wrapper.getBoundingClientRect(), padding = getComputedStyle(root);
        return {pageWidth:bounds.width,availableWidth:available.width,center:(bounds.left+bounds.right-available.left-available.right)/2,tableWidth:table.getBoundingClientRect().width,contentWidth:root.clientWidth-parseFloat(padding.paddingLeft)-parseFloat(padding.paddingRight),overflow:root.scrollWidth-root.clientWidth};
      });
      if (geometry.availableWidth > geometry.pageWidth) assert.ok(Math.abs(geometry.center)<1,'A narrower page is centered in its viewport');
      assert.ok(Math.abs(geometry.tableWidth-geometry.contentWidth)<2,`Table follows ${width} in ${value}`); assert.ok(geometry.overflow<2,'Long table content wraps inside the page');
    }
    await frame.locator('body').screenshot({path:`.test-results/page-table-${value}-0.1.4.png`});
    const handlePositions = await frame.locator('.vm-block-handle:not([hidden])').evaluateAll(items => items.map(e => e.getBoundingClientRect().left));
    assert.ok(handlePositions.length >= 4); assert.ok(Math.max(...handlePositions)-Math.min(...handlePositions)<1,'All six-dot handles use one gutter, including nested lists');
    await frame.locator('[data-action=settings]').click(); await frame.locator('#page-width-select').selectOption('100%'); await frame.locator('#settings-done').click(); await reset();
    await frame.locator('[data-action=settings]').click(); await frame.locator('#page-width-select').selectOption('960px'); await frame.locator('#settings-done').click();
    assert.ok(Math.abs(await frame.evaluate(() => window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element.getBoundingClientRect().width) - 960) < 1);
    await frame.locator('[data-action=settings]').click(); await frame.locator('#page-width-select').selectOption('100%'); await frame.locator('#settings-done').click();
    assert.equal(await frame.locator(`.vditor-${value} div[data-type=html-block]`).evaluate(e => getComputedStyle(e, '::before').content), 'none', 'HTML image type badge is hidden');
    await open(1);
    assert.deepEqual(await frame.locator('.block-menu-main>[data-block-action]').evaluateAll(items => items.map(e => (e as HTMLElement).dataset.blockAction)), ['convert', 'source', 'delete', 'copy', 'cut', 'indent', 'add']);
    await choose('copy'); assert.match(await clipboard.read(), /First paragraph \*\*bold\*\*\./);
    await open(1); await choose('convert:h2'); await frame.waitForFunction(() => window.VM_APP.getValue().includes('## First paragraph **bold**.'));
    await reset(); await open(1); await choose('cut'); await frame.waitForFunction(() => !window.VM_APP.getValue().includes('First paragraph')); assert.match(await clipboard.read(), /First paragraph/);
    await reset(); await open(1); await choose('add:quote'); await frame.waitForFunction(() => window.VM_APP.getValue().includes('> 新段落')); assert.ok((await frame.evaluate(() => window.VM_APP.getValue())).includes('First paragraph'));
    await reset(); await open(5); await choose('indent'); await choose('in'); await frame.waitForFunction(() => /  - item two/.test(window.VM_APP.getValue()));
    await open(5); await choose('indent'); await choose('out'); await frame.waitForFunction(() => /\n- item two/.test(window.VM_APP.getValue()));
    await reset(); await open(3); await choose('delete'); await frame.waitForFunction(() => !window.VM_APP.getValue().includes('<img'));
    for (const type of ['p', 'list', 'ordered-list', 'check', 'code', 'callout', 'quote', 'columns', 'fold']) {
      await reset(); await open(1); await choose(`convert:${type}`);
      await frame.waitForFunction(() => !window.document.querySelector('#block-menu'));
      const text = await frame.evaluate(() => window.VM_APP.getValue()); assert.match(text, /First paragraph/); assert.match(text, /Second paragraph/);
      if (type === 'columns' || type === 'fold') {
        const structure = frame.locator(`.vditor-${value} .vm-structure`); await structure.waitFor();
        assert.equal(await structure.evaluate(e => getComputedStyle(e.closest('[data-type=html-block]')!.querySelector('pre')!).display), 'none', 'Custom structures show their rendered contents');
        const editable = structure.locator(':scope>div').first();
        await editable.fill(`Edited ${type} content`);
        await frame.waitForFunction(type => window.VM_APP.getValue().includes(`Edited ${type} content`), type);
        const updated = await frame.evaluate(() => window.VM_APP.getValue()); assert.ok(!/vm-editable|vm-structure|contenteditable/.test(updated), 'Editor UI does not serialize');
        await replaceDocument(updated); await frame.locator(`.vditor-${value} [data-vm-block="${type}"]`).waitFor();
        assert.match(await frame.locator(`.vditor-${value} [data-vm-block="${type}"]`).textContent() || '', /Edited/);
      }
    }
    await reset(); await frame.locator(`.vditor-${value}>.vditor-reset>p`).first().click();
    assert.equal(await frame.locator('.vditor-wysiwyg>.vditor-panel:visible').count(), 0, 'Native block toolbar stays hidden');
    await open(1); await choose('convert'); await frame.locator('body').screenshot({ path: `.test-results/block-menu-${value}-0.1.3.png` }); await page.keyboard.press('Escape');
  }
  await mode('ir'); await reset();
  console.log('PASS centered fixed pages, responsive wide tables, aligned six-dot gutter, paragraph/image menus, conversion types, copy/cut/delete/add, list indent/outdent, editable columns/folds and clean round trips');
}
