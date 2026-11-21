import * as vscode from 'vscode';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { chromium, type Frame } from 'playwright-core';
import { checkDocumentLinks, checkEditorUI, checkInlineSource } from './editorChecks';
import { checkThemeUI } from './themeChecks';
import { checkNativeColors, checkOutlineHover } from './nativeColorChecks';
import { checkLayoutUI } from './layoutChecks';
import { checkColorUI } from './colorChecks';
import { checkContentTools } from './contentChecks';
import { actions, EXTENSION_ID } from '../src/shared';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
async function until(check: () => boolean | Promise<boolean>, label: string, timeout = 15000) {
  const start = Date.now(); while (Date.now() - start < timeout) { if (await check()) return; await wait(100); }
  throw new Error(`Timed out: ${label}`);
}
export async function run() {
  const extension = vscode.extensions.getExtension(EXTENSION_ID)!;
  assert.ok(extension, 'Extension is discoverable'); await extension.activate();
  await vscode.workspace.getConfiguration('vditorMarkdown').update('mode','ir',vscode.ConfigurationTarget.Global);
  await vscode.workspace.getConfiguration('vditorMarkdown').update('outlineWidth',216,vscode.ConfigurationTarget.Global);
  const originalClipboard = await vscode.env.clipboard.readText();
  const root = extension.extensionPath, folder = path.join(root, '.test-results', 'host'); await mkdir(folder, { recursive: true });
  await copyFile(path.resolve(__dirname,'../test/fixtures/sample.svg'),path.join(folder,'sample.svg'));
  const original = '# Host Test\n\nOriginal 中文正文。\n';
  const filename = path.join(folder, 'integration.md'); await writeFile(filename, original);
  const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filename));
  await vscode.commands.executeCommand('vscode.openWith', document.uri, 'vditorMarkdown.editor');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9337');
  const browserErrors:string[]=[];
  for(const p of browser.contexts().flatMap(c=>c.pages())) {p.on('pageerror',e=>browserErrors.push(e.message));p.on('console',m=>{if(m.type()==='error')browserErrors.push(m.text());});}
  try {
    let frame: Frame | undefined;
    await until(async () => {
      for (const page of browser.contexts().flatMap(context => context.pages())) for (const candidate of page.frames()) {
        try { if (await candidate.locator('#toolbar [data-action]').count() === actions.length) { frame = candidate; return true; } } catch { /* Webview navigation can detach a frame. */ }
      }
      return false;
    }, 'VS Code webview toolbar');
    await frame!.waitForFunction(() => window.VM_APP?.ready && window.VM_APP.getValue().includes('Original'));
    await vscode.commands.executeCommand('notifications.clearAll'); await vscode.commands.executeCommand('notifications.hideToasts');
    assert.equal(document.isDirty, false, 'Opening a file must not change it');
    const page = frame!.page();
    await frame!.locator('.vditor-ir [contenteditable=true]').click();
    await page.keyboard.press('Control+End'); await page.keyboard.press('Enter'); await page.keyboard.type('Native keyboard input.');
    await until(() => document.getText().includes('Native keyboard input.'), 'Webview edits reach TextDocument');
    assert.equal(document.isDirty, true);
    await page.keyboard.press('Control+s');
    await until(() => !document.isDirty, 'Ctrl+S saves the custom editor');
    assert.match(await readFile(filename, 'utf8'), /Native keyboard input/);
    await page.screenshot({ path: path.join(root, '.test-results', 'vscode-editor.png') });
    const savedText = document.getText();
    await vscode.commands.executeCommand('notifications.clearAll'); await vscode.commands.executeCommand('notifications.hideToasts');
    await frame!.locator('.vditor-ir>.vditor-reset>p').first().click();
    await page.keyboard.press('Control+z');
    await until(() => document.getText() !== savedText, 'Ctrl+Z undoes webview input');
    await page.keyboard.press('Control+y');
    await until(() => document.getText() === savedText, 'Ctrl+Y redoes webview input');
    const undoEvent = await frame!.evaluate(() => {
      const event = new InputEvent('beforeinput', { inputType: 'historyUndo', bubbles: true, cancelable: true });
      window.VM_APP.editor.vditor.ir.element.dispatchEvent(event);
      return { prevented: event.defaultPrevented, api: typeof window.acquireVsCodeApi };
    });
    assert.equal(undoEvent.prevented, true, JSON.stringify(undoEvent));
    await until(() => document.getText() !== savedText, 'Native menu undo reaches TextDocument');
    await frame!.evaluate(() => window.VM_APP.editor.vditor.ir.element.dispatchEvent(new InputEvent('beforeinput', { inputType: 'historyRedo', bubbles: true, cancelable: true })));
    await until(() => document.getText() === savedText, 'Native menu redo reaches TextDocument');
    const edit = new vscode.WorkspaceEdit(); edit.replace(document.uri, new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length)), '# External update\n\nSynchronized 中文正文。\n');
    await vscode.workspace.applyEdit(edit);
    await frame!.waitForFunction(() => window.VM_APP.getValue().includes('Synchronized'));
    await vscode.commands.executeCommand('vditorMarkdown.save');
    await until(() => !document.isDirty, 'Save toolbar command');
    const replaceDocument = async (text: string) => {
      await frame!.waitForFunction(() => window.document.querySelector('[data-action=save]')!.getAttribute('aria-busy') !== 'true');
      const change = new vscode.WorkspaceEdit();
      change.replace(document.uri,new vscode.Range(document.positionAt(0),document.positionAt(document.getText().length)),text);
      assert.equal(await vscode.workspace.applyEdit(change),true,'Replace test document');
      await frame!.waitForFunction(version => window.VM_APP.documentVersion() >= version,document.version);
      await frame!.waitForFunction(text => window.VM_APP.getValue().includes(text.trim().split('\n')[0]) && window.VM_APP.getValue().includes(text.trim().split('\n').at(-1)!), text);
    };
    await checkDocumentLinks(frame!, replaceDocument, () => page.keyboard.press('Escape'));
    await replaceDocument('# Link origin\n\n[Jump](#destination)\n\n' + 'Spacer.\n\n'.repeat(65) + '## Destination\n\nTarget text.\n');
    const linkSurface = frame!.locator('.vditor-ir>.vditor-reset');
    const jump = linkSurface.locator('.vditor-ir__link');
    await jump.scrollIntoViewIfNeeded();
    const origin = await linkSurface.evaluate(element => element.scrollTop);
    await jump.click();
    const destination = await linkSurface.evaluate(element => element.scrollTop);
    assert.ok(destination > origin + 100, 'The link scrolls to the destination');
    for (const [action, panel] of [['search', '#search-bar'], ['settings', '#settings-menu']]) {
      await frame!.locator(`[data-action=${action}]`).click();
      await frame!.locator(panel).waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await frame!.locator(panel).waitFor({ state: 'hidden' });
      assert.equal(await linkSurface.evaluate(element => element.scrollTop), destination, `Escape closes ${action} before navigating back`);
    }
    await page.keyboard.press('Escape');
    await frame!.waitForFunction(origin => Math.abs(window.document.querySelector('.vditor-ir>.vditor-reset')!.scrollTop - origin) <= 1, origin);
    console.log('PASS Escape closes the editor panels before returning from a link');
    const localTarget = path.join(folder, 'Link target.txt');
    await writeFile(localTarget, 'Local link target\n');
    await replaceDocument('[Local target](./Link%20target.txt)\n');
    await frame!.locator('.vditor-ir .vditor-ir__link').click();
    const localUri = vscode.Uri.file(localTarget).toString();
    await until(() => vscode.window.activeTextEditor?.document.uri.toString() === localUri, 'Relative link opens a sibling file in VS Code').catch(async error => {
      console.log('Local link diagnostics', { expected: localUri, active: vscode.window.activeTextEditor?.document.uri.toString(), tabs: vscode.window.tabGroups.activeTabGroup.tabs.map(tab => tab.label), status: await frame!.locator('#status').textContent() });
      throw error;
    });
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
    console.log('PASS relative links with encoded spaces open their files in VS Code');
    await checkInlineSource(frame!, replaceDocument);
    const historyText = Array.from({ length: 75 }, (_, index) => `## Line ${index + 1}\n\nHistory paragraph ${index + 1}.\n`).join('\n');
    await replaceDocument(historyText);
    const location = historyText.indexOf('History paragraph 50.');
    const change = new vscode.WorkspaceEdit();
    change.replace(document.uri, new vscode.Range(document.positionAt(location), document.positionAt(location + 'History'.length)), 'Updated');
    assert.equal(await vscode.workspace.applyEdit(change), true);
    await frame!.waitForFunction(() => window.VM_APP.getValue().includes('Updated paragraph 50.'));
    const historySurface = frame!.locator('.vditor-ir>.vditor-reset');
    for (const [command, line] of [['undo', 'History paragraph 50.'], ['redo', 'Updated paragraph 50.']]) {
      await historySurface.evaluate(element => { element.scrollTop = 0; });
      await vscode.commands.executeCommand(`vditorMarkdown.${command}`);
      await frame!.waitForFunction(line => {
        const surface = window.document.querySelector('.vditor-ir>.vditor-reset')!;
        const paragraph = [...surface.querySelectorAll('p')].find(element => element.textContent === line);
        const rect = paragraph?.getBoundingClientRect(), viewport = surface.getBoundingClientRect();
        return rect && rect.top >= viewport.top && rect.bottom <= viewport.bottom;
      }, line);
      assert.equal(await frame!.locator('#status').textContent(), command === 'undo' ? '已撤销' : '已重做');
    }
    console.log('PASS VS Code undo and redo reveal the changed paragraph from outside the viewport');
    const beforeReplace = '# Find in VS Code\n\n**Target** target.\n';
    await replaceDocument(beforeReplace);
    await frame!.locator('.vditor-ir strong').click();
    await page.keyboard.press('Control+f');
    const find = frame!.locator('#search-input');
    await find.fill('target');
    assert.equal(await frame!.locator('#search-count').textContent(), '1 / 2');
    await frame!.locator('#search-toggle-replace').click();
    await frame!.locator('#search-replacement').fill('updated');
    await frame!.locator('#search-replace-all').click();
    await until(() => document.getText().includes('**updated** updated.'), 'Replace all reaches TextDocument');
    await find.press('Escape');
    await page.keyboard.press('Control+z');
    await until(() => document.getText() === beforeReplace, 'One undo reverts all replacements');
    console.log('PASS Ctrl+F, replace all, and one-step undo in the VS Code webview');
    const installedThemes = await frame!.evaluate(()=>window.VM_BOOT.themes);
    const legacy = installedThemes.find((theme:any)=>theme.label==='Fixture Legacy');
    assert.equal(legacy?.colors.bg,'#272822','Legacy TextMate themes are loaded');
    assert.equal(legacy?.tokens.keyword,'#f92672');
    assert.ok(installedThemes.length>3,'Built-in and contributed themes appear together');
    await vscode.commands.executeCommand('notifications.clearAll'); await vscode.commands.executeCommand('notifications.hideToasts');
    await checkThemeUI(frame!,replaceDocument);
    const workbench=vscode.workspace.getConfiguration('workbench'), previousTheme=workbench.inspect<string>('colorTheme')?.globalValue;
    try {
      for (const [theme,bg,keyword,codeBg,hoverBg,hoverFg] of [
        ['Vditor Test Dark','rgb(23, 32, 42)','#ff7bc6','rgb(32, 43, 56)','rgb(42, 45, 46)','rgb(240, 246, 252)'],
        ['Vditor Test Light','rgb(252, 248, 238)','#9c27b0','rgb(240, 236, 221)','rgb(232, 232, 232)'],
      ]) {
        await workbench.update('colorTheme',theme,vscode.ConfigurationTarget.Global);
        await frame!.waitForFunction(({bg,keyword,codeBg})=>getComputedStyle(window.document.body).backgroundColor===bg&&window.document.documentElement.style.getPropertyValue('--host-code-keyword')===keyword&&getComputedStyle(window.document.querySelector('.vm-code-block')!).backgroundColor===codeBg,{bg,keyword,codeBg});
        await checkNativeColors(frame!);
        await checkOutlineHover(frame!, hoverBg, hoverFg);
      }
    } finally { await workbench.update('colorTheme',previousTheme,vscode.ConfigurationTarget.Global); }
    console.log('PASS Auto follows live VS Code theme changes');
    await checkEditorUI(frame!, replaceDocument, async () => vscode.env.clipboard.readText());
    assert.ok(Object.keys(await frame!.evaluate(()=>window.VM_BOOT.codePalette)).length > 0, 'Code colors resolve from the active VS Code theme');
    const codeBefore=document.getText();
    await frame!.locator('.vm-code-language').selectOption('python');
    await until(()=>document.getText().includes('```python'),'Language change reaches TextDocument');
    await vscode.commands.executeCommand('vditorMarkdown.undo');
    await until(()=>document.getText()===codeBefore,'Undo code language change');
    await frame!.waitForFunction(()=>window.VM_APP.getValue().includes('```json'));
    await frame!.locator('[data-code-action=trash]').click();
    await until(()=>!document.getText().includes('```'),'Delete code block reaches TextDocument');
    await vscode.commands.executeCommand('vditorMarkdown.undo');
    await until(()=>document.getText()===codeBefore,'Undo code block deletion');
    await vscode.commands.executeCommand('vditorMarkdown.save');
    await until(()=>!document.isDirty,'Save after code block controls');
    await frame!.page().screenshot({path:path.join(root,'.test-results','vscode-code-block-0.1.2.png')});
    await checkColorUI(frame!,replaceDocument,async(key,colors)=>{ await until(()=>JSON.stringify(vscode.workspace.getConfiguration('vditorMarkdown').get(key))===JSON.stringify(colors),'Palette persists in VS Code settings'); });
    await vscode.commands.executeCommand('vditorMarkdown.save'); await until(()=>!document.isDirty,'Save before annotation eraser');
    await replaceDocument('# Eraser undo\n\n<span style="color:#123456;background-color:#fff176">**marked** text</span>\n\nEnd of eraser.\n');
    await vscode.commands.executeCommand('vditorMarkdown.save'); await until(()=>!document.isDirty,'Save colored text');
    const annotationBefore=document.getText();
    await frame!.locator('.vditor-ir [data-vm-color] strong').click(); await frame!.locator('#annotation-clear').click(); await until(()=>!document.getText().includes('color:'),'Eraser reaches TextDocument');
    await vscode.commands.executeCommand('vditorMarkdown.undo'); await until(()=>document.getText()===annotationBefore,'Undo eraser');
    await vscode.commands.executeCommand('vditorMarkdown.redo'); await until(()=>!document.getText().includes('color:'),'Redo eraser');
    await checkContentTools(frame!, replaceDocument, folder, async () => await vscode.env.clipboard.readText(), async text => {
      await until(() => document.getText() === text, 'Image dimensions and table edits reach TextDocument');
      await vscode.commands.executeCommand('vditorMarkdown.save');
      await until(() => !document.isDirty, 'Save image dimensions and table layout');
      assert.equal(await readFile(filename, 'utf8'), text);
    });
    await checkLayoutUI(frame!,replaceDocument,{read:async()=>await vscode.env.clipboard.readText()});
    await vscode.commands.executeCommand('vditorMarkdown.save'); await until(()=>!document.isDirty,'Save before paragraph controls');
    const blocksBefore=document.getText();
    await frame!.locator('.vm-block-handle:not([hidden])').nth(1).click(); await frame!.locator('[data-block-action=delete]').click();
    await until(()=>!document.getText().includes('First paragraph'),'Paragraph deletion reaches TextDocument');
    await vscode.commands.executeCommand('vditorMarkdown.undo'); await until(()=>document.getText()===blocksBefore,'Undo paragraph deletion');
    await frame!.waitForFunction(()=>window.VM_APP.getValue().includes('First paragraph'));
    await vscode.commands.executeCommand('vditorMarkdown.redo'); await until(()=>!document.getText().includes('First paragraph'),'Redo paragraph deletion');
    await vscode.commands.executeCommand('vditorMarkdown.undo'); await until(()=>document.getText()===blocksBefore,'Restore paragraph');
    await vscode.commands.executeCommand('vditorMarkdown.save'); await until(()=>!document.isDirty,'Save paragraph edits');
    const mindmapButton = frame!.locator('#toolbar [data-action=outline] + [data-action=mindmap]');
    await mindmapButton.click();
    const map = frame!.locator('#mindmap-preview svg');
    await map.getByText('Block controls', { exact: true }).waitFor({ state: 'attached' });
    const detail = 'First paragraph bold.';
    assert.equal(await map.getByText(detail, { exact: true }).count(), 0);
    await frame!.locator('[data-map-mode=detailed]').click();
    await map.getByText(detail, { exact: true }).waitFor({ state: 'attached' });
    const simpleDialog = vscode.workspace.getConfiguration('files.simpleDialog');
    const previousDialogSetting = simpleDialog.inspect<boolean>('enable')?.globalValue;
    await simpleDialog.update('enable', true, vscode.ConfigurationTarget.Global);
    try {
      const picker = page.locator('.quick-input-widget input[type=text]:visible');
      for (const format of ['md', 'svg']) {
        const exported = path.join(folder, `mindmap-${Date.now()}.${format}`);
        await frame!.locator(`[data-mindmap-export=${format}]`).click();
        await picker.waitFor({ state: 'visible' });
        await picker.fill(exported);
        await picker.press('Enter');
        await until(async () => {
          try {
            const contents = await readFile(exported, 'utf8');
            return contents.includes(format === 'md' ? 'First paragraph bold\\.' : detail);
          } catch { return false; }
        }, `The VS Code save dialog writes the ${format} mind map`);
      }
    } finally {
      await simpleDialog.update('enable', previousDialogSetting, vscode.ConfigurationTarget.Global);
    }
    assert.equal(document.getText(), blocksBefore, 'Mind map preview and exports leave the document text intact');
    await frame!.locator('#insert-mindmap').click();
    const embeddedMap = frame!.locator('.vditor-ir .language-markmap svg');
    await embeddedMap.waitFor({ state: 'visible' });
    await embeddedMap.evaluate(svg => svg.scrollIntoView({ block: 'center' }));
    const resizeHandle = frame!.locator('.vm-markmap-resize');
    await resizeHandle.waitFor({ state: 'visible' });
    await resizeHandle.press('ArrowDown');
    await until(() => document.getText().includes('moye-markmap-height: 384'), 'Markmap height reaches the document');
    await vscode.commands.executeCommand('vditorMarkdown.save');
    await until(() => !document.isDirty, 'Save Markmap height');
    assert.match(await readFile(filename, 'utf8'), /moye-markmap-height: 384/);
    console.log('PASS both mind map formats through VS Code save dialogs and Markmap height saved to disk');
    await vscode.commands.executeCommand('vditorMarkdown.source');
    await until(() => vscode.window.activeTextEditor?.document.uri.toString() === document.uri.toString(), 'Source command opens the same document');
    assert.match(vscode.window.activeTextEditor!.document.getText(), /Block controls/);
    const fixtureFolder=path.resolve(__dirname,'../test/fixtures');
    const rich=await readFile(path.join(fixtureFolder,'sample.md'),'utf8')+'\n'+await readFile(path.join(fixtureFolder,'diagrams.md'),'utf8');
    const richPath=path.join(folder,'rich.md');await writeFile(richPath,rich);await copyFile(path.join(fixtureFolder,'sample.svg'),path.join(folder,'sample.svg'));
    const richDocument=await vscode.workspace.openTextDocument(vscode.Uri.file(richPath));
    await vscode.commands.executeCommand('vscode.openWith',richDocument.uri,'vditorMarkdown.editor');
    await until(async()=>{for(const p of browser.contexts().flatMap(c=>c.pages()))for(const f of p.frames()){try{if(await f.evaluate(()=>window.VM_BOOT?.filename==='rich.md'&&window.VM_APP?.ready)){frame=f;return true;}}catch{}}return false;},'Rich Markdown webview');
    try {
      await frame!.waitForFunction(()=>window.document.querySelector('.vditor-ir .katex')&&window.document.querySelector('.vditor-ir .language-mermaid svg')&&window.document.querySelector('.vditor-ir .language-graphviz svg')&&window.document.querySelector('.vditor-ir .language-echarts canvas'),null,{timeout:20000});
    } catch(error) {
      const details=await frame!.evaluate(()=>({mode:window.VM_APP.editor.vditor.currentMode,math:window.document.querySelectorAll('.katex').length,mermaid:window.document.querySelectorAll('.language-mermaid svg').length,graphviz:window.document.querySelectorAll('.language-graphviz svg').length,echarts:window.document.querySelectorAll('.language-echarts canvas').length,renderErrors:[...window.document.querySelectorAll('.vditor-reset--error')].map(e=>e.textContent),status:window.document.querySelector('#status')?.textContent}));
      await writeFile(path.resolve(__dirname,'../.test-results/installed-rich-diagnostics.json'),JSON.stringify({details,browserErrors},null,2));
      await frame!.page().screenshot({path:path.resolve(__dirname,'../.test-results/installed-rich-failure.png')});
      throw error;
    }
    assert.equal(richDocument.isDirty,false,'Rendering rich content must not dirty the file');
    const keybindings=path.resolve(__dirname,'../.vscode-test/profile/User/keybindings.json');
    await writeFile(keybindings,JSON.stringify([{key:'ctrl+alt+b',command:'vditorMarkdown.bold',when:'activeCustomEditorId == vditorMarkdown.editor'}]));
    await wait(1000);
    await frame!.evaluate(()=>{const surface=window.VM_APP.editor.vditor.ir.element;surface.focus();const range=window.document.createRange();range.setStart(surface.querySelector('p').firstChild,0);range.setEnd(surface.querySelector('p').firstChild,4);const s=getSelection()!;s.removeAllRanges();s.addRange(range);});
    await frame!.page().keyboard.press('Control+Alt+b');
    await until(()=>richDocument.getText().includes('**这是中文**'),'Custom user keybinding executes bold');
    await writeFile(keybindings,'[]');
    await vscode.commands.executeCommand('vditorMarkdown.save');
    await until(()=>!richDocument.isDirty,'Save after custom keybinding');
    await frame!.page().screenshot({path:path.join(root,'.test-results','vscode-rich.png')});
    await writeFile(path.join(root, '.test-results', 'integration-summary.json'), JSON.stringify({ passed: true, vscode: vscode.version, tests: ['real webview input', 'Ctrl+S', 'Ctrl+Z', 'Ctrl+Y', 'custom user keybinding', 'external document sync', 'save command', 'source command', 'no dirty-on-open', 'scrolling in IR/WYSIWYG/SV', 'fixed 16px toolbar', 'independent outline scrolling', 'hidden heading labels', 'code button order, word wrap, copy and delete', 'paste into code selection', 'code theme from VS Code', 'installed JSON/TextMate theme catalog', 'page/code theme dropdowns', 'Auto follows live VS Code themes', 'themed tables', 'automatic selection highlights', 'real mouse selection', 'undo code language and deletion', 'centered toolbar and settings dropdown', 'full-height outline resizing', 'fixed paper/custom widths and horizontal scrolling', 'six-dot paragraph/image menus', 'block conversion and editable columns/folds', 'block copy/cut/delete/add and list indentation', 'native undo/redo of paragraph deletion', 'hidden bottom document status', 'independent 1-8 color palettes and real drag sorting', 'palette persistence and defaults', 'dual selection color rows in all modes', 'annotation font size and scoped eraser', 'native undo/redo of eraser', 'centered fixed pages and responsive wide tables', 'one gutter for nested-list handles', 'rich-content CSP: KaTeX/Mermaid/Graphviz/ECharts'] }, null, 2));
    console.log('PASS real VS Code webview, save, undo/redo, source and external synchronization');
  } finally {
    await vscode.env.clipboard.writeText(originalClipboard);
    await browser.close();
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  }
}
