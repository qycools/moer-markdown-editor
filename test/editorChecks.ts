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

export async function checkColorAndTableHistory(
  frame: Frame | Page,
  replaceDocument: (text: string) => Promise<void>,
  expectDocument: (text: string) => Promise<void>,
  history: (action: 'undo' | 'redo', text: string, offset: number) => Promise<void>,
) {
  const page = 'page' in frame ? frame.page() : frame;
  const paragraph = '`folders/check.json` saves the totals. Use `evaluate.py` to reproduce the results.';
  const table = '| Item | Count |\r\n|---|---:|\r\n| Input | 42 |';
  const original = `# Report\r\n\r\n${table}\r\n\r\n${'Spacer paragraph.\r\n\r\n'.repeat(55)}${paragraph}\r\n`;
  const offset = original.indexOf(paragraph);
  for (const mode of ['wysiwyg', 'sv', 'ir']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(original);
    const surface = frame.locator(mode === 'sv' ? '.vditor-sv' : `.vditor-${mode}>.vditor-reset`);
    const select = (all: boolean) => surface.evaluate((element, { all, paragraph }) => {
      element.focus({ preventScroll: true });
      if (element instanceof HTMLTextAreaElement) {
        const start = element.value.indexOf(paragraph), end = start + paragraph.length;
        element.setSelectionRange(all ? start : end, end);
      } else {
        const p = [...element.querySelectorAll('p')].find(p => p.textContent?.includes('saves the totals'))!;
        const range = document.createRange();
        const first = p.querySelector('code')!.firstChild!, last = p.lastChild!;
        range.setStart(all ? first : last, all ? 0 : last.textContent!.length);
        range.setEnd(last, last.textContent!.length);
        getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
        if (!all) p.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }, { all, paragraph });
    const assertRevealed = async () => {
      const position = await surface.evaluate(element => {
        if (element instanceof HTMLTextAreaElement) return { scroll: element.scrollTop, near: element.value.slice(element.selectionStart - 100, element.selectionStart + 100).includes('saves the totals') };
        const viewport = element.getBoundingClientRect();
        const p = [...element.querySelectorAll('p')].find(p => p.textContent?.includes('saves the totals'))!;
        const bounds = p.getBoundingClientRect();
        return { scroll: element.scrollTop, near: bounds.top >= viewport.top && bounds.bottom <= viewport.bottom && p.contains(getSelection()?.anchorNode || null) };
      });
      assert.ok(position.scroll > 100 && position.near, `${mode}: history reveals the edited paragraph`);
    };
    await select(false);
    await page.keyboard.insertText('!');
    const typed = original.replace(paragraph, paragraph + '!');
    await expectDocument(typed);
    await surface.evaluate(element => { element.scrollTop = 0; });
    await history('undo', original, offset + paragraph.length);
    await assertRevealed();
    await select(true);
    await surface.evaluate(() => document.dispatchEvent(new Event('selectionchange')));
    const swatch = frame.locator('#selection-colors [data-highlight-color]').first();
    const color = await swatch.getAttribute('data-highlight-color');
    await swatch.dispatchEvent('click');
    const marked = original.replace(paragraph, `<span style="background-color: ${color}">${paragraph}</span>`);
    await expectDocument(marked);
    if (mode !== 'sv') {
      const code = await surface.locator('p [data-vm-color] code:not(.vm-color-token, .vm-color-token *)').allTextContents();
      assert.deepEqual(code.map(text => text.replaceAll('\u200b', '')), ['folders/check.json', 'evaluate.py']);
    }
    for (const [action, text] of [['undo', original], ['redo', marked]] as const) {
      await surface.evaluate(element => { element.scrollTop = 0; });
      await history(action, text, offset);
      await assertRevealed();
    }
  }
  console.log('PASS inline code colors and local undo/redo preserve unedited tables in all modes');
}

export async function checkLiteralTextAndCopy(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, readClipboard: () => Promise<string>, bold?: () => Promise<void>) {
  const page = 'page' in frame ? frame.page() : frame;
  const phrase = '本次补充决定：';
  const applyBold = bold || (() => frame.locator('[data-action=bold]').click());
  for (const mode of ['wysiwyg', 'ir']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    const surface = frame.locator(`.vditor-${mode}>.vditor-reset`);
    await replaceDocument('**原格式**保留\n\n' + phrase + '李\n\n');
    const paragraph = surface.locator('p').nth(1);
    const select = async (locator: typeof paragraph, end: number | null) => locator.evaluate((element, end) => {
      (element.closest('[contenteditable=true]') as HTMLElement).focus();
      const node = [...element.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent?.replaceAll('\u200b', ''))!, range = document.createRange();
      const from = node.textContent!.search(/[^\u200b]/);
      range.setStart(node, from); range.setEnd(node, end === null ? node.textContent!.length : from + end);
      const selection = getSelection()!; selection.removeAllRanges(); selection.addRange(range);
    }, end);
    await select(paragraph, phrase.length);
    await applyBold();
    const formatted = paragraph.locator('strong');
    await formatted.waitFor();
    assert.equal(await formatted.innerText(), phrase);
    assert.equal((await paragraph.innerText()).replaceAll('\u200b', ''), phrase + '李');
    const copy = async (text: string, method: 'text' | 'markdown') => {
      await select(formatted, null);
      await formatted.click({ button: 'right' });
      await frame.locator(`#vm-selection-copy [data-copy=${method}]`).click();
      await frame.waitForFunction(value => document.querySelector('#status')?.textContent === value, method === 'text' ? '已复制纯文本' : '已复制 Markdown 源码');
      assert.equal(await readClipboard(), text);
    };
    await copy(phrase, 'text');
    await copy(`<strong>${phrase}</strong>`, 'markdown');
    await select(formatted, null);
    await applyBold();
    await formatted.waitFor({ state: 'detached' });
    assert.equal((await paragraph.innerText()).replaceAll('\u200b', ''), phrase + '李');
    await replaceDocument('**Keep** formatted.\n\nInput: \u200b\n');
    const line = surface.locator('p').nth(1);
    await line.click(); await page.keyboard.press('End');
    await page.keyboard.type('**'); await page.keyboard.insertText('我真帅'); await page.keyboard.type('** \x60code\x60');
    await frame.waitForFunction(() => window.VM_APP.getValue().includes('\\*\\*我真帅\\*\\*'));
    assert.equal((await line.innerText()).replaceAll('\u200b', ''), 'Input: **我真帅** `code`');
    assert.equal(await line.locator('strong,em,code').count(), 0);
    assert.equal(await surface.locator('strong').count(), 1, 'Imported Markdown remains formatted');
    await page.keyboard.press('Backspace');
    assert.equal((await line.innerText()).replaceAll('\u200b', ''), 'Input: **我真帅** `code');
    await replaceDocument('\n');
    await surface.focus();
    await page.keyboard.type('# Heading');
    assert.equal(await surface.locator('h1').count(), 0);
    assert.equal((await surface.innerText()).trim(), '# Heading');
    await replaceDocument('\n');
    await surface.focus();
    await page.keyboard.type('1. first');
    assert.equal(await surface.locator('ol').count(), 0);
    assert.equal((await surface.innerText()).trim(), '1. first');
    await replaceDocument('\n');
    await surface.focus();
    const literal = ':smile: ::b:: ~~test~~ ==mark== $x$ ^up^ a@example.com www.example.org';
    await page.keyboard.type(literal);
    assert.equal((await surface.innerText()).replaceAll('\u200b', '').trim(), literal);
    assert.equal(await surface.locator('a,s,mark,sup,.vditor-ir__preview,img').count(), 0);
    await replaceDocument('\n');
    await surface.focus();
    const lines = '## Literal heading\n**Literal bold**\n1. Literal list';
    await page.keyboard.insertText(lines);
    assert.equal((await surface.innerText()).replaceAll('\u200b', '').trim(), lines);
    assert.equal(await surface.locator('h2,strong,li').count(), 0);
  }
  console.log('PASS literal visual typing, adjacent CJK punctuation formatting and both selection copy formats');
}

export async function checkDocumentLinks(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, back: () => Promise<void>, checkExternal?: (click: () => Promise<void>, href: string) => Promise<void>) {
  const padding = Array.from({ length: 36 }, (_, index) => `Spacer ${index + 1}.`).join('\n\n');
  const filename = encodeURIComponent(await frame.evaluate(() => window.VM_BOOT.filename as string));
  const fixture = [
    '# Intro', padding, '[**Jump to section**](#section-two)', '[External site](https://example.org/?from=markdown#top)',
    '[Local file](./some%20file.md)', '![Preview image](./sample.svg)', `[Custom anchor](./${filename}#custom_id)`, '[Missing](#missing)',
    '[Local source line](./some%20file.md#L14)', '[Local source range](./some%20file.md#L14-L20)',
    '[Local heading link](./some%20file.md#1-chapter)',
    '[Current source line](#L49)', '[Remote source line](https://example.org/code#L14)',
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
    await waitForTop(beforeFirst);
    await first.hover();
    assert.equal(await frame.locator('.vm-link-hint').textContent(), 'Ctrl 键点击跳转链接');
    await first.click({ modifiers: ['Control'] });
    await revealed('Section Two');

    const next = link('Next chapter');
    await next.scrollIntoViewIfNeeded();
    const beforeNext = await top();
    await next.click({ modifiers: ['Control'] });
    await revealed('中文标题');
    await back();
    await waitForTop(beforeNext);
    await back();
    await waitForTop(beforeFirst);

    const custom = link('Custom anchor');
    await custom.scrollIntoViewIfNeeded();
    const beforeCustom = await top();
    await custom.click({ modifiers: ['Control'] });
    await revealed('Custom heading');
    await back();
    await waitForTop(beforeCustom);

    const missing = link('Missing');
    await missing.scrollIntoViewIfNeeded();
    const beforeMissing = await top();
    await missing.click({ modifiers: ['Control'] });
    assert.match(await frame.locator('#status').innerText(), /找不到文档内链接目标.*missing/);
    await waitForTop(beforeMissing);
    if (checkExternal) {
      await checkExternal(() => link('External site').click({ modifiers: ['Control'] }), 'https://example.org/?from=markdown#top');
      await checkExternal(() => link('Local file').click({ modifiers: ['Control'] }), './some%20file.md');
      await checkExternal(() => link('Local source line').click({ modifiers: ['Control'] }), './some%20file.md#L14');
      await checkExternal(() => link('Local source range').click({ modifiers: ['Control'] }), './some%20file.md#L14-L20');
      await checkExternal(() => link('Local heading link').click({ modifiers: ['Control'] }), './some%20file.md#1-chapter');
      await checkExternal(() => link('Current source line').click({ modifiers: ['Control'] }), '#L49');
      await checkExternal(() => link('Remote source line').click({ modifiers: ['Control'] }), 'https://example.org/code#L14');
      if (mode === 'sv') await checkExternal(() => surface.locator('img[alt="Preview image"]').click({ modifiers: ['Control'] }), './sample.svg');
    }
    assert.equal(await frame.evaluate(() => window.VM_APP.getValue()), beforeText, 'Links leave the Markdown unchanged');
  }
  console.log('PASS document anchor jumps, reference links, missing targets and multi-step back in three modes');
}

export async function checkAnchorTargets(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>) {
  const padding = Array.from({ length: 32 }, (_, index) => `Anchor spacer ${index + 1}.`).join('\n\n');
  const fixture = [
    '# Start', padding, '## 1. ViLT', padding, '## 图文比较', padding,
    '<a id="result-table"></a>', '| Header |\n| --- |\n| Markdown table payload |', padding,
    '<table id="html-table"><tr><td>HTML table payload</td></tr></table>', padding,
    '<p id="paragraph-detail">Paragraph payload</p>', padding,
    '<a name="code-area"></a>', '```text\nCode payload\n```', padding,
    '<a id="figure-area"></a>', '![Image payload](sample.svg)',
  ].join('\n\n') + '\n';
  const cases = [
    ['1-vilt', 'h2', '1. ViLT'],
    ['图文比较', 'h2', '图文比较'],
    ['result-table', 'table', 'Markdown table payload'],
    ['html-table', 'table', 'HTML table payload'],
    ['paragraph-detail', 'p', 'Paragraph payload'],
    ['code-area', '[data-type="code-block"],pre', 'Code payload'],
    ['figure-area', 'img[alt="Image payload"]', ''],
  ];
  for (const mode of ['ir', 'wysiwyg', 'sv']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(fixture);
    const selector = mode === 'sv' ? '.vditor-preview' : `.vditor-${mode}>.vditor-reset`;
    const jump = (anchor: string) => frame.evaluate(anchor => window.postMessage({ type: 'revealAnchor', anchor }, '*'), anchor);
    for (const [id, tag, label] of cases) {
      await jump(id);
      await frame.waitForFunction(({ selector, tag, label }) => {
        const surface = document.querySelector(selector);
        const element = [...(surface?.querySelectorAll(tag) ?? [])].find(element =>
          element.getClientRects().length && (!label || element.textContent?.includes(label)));
        if (!element || !surface) return false;
        const offset = element.getBoundingClientRect().top - surface.getBoundingClientRect().top;
        return offset >= -3 && offset <= 34;
      }, { selector, tag, label });
    }
    const scroll = frame.locator(selector);
    const before = await scroll.evaluate(element => element.scrollTop);
    await jump('missing-anchor');
    await frame.locator('#status').filter({ hasText: '找不到文档内链接目标：missing-anchor' }).waitFor();
    assert.equal(await scroll.evaluate(element => element.scrollTop), before);
    await replaceDocument('');
    await jump('empty-document-anchor');
    await frame.locator('#status').filter({ hasText: '找不到文档内链接目标：empty-document-anchor' }).waitFor();
  }
  console.log('PASS anchor navigation for headings, Markdown and HTML tables, paragraphs, code and images, plus missing targets in every mode');
}

export async function checkVisualLineJumps(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>) {
  const lead = Array.from({ length: 35 }, (_, index) => `Spacer ${index + 1}.`).join('\n\n');
  const fixture = ['# Start', lead, '## Line jump heading', 'Line jump paragraph.', '| Header | Detail |\n| --- | --- |\n| Line jump cell | Row body |', lead, '## Final line jump heading'].join('\n\n') + '\n';
  const source = fixture.split('\n');
  const line = (text: string) => source.findIndex(row => row.includes(text)) + 1;
  for (const mode of ['ir', 'wysiwyg', 'sv']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(fixture);
    const selector = mode === 'sv' ? '.vditor-preview' : `.vditor-${mode}>.vditor-reset`;
    const jump = async (start: number, end = start) => {
      await frame.evaluate(lines => window.postMessage({ type: 'revealLines', lines }, '*'), { start, end });
    };
    await jump(line('Line jump heading'), line('Line jump paragraph.'));
    await frame.waitForFunction(({ selector, mode, startLine }) => {
      const surface = document.querySelector(selector);
      const heading = [...(surface?.querySelectorAll('h2') ?? [])].find(element => element.textContent?.includes('Line jump heading'));
      if (!surface || !heading) return false;
      const box = heading.getBoundingClientRect(), viewport = surface.getBoundingClientRect();
      if (box.top < viewport.top - 3 || box.top > viewport.top + 30) return false;
      if (mode === 'sv') {
        const source = document.querySelector<HTMLTextAreaElement>('textarea.vditor-sv')!;
        const style = getComputedStyle(source);
        const position = (startLine - 1) * parseFloat(style.lineHeight) + parseFloat(style.paddingTop) - source.scrollTop;
        return position >= 0 && position <= 30 &&
          source.value.slice(source.selectionStart, source.selectionEnd) === '## Line jump heading\n\nLine jump paragraph.';
      }
      const selection = getSelection();
      return selection?.rangeCount && heading.contains(selection.getRangeAt(0).startContainer) &&
        selection.toString().includes('Line jump paragraph.');
    }, { selector, mode, startLine: line('Line jump heading') });
    await jump(line('Line jump cell'));
    await frame.waitForFunction(({ selector, mode }) => {
      const surface = document.querySelector(selector);
      const cell = [...(surface?.querySelectorAll('td') ?? [])].find(element => element.textContent === 'Line jump cell');
      if (!surface || !cell) return false;
      const box = cell.getBoundingClientRect(), viewport = surface.getBoundingClientRect();
      if (box.top < viewport.top - 6 || box.top > viewport.top + 30) return false;
      const selection = getSelection();
      return mode === 'sv' || (selection?.rangeCount && cell.contains(selection.getRangeAt(0).startContainer));
    }, { selector, mode });
    await jump(line('Final line jump heading'));
    await frame.waitForFunction(selector => {
      const surface = document.querySelector(selector);
      const heading = [...(surface?.querySelectorAll('h2') ?? [])].find(element => element.textContent?.includes('Final line jump heading'));
      if (!surface || !heading) return false;
      const top = heading.getBoundingClientRect().top - surface.getBoundingClientRect().top;
      return top >= -3 && top <= 30;
    }, selector);
  }
  console.log('PASS line and range navigation at the top in all three editing modes, including document end');
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

export async function checkSearchOptions(frame: Page | Frame, replaceDocument: (text: string) => Promise<void>) {
  await replaceDocument('Cat cat catapult _cat cats. 字词，词，词组。 Item-12, Item-34.\n');
  await frame.locator('[data-action=search]').click();
  const input = frame.locator('#search-input');
  const count = (total: number) => frame.waitForFunction(total =>
    document.querySelector('#search-count')?.textContent?.endsWith(' / ' + total), total);
  await input.fill('cat');
  await count(5);
  await frame.locator('#search-word').check();
  await count(2);
  await frame.locator('#search-case').check();
  await count(1);
  await input.fill('词');
  await frame.waitForFunction(() => [...(CSS.highlights.get('vm-find') || [])].some(range => range.toString() === '词'));
  await count(1);
  await frame.locator('#search-case').uncheck();
  await frame.locator('#search-word').uncheck();
  await frame.locator('#search-regex').check();
  await input.fill('[');
  await frame.locator('#search-error').filter({ hasText: '正则表达式无效' }).waitFor();
  await input.fill('item-(\\d+)');
  await count(2);
  assert.equal(await frame.locator('#search-error').isHidden(), true);
  if (await frame.locator('#search-replace-row').isHidden()) await frame.locator('#search-toggle-replace').click();
  await frame.locator('#search-replacement').fill('Number $1');
  await frame.locator('#search-replace-all').click();
  await frame.waitForFunction(() => window.VM_APP.getValue().includes('Number 12, Number 34'));
  await frame.locator('#search-toggle-replace').click();
  await frame.locator('#search-regex').uncheck();
  await frame.locator('#search-close').click();
  console.log('PASS whole words, Unicode boundaries, invalid regex and regex capture replacement');
}

export async function checkSearchNavigation(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>, openSearch: () => Promise<void>) {
  const term = '定位词';
  const paragraph = `${term} ${'spacer words '.repeat(650)}${term}.`;
  const fixture = `# Find navigation\n\n${paragraph}\n\n\`\`\`text\n${term}\n${'code line\n'.repeat(60)}${term}\n\`\`\`\n`;
  const input = frame.locator('#search-input'), count = frame.locator('#search-count');
  for (const mode of ['sv', 'wysiwyg', 'ir']) {
    await frame.locator('[data-action=settings]').click();
    await frame.locator('[data-setting=mode]').selectOption(mode);
    await frame.locator('#settings-done').click();
    await replaceDocument(fixture);
    const surface = frame.locator(mode === 'sv' ? '.vditor-sv' : `.vditor-${mode}>.vditor-reset`);
    await surface.evaluate((element, term) => {
      element.focus({ preventScroll: true });
      if (element instanceof HTMLTextAreaElement) {
        const offset = element.value.indexOf(term, element.value.indexOf(term) + term.length);
        element.setSelectionRange(offset, offset + term.length);
      } else {
        const text = element.querySelector('p')!.firstChild!;
        const offset = text.textContent!.lastIndexOf(term);
        const range = document.createRange(); range.setStart(text, offset); range.setEnd(text, offset + term.length);
        getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
      }
      element.scrollTop = 0;
    }, term);
    await openSearch();
    await input.waitFor();
    assert.equal(await input.inputValue(), term, `${mode}: search uses the selected text`);
    assert.equal(await count.textContent(), '2 / 4', `${mode}: search starts at the selected occurrence`);
    const assertVisible = async (label: string) => {
      assert.equal(await count.textContent(), label);
      const result = await surface.evaluate(element => {
        const active = CSS.highlights.get('vm-find');
        const range = active?.values().next().value as Range | undefined;
        const parent = range?.startContainer.parentElement;
        const bounds = element.getBoundingClientRect(), rect = range?.getClientRects()[0];
        const code = parent?.closest('pre>code');
        const codeBounds = code?.getBoundingClientRect();
        return {
          text: range?.toString(),
          otherMatches: CSS.highlights.get('vm-find-other')?.size,
          visible: !!rect && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1
            && (!codeBounds || (rect.top >= codeBounds.top - 1 && rect.bottom <= codeBounds.bottom + 1)),
          scroll: element.scrollTop + (code?.scrollTop ?? 0),
          focus: document.activeElement?.id,
        };
      });
      assert.equal(result.text, term, `${mode}: highlights the actual text`);
      assert.equal(result.otherMatches, 3, `${mode}: highlights the other results`);
      assert.ok(result.visible, `${mode}: ${label} must be inside the visible editor and code block`);
      assert.equal(result.focus, 'search-input');
      return result.scroll;
    };
    const selected = await assertVisible('2 / 4');
    await input.press('Shift+Enter');
    assert.ok(await assertVisible('1 / 4') < selected - 100, `${mode}: previous scrolls up within the same paragraph`);
    await frame.locator('#search-next').click();
    await assertVisible('2 / 4');
    await input.press('Enter');
    const firstCode = await assertVisible('3 / 4');
    await input.press('Enter');
    assert.ok(await assertVisible('4 / 4') > firstCode + 100, `${mode}: scrolls between results in the same code block`);
    await input.press('Enter');
    await assertVisible('1 / 4');
    await input.press('Escape');
    assert.equal(await frame.locator('.vm-find-source').count(), 0);
    assert.equal(await frame.evaluate(() => CSS.highlights.has('vm-find') || CSS.highlights.has('vm-find-other')), false);
  }
  console.log('PASS selection-seeded search, all-match highlights, wrapped lines and code scrolling in all modes');
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
