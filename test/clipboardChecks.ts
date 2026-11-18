import assert from 'node:assert/strict';
import type { Page } from 'playwright-core';

export async function checkClipboardItems(page: Page) {
  const before = await page.evaluate(() => (window as any).VM_MESSAGES.filter((m: any) => m.type === 'image').length);
  const prevented = await page.evaluate(() => {
    const app = window.VM_APP;
    const surface = app.editor.vditor.currentMode === 'sv' ? app.editor.vditor.sv.element : app.editor.vditor[app.editor.vditor.currentMode === 'ir' ? 'ir' : 'wysiwyg'].element;
    const file = new File([new Uint8Array([137, 80, 78, 71])], 'clipboard.png', { type: 'image/png' });
    const event = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', { value: { files: [], items: [{ kind: 'file', type: file.type, getAsFile: () => file }] } });
    surface.dispatchEvent(event);
    return event.defaultPrevented;
  });
  assert.equal(prevented, true, 'Clipboard file items should use image upload handling');
  await page.waitForFunction(count => (window as any).VM_MESSAGES.filter((m: any) => m.type === 'image').length > count, before);
  const message = await page.evaluate(() => (window as any).VM_MESSAGES.filter((m: any) => m.type === 'image').at(-1));
  assert.equal(message.mime, 'image/png');
  assert.equal(message.data, 'iVBORw==');
  console.log('PASS clipboard image items when the files list is empty');
}
