import assert from 'node:assert/strict';
import type { Frame, Page } from 'playwright-core';
import { checkNativeColors, checkOutlineHover, checkSelectedButtonColors } from './nativeColorChecks';

export async function checkThemeUI(frame: Frame | Page, replaceDocument: (text: string) => Promise<void>) {
  const page = 'page' in frame ? frame.page() : frame;
  const fixture = '# Theme test\n\nMarked **bold** text for highlighting.\n\n[Visible link](https://example.com) and [reference link][reference].\n\n[reference]: https://example.com/reference\n\n| Check | Result |\n| --- | --- |\n| One | Passed |\n| Two | Passed |\n\n```json\n{"apple":0.6}\n```\n\n## End of theme test\n';
  const light = 'local-tests.vditor-test-themes/Vditor Test Light', dark = 'local-tests.vditor-test-themes/Vditor Test Dark';
  const mode = async (value: string) => {
    await frame.locator('[data-action=settings]').click(); await frame.locator('[data-setting=mode]').selectOption(value); await frame.locator('#settings-done').click();
    await frame.waitForFunction(value => window.VM_APP.editor.vditor.currentMode === value, value);
  };
  const choose = async (target: 'theme' | 'codeTheme', id: string) => {
    await frame.locator(target === 'theme' ? '[data-action=theme]' : '.vm-code-theme').click();
    assert.equal(await frame.locator('[role=dialog]').count(), 0, 'Theme choice does not open a modal');
    await frame.locator(`[data-theme-id="${id}"]`).click();
    await frame.waitForFunction(({target,id})=>window.VM_APP.settings()[target]===id,{target,id});
  };
  await mode('ir'); await replaceDocument(fixture);
  await frame.waitForFunction(()=>!!window.document.querySelector('.vm-code-toolbar'));
  const original = await frame.evaluate(()=>window.VM_APP.getValue());
  await frame.locator('[data-action=theme]').click();
  const pageIds = await frame.locator('[data-theme-id]').evaluateAll(items=>items.map(e=>(e as HTMLElement).dataset.themeId));
  assert.ok(pageIds.includes(light) && pageIds.includes(dark));
  assert.equal(await frame.locator('.theme-group').filter({hasText:'亮色主题'}).count(),1);
  await frame.locator('body').screenshot({path:'.test-results/theme-menu-0.1.2.png'});
  await frame.locator(`[data-theme-id="${light}"]`).click();
  await frame.waitForFunction(()=>getComputedStyle(window.document.body).backgroundColor==='rgb(252, 248, 238)');
  await checkOutlineHover(frame, 'rgb(232, 232, 232)');
  await frame.locator('[data-action=settings]').click();
  const settingsColor = await frame.locator('#configure-shortcuts').evaluate(button => [
    getComputedStyle(button).color, getComputedStyle(button.closest('.settings-group')!).color,
  ]);
  assert.equal(settingsColor[0], settingsColor[1]);
  await frame.locator('#settings-done').click();
  const table = frame.locator('.vditor-ir table');
  assert.equal(await table.locator('td').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(252, 248, 238)');
  assert.equal(await table.locator('tbody tr').last().evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)');
  assert.notEqual(await table.locator('th').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(252, 248, 238)');
  await frame.locator('.vm-code-theme').click();
  assert.deepEqual(await frame.locator('[data-theme-id]').evaluateAll(items=>items.map(e=>(e as HTMLElement).dataset.themeId)),pageIds,'Page and code use the same installed catalog');
  await frame.locator(`[data-theme-id="${dark}"]`).click();
  await frame.waitForFunction(()=>getComputedStyle(window.document.querySelector('.vm-code-block')!).backgroundColor==='rgb(32, 43, 56)');
  assert.equal(await frame.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(252, 248, 238)','Code and page colors are independent');
  await choose('theme',dark);
  assert.equal(await frame.locator('.vditor-ir table td').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(23, 32, 42)');
  await checkOutlineHover(frame, 'rgb(42, 45, 46)', 'rgb(240, 246, 252)');
  assert.equal(await frame.evaluate(()=>window.VM_APP.getValue()),original,'Theme and table appearance do not rewrite Markdown');
  await choose('theme',light);
  await frame.locator('[data-action=theme]').click(); await page.keyboard.press('Home'); await page.keyboard.press('Enter');
  await frame.waitForFunction(()=>window.VM_APP.settings().theme==='auto');
  await choose('theme',light);
  for (const value of ['ir','wysiwyg','sv']) {
    await mode(value); await replaceDocument(fixture);
    await frame.locator(value==='sv'?'.vditor-sv':`.vditor-${value}>.vditor-reset>p`).first().click({position:{x:20,y:8}});
    await frame.evaluate(value=>{
      const surface=window.VM_APP.editor.vditor[value].element; surface.focus();
      if(surface instanceof HTMLTextAreaElement){const start=surface.value.indexOf('Marked');surface.setSelectionRange(start,start+'Marked **bold** text for highlighting.'.length);}
      else {const range=window.document.createRange();range.selectNodeContents(surface.querySelector('p'));getSelection()!.removeAllRanges();getSelection()!.addRange(range);}
    },value);
    try { await frame.locator('#selection-colors').waitFor({state:'visible'}); }
    catch(error) {
      console.log('SELECTION_DIAGNOSTIC',JSON.stringify(await frame.evaluate(()=>{
        const surface=window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element;
        const selection=getSelection();return {mode:window.VM_APP.editor.vditor.currentMode,focus:window.document.activeElement?.className,active:window.document.hasFocus(),selection:selection?.toString(),collapsed:selection?.isCollapsed,rects:selection?.rangeCount?[...selection.getRangeAt(0).getClientRects()].map(r=>({x:r.x,y:r.y,w:r.width,h:r.height})):[],scroll:surface.scrollTop,dialog:window.document.querySelectorAll('.dialog,#theme-menu').length,source:surface.value?.slice(surface.selectionStart,surface.selectionEnd)};
      }))); throw error;
    }
    assert.equal(await frame.locator('[data-highlight-color]').count(),8);
    if (value==='ir') await frame.locator('body').screenshot({path:'.test-results/selection-highlight-0.1.2.png'});
    await frame.locator('[data-highlight-color="#fff176"]').click();
    await frame.waitForFunction(()=>window.VM_APP.getValue().includes('background-color: #fff176'));
    const markdown=await frame.evaluate(()=>window.VM_APP.getValue());
    assert.ok(markdown.includes('**bold**'),'Highlight preserves bold');
    assert.ok(!markdown.includes('selection-colors')&&!markdown.includes('data-highlight-color'),'Palette does not serialize into Markdown');
    await frame.evaluate(()=>{getSelection()?.removeAllRanges();const surface=window.VM_APP.editor.vditor[window.VM_APP.editor.vditor.currentMode].element;if(surface instanceof HTMLTextAreaElement)surface.setSelectionRange(0,0);});
    await frame.locator('#selection-colors').waitFor({state:'hidden'});
  }
  await mode('ir'); await replaceDocument(fixture);
  await frame.evaluate(()=>{const code=window.document.querySelector('.vditor-ir__preview code')!;const range=window.document.createRange();range.selectNodeContents(code);getSelection()!.removeAllRanges();getSelection()!.addRange(range);});
  await page.waitForTimeout(180);
  assert.equal(await frame.locator('#selection-colors').isVisible(),false,'Code selection does not trigger text formatting');
  const drag = await frame.evaluate(()=>{
    const p=window.document.querySelector('.vditor-ir>.vditor-reset>p')!,range=window.document.createRange();range.selectNodeContents(p);
    const rects=[...range.getClientRects()].filter(r=>r.width>0&&r.height>0),first=rects[0],last=rects[rects.length-1];
    const box=p.getBoundingClientRect();
    return {start:{x:first.left+1,y:first.top+first.height/2},end:{x:last.right-1,y:last.top+last.height/2},box:{x:box.x,y:box.y,width:box.width,height:box.height}};
  });
  const actual=await frame.locator('.vditor-ir>.vditor-reset>p').first().boundingBox();
  const sx=actual!.width/drag.box.width,sy=actual!.height/drag.box.height;
  drag.start.x=actual!.x+(drag.start.x-drag.box.x)*sx;drag.end.x=actual!.x+(drag.end.x-drag.box.x)*sx;
  drag.start.y=actual!.y+(drag.start.y-drag.box.y)*sy;drag.end.y=actual!.y+(drag.end.y-drag.box.y)*sy;
  await page.mouse.move(drag.start.x,drag.start.y);await page.mouse.down();await page.mouse.move(drag.end.x,drag.end.y,{steps:8});await page.mouse.up();
  await frame.locator('#selection-colors').waitFor({state:'visible'});
  assert.ok((await frame.evaluate(()=>getSelection()!.toString())).includes('bold'),'Real mouse selection triggers the highlight palette');
  await frame.locator('[data-action=theme]').click(); await page.keyboard.press('Escape');
  assert.equal(await frame.locator('#theme-menu').count(),0);
  const bold = frame.locator('[data-action=bold]');
  const themes = [light,dark,...await frame.evaluate(()=>window.VM_BOOT.themes.filter((theme:any)=>theme.kind.startsWith('hc-')).map((theme:any)=>theme.id))];
  for (const value of ['ir','wysiwyg']) {
    await mode(value); await replaceDocument(fixture);
    for (const id of themes) {
      await choose('theme',id);
      await checkNativeColors(frame);
      await frame.locator(`.vditor-${value} strong`).click();
      await frame.waitForFunction(()=>window.document.querySelector('[data-action=bold]')!.getAttribute('aria-pressed')==='true');
      await checkSelectedButtonColors(bold);
      await bold.hover();
      await checkSelectedButtonColors(bold);
      await page.mouse.down();
      try { await checkSelectedButtonColors(bold); }
      finally { await frame.locator('[data-action=source]').hover(); await page.mouse.up(); }
      assert.equal(await frame.locator(`.vditor-${value} h1`).evaluate(e=>getComputedStyle(e).borderBottomWidth),'0px','Heading underline is removed');
      await frame.locator('[data-action=settings]').click(); await frame.waitForFunction(()=>window.document.querySelector('[data-action=settings]')!.getAttribute('aria-expanded')==='true'); await checkSelectedButtonColors(frame.locator('[data-action=settings]')); await page.keyboard.press('Escape');
      await frame.locator('[data-action=textColor]').click(); await frame.waitForFunction(()=>window.document.querySelector('[data-action=textColor]')!.getAttribute('aria-expanded')==='true'); await checkSelectedButtonColors(frame.locator('[data-action=textColor]')); await page.keyboard.press('Escape');
      await frame.locator(`.vditor-${value}>.vditor-reset>p`).first().click({position:{x:4,y:8}});
      await frame.waitForFunction(()=>window.document.querySelector('[data-action=bold]')!.getAttribute('aria-pressed')==='false');
    }
  }
  await mode('sv'); await replaceDocument(fixture); await checkNativeColors(frame);
  await mode('ir');
  await choose('theme','auto'); await choose('codeTheme','auto');
  console.log('PASS native VS Code link/hover/active/toggle colors in all modes, current bold state, open menu state, and headings without underlines');
  console.log('PASS installed-theme dropdowns, independent page/code palettes, themed tables, automatic selection highlights in all modes');
}
