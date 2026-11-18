import assert from 'node:assert/strict';
import type { Frame, Page } from 'playwright-core';

export async function checkEditorUI(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, clipboard: { read: () => Promise<string>; write: (text: string) => Promise<void> }) {
  const page = 'page' in frame ? frame.page() : frame;
  const mode = async (value: string) => {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(value);
    await frame.locator('#settings-done').click();
    await frame.waitForFunction(value => window.VM_APP.editor.vditor.currentMode === value, value);
  };
  const long = Array.from({ length: 80 }, (_, i) => `## Section ${i + 1}\n\n${'Scrolling content. '.repeat(12)}\n`).join('\n') + '\nDOCUMENT_END\n';
  await replaceDocument(long);
  if (!await frame.locator('#outline').isVisible()) await frame.locator('[data-action=outline]').click();
  for (const value of ['ir', 'wysiwyg', 'sv']) {
    await mode(value);
    const before = await frame.locator('#toolbar').boundingBox();
    const surface = value === 'sv' ? '.vditor-sv' : `.vditor-${value}>.vditor-reset`;
    await frame.locator(surface).evaluate(e => e.scrollTop = 0);
    await frame.locator(surface).hover(); await page.mouse.wheel(0, 850);
    await frame.waitForFunction(selector => window.document.querySelector(selector)!.scrollTop > 100, surface);
    await frame.locator(surface).evaluate(e => e.scrollTop = e.scrollHeight);
    assert.equal(await frame.locator(surface).evaluate(e => e.scrollTop + e.clientHeight >= e.scrollHeight - 2), true, `${value}: document bottom is reachable`);
    const bottom = await frame.locator(surface).evaluate(e => e.scrollTop);
    await frame.locator(surface).hover(); await page.mouse.wheel(0, -650);
    await frame.waitForFunction(({selector,bottom}) => window.document.querySelector(selector)!.scrollTop < bottom - 100, {selector:surface,bottom});
    const after = await frame.locator('#toolbar').boundingBox();
    assert.equal(after!.y, before!.y, `${value}: toolbar stays at the top`);
    assert.ok(after!.height <= 44, 'Toolbar uses compact VS Code dimensions');
    assert.equal(await frame.locator('#toolbar svg').first().evaluate(e => e.getBoundingClientRect().width), 16);
    if (value !== 'sv') assert.equal(await frame.locator(surface + ' h2').first().evaluate(e => getComputedStyle(e, '::before').content), 'none');
    const docScroll = await frame.locator(surface).evaluate(e => e.scrollTop);
    await frame.locator('#outline').hover(); await page.mouse.wheel(0, 500);
    await frame.waitForFunction(() => window.document.querySelector('#outline')!.scrollTop > 0);
    assert.equal(await frame.locator(surface).evaluate(e => e.scrollTop), docScroll, 'Outline scroll is independent');
  }
  const json = '{\n  "apple": 0.6,\n  "banana": 0.4\n}\n';
  const fixture = '# Code block\n\n```json\n' + json + '```\n\nKeep this paragraph.\n';
  for (const value of ['ir', 'wysiwyg']) {
    await mode(value); await replaceDocument(fixture);
    await frame.waitForFunction(() => window.document.querySelectorAll('.vm-code-toolbar').length === 1);
    const bar = frame.locator('.vm-code-toolbar');
    const before = await frame.evaluate(() => window.VM_APP.getValue());
    const themeId=await frame.evaluate(()=>window.VM_BOOT.themes.find((theme:any)=>theme.kind==='light').id);
    await bar.locator('.vm-code-theme').click(); await frame.locator('[data-theme-id="'+themeId+'"]').click();
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), before, 'Theme must not modify Markdown');
    await bar.locator('[data-code-action=copy]').click();
    await frame.waitForFunction(() => window.document.querySelector('#status')!.textContent === '代码已复制');
    assert.equal(await clipboard.read(), json, 'Copy returns plain code, without controls');
    await bar.locator('.vm-code-language').selectOption('python');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('```python'));
    await clipboard.write("print('<safe>&')\n");
    await bar.locator('[data-code-action=paste]').click();
    await frame.waitForFunction(() => window.VM_APP.getValue().includes("print('<safe>&')"));
    assert.equal(await frame.locator('.vm-code-block safe').count(), 0, 'Pasted code remains literal text');
    const md = await frame.evaluate(() => window.VM_APP.getValue());
    assert.ok(!md.includes('vm-code-toolbar') && !md.includes('粘贴代码'), 'Controls never serialize into Markdown');
    await frame.evaluate(() => {
      const code = window.document.querySelector('.vm-code-block pre>code')!;
      const range = window.document.createRange(); range.setStart(code.firstChild!,0); range.setEnd(code.firstChild!,1);
      getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
    });
    await clipboard.write('REPLACED'); await bar.locator('[data-code-action=paste]').click();
    await frame.waitForFunction(()=>window.document.querySelector('.vm-code-block pre>code')!.textContent!.startsWith('REPLACED'));
    await bar.locator('[data-code-action=trash]').click();
    await frame.waitForFunction(() => !window.VM_APP.getValue().includes('```'));
    assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /Keep this paragraph/);
    assert.equal(await frame.evaluate(()=>window.document.activeElement === window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element),true,'Deletion returns focus to the editor');
  }
  await mode('ir'); await replaceDocument(fixture);
  await frame.waitForFunction(() => !!window.document.querySelector('.vm-code-toolbar'));
  await frame.locator('.vm-code-theme').click(); await frame.locator('[data-theme-id=auto]').click();
  await page.screenshot({ path: '.test-results/code-block-default-0.1.2.png' });
  console.log('PASS scrolling in all modes, fixed 16px toolbar, independent outline, hidden heading labels, code language/theme/copy/paste/delete');
}
