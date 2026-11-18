import assert from 'node:assert/strict';
import type { Frame, Page } from 'playwright-core';
import { defaultColors, type ColorProperty } from '../src/shared';

export async function checkColorUI(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, persisted?: (key: string, colors: string[]) => Promise<void>) {
  const page = 'page' in frame ? frame.page() : frame;
  const mode = async (value: string) => {
    await frame.locator('[data-action=settings]').click(); await frame.locator('[data-setting=mode]').selectOption(value); await frame.locator('#settings-done').click();
    await frame.waitForFunction(value => window.VM_APP.editor.vditor.currentMode === value, value);
  };
  const readPalette = (key: string) => frame.evaluate(key => window.VM_APP.settings()[key], key) as Promise<string[]>;
  const setInput = async (selector: string, value: string) => frame.locator(selector).evaluate((element, value) => { (element as HTMLInputElement).value = value; element.dispatchEvent(new Event('change', { bubbles: true })); }, value);
  const fixture = '# Text colors\n\nPaint **bold** text.\n\nEnd of colors.\n';
  await mode('ir'); await replaceDocument(fixture);
  const original = await frame.evaluate(() => window.VM_APP.getValue());
  for (const [property, action, key] of [['color', 'textColor', 'textColors'], ['background-color', 'backgroundColor', 'backgroundColors']] as const) {
    await frame.locator(`[data-action=${action}]`).click(); await frame.locator('#palette-default').click();
    assert.equal(await frame.locator('[role=dialog]').count(), 0, 'Palette management uses a dropdown');
    assert.deepEqual(await readPalette(key), defaultColors);
    assert.equal(await frame.locator('#palette-add').isDisabled(), true, 'Eight-color maximum');
    await frame.locator('.palette-grip').first().dragTo(frame.locator('.palette-color-row').nth(1));
    assert.deepEqual(await readPalette(key), [defaultColors[1], defaultColors[0], ...defaultColors.slice(2)], 'Pointer dragging changes color order');
    for (let count = 8; count > 1; count--) await frame.locator('[data-palette-delete]').last().click();
    assert.equal(await frame.locator('[data-palette-delete]').isDisabled(), true, 'One-color minimum');
    await setInput('[data-palette-edit="0"]', '#13579b');
    await frame.locator('#palette-add').click();
    const custom = ['#13579b', '#007c91']; assert.deepEqual(await readPalette(key), custom);
    if (persisted) await persisted(key, custom);
    const other = property === 'color' ? 'backgroundColors' : 'textColors'; assert.deepEqual(await readPalette(other), defaultColors, 'Text and background palettes are independent');
    await frame.locator('body').screenshot({path:`.test-results/palette-${action}-0.1.4.png`});
    await frame.locator('#palette-default').click(); assert.deepEqual(await readPalette(key), defaultColors);
    if (persisted) await persisted(key, [...defaultColors]);
    await frame.locator('[data-color-close]').click();
  }
  assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), original, 'Palette changes do not modify Markdown');
  const selectText = async () => frame.evaluate(() => {
    const surface = window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element; surface.focus();
    if (surface instanceof HTMLTextAreaElement) { const start = surface.value.indexOf('Paint'), end = surface.value.indexOf('text.', start) + 5; surface.setSelectionRange(start, end); }
    else { const range = window.document.createRange(); range.selectNodeContents(surface.querySelector('p')); getSelection()!.removeAllRanges(); getSelection()!.addRange(range); }
  });
  for (const value of ['ir', 'wysiwyg', 'sv']) {
    await mode(value); await replaceDocument(fixture); await selectText();
    await frame.locator('#selection-colors').waitFor({state:'visible'});
    assert.equal(await frame.locator('[data-highlight-color]').count(), 8); assert.equal(await frame.locator('[data-text-color]').count(), 8);
    assert.equal(await frame.locator('[data-text-color]').first().evaluate(e => getComputedStyle(e, '::before').height), '3px', 'Foreground palette uses colored lines');
    if (value === 'ir') await frame.locator('body').screenshot({path:'.test-results/selection-colors-0.1.4.png'});
    await frame.locator('[data-text-color="#26a7df"]').click(); await frame.waitForFunction(() => window.VM_APP.getValue().includes('color: #26a7df'));
    await selectText(); await frame.locator('#selection-colors').waitFor({state:'visible'}); await frame.locator('[data-highlight-color="#ffd400"]').click();
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('background-color: #ffd400'));
    const marked = await frame.evaluate(() => window.VM_APP.getValue()); assert.match(marked, /color: #26a7df/); assert.match(marked, /\*\*bold\*\*/);
  }
  for (const value of ['ir', 'wysiwyg']) {
    await mode(value);
    await replaceDocument('# Annotation\n\n<span style="color:#123456;background-color:#fff176">**marked** text</span>\n\nEnd of annotation.\n');
    const strong = frame.locator(`.vditor-${value}>.vditor-reset strong`);
    await strong.click(); await frame.locator('#annotation-menu').waitFor();
    assert.equal(await frame.locator('#selection-colors').isVisible(), false);
    await setInput('#annotation-color', '#13579b'); await setInput('#annotation-background', '#82c91e'); await frame.locator('#annotation-size').fill('20');
    await frame.locator('body').screenshot({path:`.test-results/annotation-${value}-0.1.4.png`});
    await frame.locator('#annotation-save').click();
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('font-size: 20px'));
    const styled = await strong.evaluate(e => ({color:getComputedStyle(e).color,size:getComputedStyle(e).fontSize}));
    assert.deepEqual(styled, {color:'rgb(19, 87, 155)',size:'20px'}); assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /\*\*marked\*\*/);
    await strong.click(); await frame.locator('#annotation-clear').click();
    const cleared = await frame.evaluate(() => window.VM_APP.getValue()); assert.ok(!/color\s*:/.test(cleared), 'Eraser clears both colors'); assert.match(cleared, /font-size: 20px/); assert.match(cleared, /\*\*marked\*\*/, 'Eraser preserves other formatting');
    await replaceDocument('# Nested annotation\n\n<span style="color:#123456">before **<span style="background-color:#fff176">target</span>** after</span>\n\nEnd of annotation.\n');
    await frame.locator(`.vditor-${value} [data-vm-color]`).filter({hasText:'target'}).last().click(); await frame.locator('#annotation-clear').click();
    const nested = await frame.evaluate(() => window.VM_APP.getValue()); assert.match(nested, /\*\*target\*\*/); assert.ok(!nested.includes('background-color'));
    assert.equal(await frame.locator(`.vditor-${value} strong`).filter({hasText:'target'}).evaluate(e => getComputedStyle(e).color === getComputedStyle(window.document.body).color), true, 'Cleared text does not inherit the enclosing annotation color');
    const neighbors = frame.locator(`.vditor-${value} [data-vm-color]`); assert.equal(await neighbors.count(), 2);
    assert.deepEqual(await neighbors.evaluateAll(items => items.map(e => getComputedStyle(e).color)), ['rgb(18, 52, 86)','rgb(18, 52, 86)'], 'Adjacent colored text is preserved');
    await replaceDocument(nested); assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /\*\*target\*\*/, 'Edited styles survive reloading');
  }
  await mode('ir'); await replaceDocument(fixture);
  console.log('PASS editable independent 1-8 color palettes, real drag ordering, defaults/persistence, foreground/background selection bars in all modes, annotation colors/font size, scoped eraser with bold preservation');
}
