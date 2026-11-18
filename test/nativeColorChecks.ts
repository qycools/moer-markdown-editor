import assert from 'node:assert/strict';
import type { Frame, Locator, Page } from 'playwright-core';

export async function checkNativeColors(frame: Frame | Page) {
  const page = 'page' in frame ? frame.page() : frame;
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
  await expectColor(frame.locator('[data-action=settings]'), 'backgroundColor', 'var(--vscode-actionBar-toggledBackground,var(--vscode-toolbar-activeBackground,var(--toolbar-selected-fallback)))');
  await page.keyboard.press('Escape');
  assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), original, 'Checking link and toolbar colors leaves Markdown unchanged');
}
