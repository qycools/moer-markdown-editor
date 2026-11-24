import assert from 'node:assert/strict';
import type { Frame, Page } from 'playwright-core';

export async function checkRichClipboard(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, readClipboard: () => Promise<{ text: string; html: string }>) {
  const fixture = '## Copy heading\n\n**Bold** and *italic* with `code`.\n\n- List item\n\n| Cell<wbr data-moye-col-width="184"> | Other |\n| :---: | ---: |\n| Value | 9 |\n\n```js\nconst copy = 42;\n```\n';
  for (const mode of ['wysiwyg', 'ir']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(fixture);
    const surface = frame.locator(`.vditor-${mode}>.vditor-reset`);
    const copy = async (source: boolean) => {
      await frame.locator(`#vm-selection-copy [data-copy=${source ? 'markdown' : 'text'}]`).click();
      await frame.waitForFunction(status => document.querySelector('#status')?.textContent === status, source ? '已复制 Markdown 源码' : '已复制纯文本');
      return readClipboard();
    };
    await surface.evaluate(element => {
      element.focus();
      const range = document.createRange(); range.selectNodeContents(element);
      const selection = getSelection()!; selection.removeAllRanges(); selection.addRange(range);
    });
    await surface.locator('h2').click({ button: 'right' });
    const all = await copy(true);
    assert.match(all.text, /\*\*Bold\*\*/);
    for (const tag of ['h2', 'strong', 'em', 'code', 'ul', 'table', 'td']) assert.match(all.html, new RegExp(`<${tag}(?:\\s|>)`));
    assert.doesNotMatch(all.html, /vditor-|contenteditable|\*\*Bold\*\*/);
    assert.match(all.html, /<pre><code class="language-js">/);
    assert.equal(all.html.replaceAll(/<[^>]+>/g, '').match(/const copy = 42;/g)?.length, 1);
    const geometry = await frame.evaluate(html => [...new DOMParser().parseFromString(html, 'text/html').querySelectorAll('th,td')].map(cell => ({
      width: cell.getAttribute('width'), align: cell.getAttribute('align'),
      styleWidth: (cell as HTMLElement).style.width, styleAlign: (cell as HTMLElement).style.textAlign,
    })), all.html);
    const centered = { width: '184', align: 'center', styleWidth: '184px', styleAlign: 'center' };
    const right = { width: null, align: 'right', styleWidth: '', styleAlign: 'right' };
    assert.deepEqual(geometry, [centered, right, centered, right]);
    assert.doesNotMatch(all.html, /data-moye-col-width/);
    const bold = surface.locator('strong');
    for (const source of [false, true]) {
      await bold.click();
      const position = await bold.evaluate(element => {
        (element.closest('[contenteditable=true]') as HTMLElement).focus();
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        let offset = 0, node: Node | null;
        while ((node = walker.nextNode())) {
          const next = offset + node.textContent!.length;
          if (offset <= 1 && next > 1) range.setStart(node, 1 - offset);
          if (next >= 3) { range.setEnd(node, 3 - offset); break; }
          offset = next;
        }
        const selection = getSelection()!; selection.removeAllRanges(); selection.addRange(range);
        const selected = range.getBoundingClientRect(), bounds = element.getBoundingClientRect();
        return { x: selected.left - bounds.left + selected.width / 2, y: selected.top - bounds.top + selected.height / 2 };
      });
      await bold.click({ button: 'right', position });
      const partial = await copy(source);
      assert.equal(partial.text, 'ol');
      if (source) assert.match(partial.html, /<strong>ol<\/strong>/);
      else assert.equal(partial.html, '');
    }
  }
  console.log('PASS Markdown and HTML clipboard formats for full documents and partial formatting');
}

export async function checkClipboardItems(page: Page) {
  await page.evaluate(() => {
    const text = 'Paste here.\n\nKeep this paragraph.\n';
    (window as any).VM_DOCUMENT = text; window.VM_APP.applyDocument(text, 709);
  });
  const before = await page.evaluate(() => (window as any).VM_MESSAGES.filter((m: any) => m.type === 'image').length);
  const prevented = await page.evaluate(() => {
    const app = window.VM_APP;
    const surface = app.editor.vditor.currentMode === 'sv' ? app.editor.vditor.sv.element : app.editor.vditor[app.editor.vditor.currentMode === 'ir' ? 'ir' : 'wysiwyg'].element;
    surface.focus();
    const select = (index: number) => {
      if (surface instanceof HTMLTextAreaElement) {
        const offset = index ? surface.value.length : 'Paste '.length;
        surface.setSelectionRange(offset, offset);
      } else {
        const text = surface.querySelectorAll('p')[index].firstChild;
        const range = document.createRange(); range.setStart(text, index ? 0 : 'Paste '.length); range.collapse(true);
        getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
      }
    };
    select(0);
    const file = new File([new Uint8Array([137, 80, 78, 71])], 'clipboard.png', { type: 'image/png' });
    const event = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', { value: { files: [], items: [{ kind: 'file', type: file.type, getAsFile: () => file }] } });
    surface.dispatchEvent(event);
    select(1);
    return event.defaultPrevented;
  });
  assert.equal(prevented, true, 'Clipboard file items should use image upload handling');
  await page.waitForFunction(count => (window as any).VM_MESSAGES.filter((m: any) => m.type === 'image').length > count, before);
  const message = await page.evaluate(() => (window as any).VM_MESSAGES.filter((m: any) => m.type === 'image').at(-1));
  assert.equal(message.mime, 'image/png');
  assert.equal(message.data, 'iVBORw==');
  await page.waitForFunction(() => /^Paste !\[clipboard\.png\]\(assets\/clipboard\.png\)here\.\n/.test((window as any).VM_DOCUMENT));
  assert.equal(await page.evaluate(() => (window as any).VM_DOCUMENT.endsWith('\n\nKeep this paragraph.\n')), true);
  console.log('PASS clipboard image items and insertion at the original paste position');
}
