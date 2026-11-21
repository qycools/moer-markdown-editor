import assert from 'node:assert/strict';
import type { Frame, Page } from 'playwright-core';

export async function checkInlineSource(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>) {
  const page = 'page' in frame ? frame.page() : frame;
  const original = '# Formatting\n\n作为 prefix，在微调 时只修改这一段。\n\n> 保留原始 Markdown。\n';
  const phrase = '为 prefix，在微调';
  const toolbar = frame.locator('#toolbar');
  for (const mode of ['ir', 'wysiwyg', 'sv']) {
    await toolbar.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    const surface = frame.locator(mode === 'sv' ? '.vditor-sv' : `.vditor-${mode}>.vditor-reset`);
    for (const { action, marker, tag } of [{ action: 'bold', marker: '**', tag: 'strong' }, { action: 'italic', marker: '*', tag: 'em' }]) {
      await replaceDocument(original);
      await surface.evaluate((element, selected) => {
        element.focus();
        if (element instanceof HTMLTextAreaElement) {
          const index = element.value.indexOf(selected);
          element.setSelectionRange(index, index + selected.length);
        } else {
          const text = element.querySelector('p')!.firstChild!;
          const index = text.textContent!.indexOf(selected);
          const range = document.createRange();
          range.setStart(text, index); range.setEnd(text, index + selected.length);
          getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
        }
      }, phrase + ' ');
      await toolbar.locator(`[data-action=${action}]`).click();
      const expected = original.replace(phrase, `${marker}${phrase}${marker}`);
      assert.equal(await frame.evaluate(() => window.VM_APP.getValue().replace(/\r\n/g, '\n')), expected);
      if (mode !== 'sv') {
        assert.equal(await surface.locator(`p ${tag}`).first().textContent(), phrase);
        assert.equal(await surface.locator('p').first().innerText(), '作为 prefix，在微调 时只修改这一段。');
      }
      await toolbar.locator(`[data-action=${action}]`).click();
      assert.equal(await frame.evaluate(() => window.VM_APP.getValue().replace(/\r\n/g, '\n')), original);
    }
    if (mode === 'sv') continue;
    await replaceDocument('Type here.\n');
    await surface.evaluate(element => {
      element.focus();
      const range = document.createRange();
      range.setStart(element.querySelector('p')!.firstChild!, 5);
      range.collapse(true);
      getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
    });
    await toolbar.locator('[data-action=bold]').click();
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue().trimEnd()), 'Type here.');
    await page.keyboard.insertText('new');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('Type **new**here.'));
  }
  await toolbar.locator('[data-action=settings]').click();
  await frame.locator('[data-setting=mode]').selectOption('ir');
  await frame.locator('#settings-done').click();
  console.log('PASS bold and italic edit Markdown, preserve boundary spaces, render, toggle off and type in place');
}

export async function checkHistoryLocation(page: Page) {
  const paragraphs = Array.from({ length: 70 }, (_, index) => `## Chapter ${index + 1}\r\n\r\nParagraph ${index + 1}\r\n`).join('\r\n');
  const offset = paragraphs.indexOf('Paragraph 42');
  for (const mode of ['wysiwyg', 'sv', 'ir']) {
    await page.locator('[data-action=settings]').click();
    await page.locator('[data-setting=mode]').selectOption(mode);
    await page.locator('#settings-done').click();
    const surface = page.locator(mode === 'sv' ? '.vditor-sv' : `.vditor-${mode}>.vditor-reset`);
    for (const [action, text, label] of [
      ['undo', paragraphs, 'Paragraph 42'],
      ['redo', paragraphs.replace('Paragraph 42', 'Updated 42'), 'Updated 42'],
    ]) {
      await surface.evaluate(element => { element.scrollTop = 0; });
      await page.evaluate(({ action, text, offset }) => {
        (window as any).VM_DOCUMENT = text;
        window.VM_APP.applyDocument(text, 513, { action, offset });
      }, { action, text, offset });
      assert.equal(await page.locator('#status').textContent(), action === 'undo' ? '已撤销' : '已重做');
      if (mode === 'sv') {
        const result = await surface.evaluate((element: HTMLTextAreaElement) => ({
          selected: element.value.slice(element.selectionStart, element.selectionStart + 12),
          top: element.scrollTop,
        }));
        assert.ok(result.top > 100);
        assert.ok(result.selected.startsWith(label));
      } else {
        const bounds = await surface.boundingBox(), paragraph = await surface.getByText(label, { exact: true }).boundingBox();
        assert.ok(paragraph!.y >= bounds!.y && paragraph!.y + paragraph!.height <= bounds!.y + bounds!.height, `${mode} reveals the edited paragraph`);
      }
    }
  }
  console.log('PASS undo and redo locations in all modes with CRLF');
}

export async function checkDocumentLinks(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, back: () => Promise<void>, checkExternal?: (click: () => Promise<void>, href: string) => Promise<void>) {
  const padding = Array.from({ length: 36 }, (_, index) => `Spacer ${index + 1}.`).join('\n\n');
  const filename = encodeURIComponent(await frame.evaluate(() => window.VM_BOOT.filename as string));
  const fixture = [
    '# Intro', padding, '[**Jump to section**](#section-two)', '[External site](https://example.org/?from=markdown#top)',
    '[Local file](./some%20file.md)', `[Custom anchor](./${filename}#custom_id)`, '[Missing](#missing)',
    padding, '## Section Two', '| Chapter |\n| --- |\n| [Next chapter][target] |', padding, '## 中文标题', padding,
    '## Custom heading {#custom_id}', padding, '[target]: #%E4%B8%AD%E6%96%87%E6%A0%87%E9%A2%98',
  ].join('\n\n') + '\n';
  for (const mode of ['wysiwyg', 'sv', 'ir']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(fixture);
    const beforeText = await frame.evaluate(() => window.VM_APP.getValue());
    const selector = mode === 'sv' ? '.vditor-preview' : `.vditor-${mode}>.vditor-reset`;
    const surface = frame.locator(selector);
    const link = (label: string) => surface.locator(mode === 'ir' ? '.vditor-ir__link:not([data-type=link-ref] *), span[data-type=link-ref]' : 'a[href], span[data-type=link-ref]').filter({ hasText: label });
    const top = () => surface.evaluate(element => element.scrollTop);
    const waitForTop = (position: number) => frame.waitForFunction(({ selector, position }) =>
      Math.abs(document.querySelector(selector)!.scrollTop - position) <= 1, { selector, position }, { timeout: 8000 });
    const revealed = async (label: string) => {
      const heading = surface.locator('h2').filter({ hasText: label });
      const viewport = await surface.boundingBox(), bounds = await heading.boundingBox();
      assert.ok(bounds && viewport && bounds.y >= viewport.y && bounds.y + bounds.height < viewport.y + viewport.height, `${mode} reveals ${label}`);
    };

    const first = link('Jump to section');
    await first.scrollIntoViewIfNeeded();
    const beforeFirst = await top();
    assert.ok(beforeFirst > 0);
    await first.click();
    await revealed('Section Two');

    const next = link('Next chapter');
    await next.scrollIntoViewIfNeeded();
    const beforeNext = await top();
    await next.click();
    await revealed('中文标题');
    await back();
    await waitForTop(beforeNext);
    await back();
    await waitForTop(beforeFirst);

    const custom = link('Custom anchor');
    await custom.scrollIntoViewIfNeeded();
    const beforeCustom = await top();
    await custom.click();
    await revealed('Custom heading');
    await back();
    await waitForTop(beforeCustom);

    const missing = link('Missing');
    await missing.scrollIntoViewIfNeeded();
    const beforeMissing = await top();
    await missing.click();
    assert.match(await frame.locator('#status').innerText(), /找不到文档内链接目标.*missing/);
    await waitForTop(beforeMissing);
    if (checkExternal) {
      await checkExternal(() => link('External site').click(), 'https://example.org/?from=markdown#top');
      await checkExternal(() => link('Local file').click(), './some%20file.md');
    }
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), beforeText, 'Links leave the Markdown unchanged');
  }
  console.log('PASS document anchor jumps, reference links, missing targets and multi-step back in three modes');
}

export async function checkFindAndFormatting(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>) {
  const fixture = [
    '### Heading **bold**', 'Plain *italic* ~~strike~~ `inline` with $x^2$.',
    '[Reference][id]', '- Bullet\n- [ ] Task', '1. Ordered', '> Quoted',
    '| Header | Two |\n| --- | --- |\n| Cell | Value |',
    '```js\nconst token = "Token";\n```', 'A **Token** token.', '[id]: https://example.org',
  ].join('\n\n') + '\n';
  const input = frame.locator('#search-input'), count = frame.locator('#search-count');
  const panel = frame.locator('#search-bar'), toggle = frame.locator('#search-toggle-replace');
  const toolbar = frame.locator('#toolbar'), search = toolbar.locator('[data-action=search]');
  for (const mode of ['ir', 'wysiwyg', 'sv']) {
    await toolbar.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(fixture);
    const root = frame.locator(`.vditor-${mode}`);
    if (mode !== 'sv') {
      const handle = frame.locator('.vm-block-handle[data-heading-level=H3]');
      const level = () => handle.evaluate(element => getComputedStyle(element, '::before').content);
      await root.locator('h3').hover();
      assert.equal(await level(), '"H3"');
      const position = await handle.evaluate(element => ({
        right: parseFloat(getComputedStyle(element, '::before').right),
        width: element.getBoundingClientRect().width,
      }));
      assert.ok(position.right > position.width, 'The heading level is left of the grip');
      await root.locator('em').hover();
      assert.equal(await level(), 'none');
      const check = async (selector: string, active: string[]) => {
        await root.locator(selector).first().click();
        await frame.waitForFunction(actions => actions.every(id => document.querySelector(`[data-action=${id}]`)?.getAttribute('aria-pressed') === 'true'), active);
      };
      await check('h3 strong', ['headings', 'bold']);
      await check('em', ['italic']);
      await check('s', ['strike']);
      await check('[data-type=link-ref]', ['link']);
      await check('li:not(.vditor-task)', ['list']);
      await check('.vditor-task', ['check']);
      await check('ol li', ['ordered-list']);
      await check('blockquote p', ['quote']);
      await check('td', ['table']);
      const preview = 'pre[class*="__preview"]>code.language-js';
      await check(preview, ['code']);
      assert.equal(await root.locator(preview).isVisible(), true, 'Single click retains rendered code');
      const formula = root.locator('[class*="__preview"] .katex').first();
      await formula.click();
      assert.equal(await formula.isVisible(), true, 'Single click retains the formula');
      await frame.waitForFunction(() => document.querySelector('[data-action=code]')?.getAttribute('aria-pressed') === 'false');
      assert.equal(await root.locator('.vditor-ir__marker').evaluateAll(markers => markers.some(marker => !!marker.getClientRects().length)), false);
      await root.locator(preview).dblclick();
      const code = root.locator('[data-type=code-block]>pre:not([class*="__preview"])>code');
      await code.waitFor({ state: 'visible' });
      await ('page' in frame ? frame.page() : frame).keyboard.type('// ');
      assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /\/\/ const token/);
      await root.locator('em').click();
    }
    const editorBounds = await frame.locator('#editor').boundingBox();
    await search.click();
    const panelBounds = await panel.boundingBox(), toolbarBounds = await toolbar.boundingBox();
    assert.deepEqual(await frame.locator('#editor').boundingBox(), editorBounds, 'Opening search preserves the editing area');
    assert.ok(Math.abs(panelBounds!.y - toolbarBounds!.y - toolbarBounds!.height) <= 1);
    assert.ok(toolbarBounds!.x + toolbarBounds!.width - panelBounds!.x - panelBounds!.width <= 9);
    await input.fill('token');
    assert.equal(await count.textContent(), '1 / 4');
    await input.press('Enter');
    assert.equal(await count.textContent(), '2 / 4');
    await input.press('Shift+Enter');
    assert.equal(await count.textContent(), '1 / 4');
    await frame.locator('#search-case').check();
    assert.equal(await count.textContent(), '1 / 2');
    if (await frame.locator('#search-replace-row').isHidden()) await toggle.click();
    await frame.locator('#search-replacement').fill('result');
    await frame.locator('#search-replace').click();
    assert.equal(await count.textContent(), '1 / 1');
    assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /const result = "Token";/);
    await frame.locator('#search-case').uncheck();
    assert.equal(await count.textContent(), '1 / 3');
    await frame.locator('#search-replace-all').click();
    assert.equal(await count.textContent(), '0 / 0');
    assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /A \*\*result\*\* result\./);
    if (mode !== 'sv') {
      await input.fill('A result');
      await frame.locator('#search-replacement').fill('**literal**');
      await frame.locator('#search-replace').click();
      assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /\\\*\\\*literal\\\*\\\* result\./);
      await input.fill('**literal**');
      assert.equal(await count.textContent(), '1 / 1');
      await frame.locator('#search-replacement').fill('Plain');
      await frame.locator('#search-replace').click();
      assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /\nPlain result\./);
    }
    await input.fill('A **');
    assert.equal(await count.textContent(), mode === 'sv' ? '1 / 1' : '0 / 0', 'Search interprets asterisks literally');
    await input.fill('result');
    await input.press('Escape');
    assert.equal(await panel.count(), 0);
    assert.equal(await frame.evaluate(() => CSS.highlights?.has('vm-find') ?? false), false);
  }
  console.log('PASS top-right find and replace in all modes, heading hover, visual previews and formatting state');
}

export async function checkEditorUI(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, readClipboard: () => Promise<string>) {
  const page = 'page' in frame ? frame.page() : frame;
  const mode = async (value: string) => {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(value);
    await frame.locator('#settings-done').click();
    await frame.waitForFunction(value => window.VM_APP.editor.vditor.currentMode === value, value);
  };
  const long = Array.from({ length: 80 }, (_, i) => `${i ? `## Section ${i + 1}` : 'Section 1\n---------'}\n\n${'Scrolling content. '.repeat(12)}\n`).join('\n')
    .replace('## Section 2', '````text\n```\n## Inside a code fence\n````\n\n## Section 2') + '\nDOCUMENT_END\n';
  await replaceDocument(long);
  if (!await frame.locator('#outline').isVisible()) await frame.locator('[data-action=outline]').click();
  const current = '#outline [aria-current=location]';
  const expectChapter = (name: string) => frame.waitForFunction(({ current, name }) => document.querySelector(current)?.textContent === name, { current, name });
  for (const value of ['ir', 'wysiwyg', 'sv']) {
    await mode(value);
    const before = await frame.locator('#toolbar').boundingBox();
    const surface = value === 'sv' ? '.vditor-sv' : `.vditor-${value}>.vditor-reset`;
    await frame.locator(surface).evaluate(e => e.scrollTop = 0);
    await expectChapter('Section 1');
    await frame.locator(surface).hover(); await page.mouse.wheel(0, 850);
    await frame.waitForFunction(selector => window.document.querySelector(selector)!.scrollTop > 100, surface);
    await frame.waitForFunction(current => Number(document.querySelector<HTMLElement>(current)?.dataset.heading) > 0, current);
    await frame.locator(surface).evaluate(e => e.scrollTop = e.scrollHeight);
    assert.equal(await frame.locator(surface).evaluate(e => e.scrollTop + e.clientHeight >= e.scrollHeight - 2), true, `${value}: document bottom is reachable`);
    await expectChapter('Section 80');
    assert.equal(await frame.locator(current).evaluate(row => {
      const panel = row.parentElement!;
      const bounds = row.getBoundingClientRect(), top = panel.getBoundingClientRect().top + panel.clientTop;
      return bounds.top >= top - 1 && bounds.bottom <= top + panel.clientHeight + 1;
    }), true, `${value}: the current chapter is visible in the outline`);
    const bottom = await frame.locator(surface).evaluate(e => e.scrollTop);
    await frame.locator(surface).hover(); await page.mouse.wheel(0, -650);
    await frame.waitForFunction(({selector,bottom}) => window.document.querySelector(selector)!.scrollTop < bottom - 100, {selector:surface,bottom});
    const after = await frame.locator('#toolbar').boundingBox();
    assert.equal(after!.y, before!.y, `${value}: toolbar stays at the top`);
    assert.ok(after!.height <= 44, 'Toolbar uses compact VS Code dimensions');
    assert.equal(await frame.locator('#toolbar svg').first().evaluate(e => e.getBoundingClientRect().width), 16);
    if (value !== 'sv') assert.equal(await frame.locator(surface + ' h2').first().evaluate(e => getComputedStyle(e, '::before').content), 'none');
    const docScroll = await frame.locator(surface).evaluate(e => e.scrollTop);
    const outlineScroll = await frame.locator('#outline').evaluate(e => e.scrollTop);
    await frame.locator('#outline').hover(); await page.mouse.wheel(0, -500);
    await frame.waitForFunction(before => document.querySelector('#outline')!.scrollTop < before, outlineScroll);
    assert.equal(await frame.locator(surface).evaluate(e => e.scrollTop), docScroll, 'Outline scroll is independent');
    await frame.locator('#outline').getByRole('button', { name: 'Section 41', exact: true }).click();
    await expectChapter('Section 41');
    if (value === 'sv') {
      assert.equal(await frame.locator(surface).evaluate((e: HTMLTextAreaElement) => e.value.slice(e.selectionStart, e.selectionEnd)), '## Section 41');
    }
  }
  await frame.locator('[data-action=outline]').click();
  await frame.locator('#outline').waitFor({ state: 'hidden' });
  await frame.locator('.vditor-sv').evaluate((e: HTMLTextAreaElement) => { e.setSelectionRange(0, 0); e.scrollTop = 0; });
  await frame.locator('[data-action=outline]').click();
  await expectChapter('Section 1');
  await replaceDocument('---\ntitle: Sample\n# Metadata comment\n---\n\n' + long);
  await frame.locator('#outline').getByRole('button', { name: 'Section 41', exact: true }).click();
  await expectChapter('Section 41');
  assert.equal(await frame.locator('.vditor-sv').evaluate((e: HTMLTextAreaElement) => e.value.slice(e.selectionStart, e.selectionEnd)), '## Section 41');
  const json = `{\n  "apple": 0.6,\n  "longText": "${'a'.repeat(400)}"\n}\n`;
  const fixture = '# Code block\n\n```json\n' + json + '```\n\nKeep this paragraph.\n';
  for (const value of ['ir', 'wysiwyg']) {
    await mode(value); await replaceDocument(fixture + '\n```text\nKeep this code.\n```\n');
    await frame.waitForFunction(() => window.document.querySelectorAll('.vm-code-toolbar').length === 2);
    const bar = frame.locator('.vm-code-toolbar').filter({
      has: frame.locator('.vm-code-language option:checked:is([value=json],[value=python])'),
    });
    const wrap = bar.locator('[data-code-action=wrap]');
    const blocks = frame.locator(`.vditor-${value}>.vditor-reset [data-type=code-block]`);
    const preview = blocks.first().locator('pre[class*="__preview"]>code');
    const hasHorizontalScroll = () => preview.evaluate(code => code.scrollWidth > code.clientWidth);
    const before = await frame.evaluate(() => window.VM_APP.getValue());
    assert.deepEqual(await bar.getByRole('button').evaluateAll(buttons => buttons.map(button => button.getAttribute('aria-label'))),
      ['代码块主题', '自动换行', '复制代码', '删除代码块']);
    assert.equal(await wrap.getAttribute('aria-pressed'), 'false');
    assert.equal(await hasHorizontalScroll(), true, 'Long code lines start unwrapped');
    await wrap.click();
    assert.equal(await wrap.getAttribute('aria-pressed'), 'true');
    assert.equal(await hasHorizontalScroll(), false, 'Wrapping fits long words within the code block');
    assert.equal(await blocks.nth(1).locator('pre[class*="__preview"]>code').evaluate(code => getComputedStyle(code).whiteSpace), 'pre');
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), before, 'Wrapping preserves Markdown newlines');
    const themeId=await frame.evaluate(()=>window.VM_BOOT.themes.find((theme:any)=>theme.kind==='light').id);
    await bar.locator('.vm-code-theme').click(); await frame.locator('[data-theme-id="'+themeId+'"]').click();
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), before, 'Theme must not modify Markdown');
    await bar.locator('[data-code-action=copy]').click();
    await frame.waitForFunction(() => window.document.querySelector('#status')!.textContent === '代码已复制');
    assert.equal(await readClipboard(), json, 'Copy preserves the unwrapped code text');
    await bar.locator('.vm-code-language').selectOption('python');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('```python'));
    await preview.dblclick();
    const source = blocks.first().locator('pre:not([class*="__preview"])>code');
    await source.waitFor({ state: 'visible' });
    assert.equal(await source.evaluate(code => getComputedStyle(code).whiteSpace), 'pre-wrap');
    await page.keyboard.type('# ');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('# {'));
    await blocks.first().and(frame.locator('.vm-code-block.vm-code-wrap')).waitFor();
    assert.equal(await wrap.getAttribute('aria-pressed'), 'true', 'Wrap selection survives editing the block');
    assert.equal(await source.evaluate(code => getComputedStyle(code).whiteSpace), 'pre-wrap');
    const pasted = await source.evaluate(code => {
      const range = document.createRange();
      range.setStart(code.firstChild!, 0);
      range.setEnd(code.firstChild!, 1);
      getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
      const clipboardData = new DataTransfer();
      clipboardData.setData('text/plain', "print('<safe>&')");
      code.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData }));
      return code.textContent;
    });
    assert.match(pasted || '', /^print\('<safe>&'\)/, 'Paste replaces the selected text in the current code block');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes("```python\nprint('<safe>&')"));
    assert.equal(await blocks.first().locator('safe').count(), 0, 'Pasted code remains literal text');
    await frame.locator(`.vditor-${value}`).getByText('Keep this paragraph.', { exact: true }).click();
    await preview.waitFor({ state: 'visible' });
    await wrap.click();
    assert.equal(await wrap.getAttribute('aria-pressed'), 'false');
    assert.equal(await hasHorizontalScroll(), true, 'Turning off wrap restores horizontal scrolling');
    await bar.locator('[data-code-action=trash]').click();
    await frame.waitForFunction(() => !window.VM_APP.getValue().includes('```python'));
    assert.match(await frame.evaluate(() => window.VM_APP.getValue()), /Keep this paragraph\.[\s\S]*Keep this code\./);
    assert.equal(await frame.evaluate(()=>window.document.activeElement === window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element),true,'Deletion returns focus to the editor');
  }
  await mode('ir'); await replaceDocument(fixture);
  await frame.waitForFunction(() => !!window.document.querySelector('.vm-code-toolbar'));
  await frame.locator('.vm-code-theme').click(); await frame.locator('[data-theme-id=auto]').click();
  await page.screenshot({ path: '.test-results/code-block-default-0.1.2.png' });
  console.log('PASS outline follows scrolling and navigation in all modes, fixed toolbar, code buttons, per-block wrap, copy, paste and delete');
}
