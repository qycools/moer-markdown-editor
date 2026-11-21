import assert from 'node:assert/strict';
import type { Frame, Locator, Page } from 'playwright-core';

export async function checkOutlineHover(frame: Frame | Page, background: string, foreground?: string) {
  const row = frame.locator('#outline [data-heading]:not([aria-current])').first();
  await frame.locator('[data-action=outline]').hover();
  const normal = await row.evaluate(element => getComputedStyle(element).color);
  await row.hover();
  const colors = await row.evaluate(element => {
    const style = getComputedStyle(element);
    return [style.backgroundColor, style.color];
  });
  assert.deepEqual(colors, [background, foreground ?? normal], 'Outline hover uses the native list colors');
}

export async function checkSelectedButtonColors(button: Locator) {
  const colors = await button.evaluate(element => {
    const probe = document.createElement('span');
    probe.style.backgroundColor = 'var(--vscode-inputOption-activeBackground)';
    probe.style.color = 'var(--vscode-inputOption-activeForeground)';
    probe.style.outlineColor = 'var(--vscode-inputOption-activeBorder)';
    document.body.append(probe);
    const read = (target: Element) => {
      const style = getComputedStyle(target);
      return [style.backgroundColor, style.color, style.outlineColor];
    };
    const result = { actual: read(element), expected: read(probe) };
    probe.remove();
    return result;
  });
  assert.deepEqual(colors.actual, colors.expected, 'Selected buttons use native VS Code option colors');
}

export async function checkNativeColors(frame: Frame | Page) {
  const page = 'page' in frame ? frame.page() : frame;
  await frame.evaluate(() => getSelection()?.removeAllRanges());
  await frame.locator('#selection-colors').waitFor({ state: 'hidden' });
  const original = await frame.evaluate(() => window.VM_APP.getValue());
  const expectColor = async (element: Locator, property: 'color' | 'backgroundColor', css: string) => {
    const colors = await element.evaluate((element, { property, css }) => {
      const probe = document.createElement('span'); probe.style[property] = css; document.body.append(probe);
      const expected = getComputedStyle(probe)[property], actual = getComputedStyle(element)[property]; probe.remove();
      return { actual, expected };
    }, { property, css });
    assert.equal(colors.actual, colors.expected, `${property} follows ${css}`);
  };
  const mode = await frame.evaluate(() => window.VM_APP.editor.vditor.currentMode);
  const links = frame.locator(mode === 'ir' ? '.vditor-ir :is(.vditor-ir__link,[data-type=link-ref])' : mode === 'sv' ? '.vditor-preview a' : '.vditor-wysiwyg :is(a,[data-type=link-ref])');
  const link = links.first();
  await link.waitFor({ state: 'visible' });
  await frame.locator('[data-action=source]').hover();
  assert.ok(await links.count() >= 2, `Inline and reference links are rendered in ${mode}`);
  for (const item of await links.all()) await expectColor(item, 'color', 'var(--vscode-textLink-foreground)');
  await link.hover();
  await expectColor(link, 'color', 'var(--vscode-textLink-activeForeground)');
  const button = frame.locator('[data-action=source]');
  await button.hover();
  await expectColor(button, 'color', 'var(--vscode-icon-foreground)');
  await expectColor(button, 'backgroundColor', 'var(--vscode-toolbar-hoverBackground)');
  await page.mouse.down();
  try { await expectColor(button, 'backgroundColor', 'var(--vscode-toolbar-activeBackground)'); }
  finally { await link.hover(); await page.mouse.up(); }
  await expectColor(frame.locator('#toolbar'), 'backgroundColor', 'var(--vscode-editor-background)');
  await frame.locator('[data-action=settings]').click();
  await frame.waitForFunction(() => document.querySelector('[data-action=settings]')!.getAttribute('aria-expanded') === 'true');
  await checkSelectedButtonColors(frame.locator('[data-action=settings]'));
  await page.keyboard.press('Escape');
  assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), original, 'Checking link and toolbar colors leaves Markdown unchanged');
}
