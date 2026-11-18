import Vditor from '@local/vditor';
import { setEditMode } from '@local/mode';
import { processCodeRender } from '@local/code';
import { actions, defaults, defaultColors, escapeHTML as esc, exportDefaults, pageWidths, pageWidthPixels, validPageWidth, validPalette, type ColorProperty, type Action, type ExportOptions, type Settings, type ThemeCatalog } from '../shared';
import { editTextStyles, installColorAdapter } from './colors';
import { icon } from './icons';
import { installCodeBlocks } from './codeBlocks';
import { installThemeMenu, isDarkTheme, themeSelectOptions } from './themes';
import { installSelectionColors } from './selectionColors';
import { installOutlineResize } from './outlineResize';
import { installBlockMenus } from './blocks';
import { installStructures } from './structures';
import { installColorMenus } from './colorMenus';
import { installToolbarState } from './toolbarState';
import './style.css';
import './tables.css';

const boot = window.VM_BOOT;
const bridge = window.acquireVsCodeApi?.() || { postMessage: (message: any) => console.log('bridge', message), getState: () => ({}), setState: () => {} };
let settings: Settings = { ...defaults, ...boot.settings }, dark = !!boot.dark;
let editor: any, initialized = false, baseline = '', lastSent = '', version = 0, seq = 0, eol = '\n', suppress = false;
let codeBlocks: ReturnType<typeof installCodeBlocks> | undefined;
let catalog: ThemeCatalog = { themes: boot.themes || [], activeTheme: boot.activeTheme || '' };
let selectionColors: ReturnType<typeof installSelectionColors> | undefined;
let outlineResize: ReturnType<typeof installOutlineResize> | undefined;
let blockMenus: ReturnType<typeof installBlockMenus> | undefined;
let structures: ReturnType<typeof installStructures> | undefined;
let colorMenus: ReturnType<typeof installColorMenus> | undefined;
let toolbarState: ReturnType<typeof installToolbarState> | undefined;
let toastTimer = 0;
let savedRange: Range | undefined, savedTextarea: [number, number] | undefined, previousFocus: HTMLElement | null = null;
let exportOptions: ExportOptions = { ...exportDefaults }, searchIndex = -1;
const pending = new Set<number>();
const requests = new Map<string, { resolve: (value: any) => void; reject: (error: Error) => void }>();
const pendingSettings = new Map<keyof Settings, { value: any }>();
const overlay = document.getElementById('overlay')!;
const status = document.getElementById('status')!;
status.hidden = true;
const base = document.createElement('base'); base.href = boot.base; document.head.append(base);
const toolbar = document.createElement('div'); toolbar.id = 'toolbar'; toolbar.setAttribute('role', 'toolbar'); toolbar.setAttribute('aria-label', 'Markdown 编辑工具栏');
const separators = new Set([0, 2, 7, 10, 12, 16, 18, 20]);
toolbar.innerHTML = `<div id="toolbar-controls">${actions.map(([id, label], i) => `<button type="button" data-action="${id}" title="${label}" aria-label="${label}">${icon(id)}</button>${separators.has(i) ? '<span class="separator" role="separator"></span>' : ''}`).join('')}</div>`;
document.getElementById('app')!.prepend(toolbar);
const nativeTools = ['headings', 'bold', 'italic', 'strike', 'link', 'list', 'ordered-list', 'check', 'table', 'quote', 'code', 'undo', 'redo', 'emoji', 'line', 'inline-code', 'outdent', 'indent', 'preview', 'code-theme', 'content-theme'];
toolbar.querySelector('[data-action=theme]')!.setAttribute('aria-haspopup', 'menu');
const themeMenu = installThemeMenu({ catalog: () => catalog, current: target => catalog.themes.some(theme => theme.id === settings[target]) ? settings[target] : 'auto', choose: (target, id) => { void changeSetting(target, id); }, beforeOpen: () => { if (overlay.querySelector('#settings-menu')) closeDialog(false); colorMenus?.close(); blockMenus?.close(); rememberSelection(); selectionColors?.hide(); } });

function post(type: string, data: object = {}) { bridge.postMessage({ type, ...data }); }
function rpc(type: string, data: object = {}): Promise<any> {
  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return new Promise((resolve, reject) => { requests.set(requestId, { resolve, reject }); post(type, { requestId, ...data }); });
}
function toast(text: string, error = false) {
  clearTimeout(toastTimer); status.textContent = text; status.hidden = false; status.classList.toggle('error', error);
  toastTimer = window.setTimeout(() => { status.hidden = true; }, error ? 6000 : 2500);
}
function getValue(): string { return editor.getValue().replace(/\r?\n/g, eol); }
function submit() {
  if (!initialized || suppress) return;
  const text = getValue();
  if (text === baseline) return;
  baseline = text;
  if (text === lastSent) return;
  const baseText = lastSent; lastSent = text; seq++; pending.add(seq);
  post('edit', { text, baseText, seq, version });
  updateStatus(); updateOutline();
}
function applyDocument(text: string, nextVersion: number) {
  selectionColors?.hide(); themeMenu.close(); blockMenus?.close(); colorMenus?.close();
  eol = text.includes('\r\n') ? '\r\n' : '\n';
  const surface = getSurface(); const scrollTop = surface?.scrollTop || 0;
  suppress = true;
  editor.setValue(text, true);
  baseline = getValue(); lastSent = text; version = nextVersion; pending.clear();
  suppress = false;
  if (surface) surface.scrollTop = scrollTop;
  updateOutline(); updateStatus();
}
function updateStatus() {
  toolbar.querySelector('[data-action=save]')?.setAttribute('aria-busy', String(!!pending.size));
}
function getSurface(): HTMLElement | undefined { return editor?.vditor[editor.vditor.currentMode]?.element; }
function rememberSelection() {
  if (!initialized) return;
  const surface = getSurface();
  if (surface instanceof HTMLTextAreaElement) savedTextarea = [surface.selectionStart, surface.selectionEnd];
  else { const selection = window.getSelection(); if (selection?.rangeCount && surface?.contains(selection.anchorNode)) savedRange = selection.getRangeAt(0).cloneRange(); }
}
function restoreSelection() {
  const surface = getSurface(); surface?.focus();
  if (surface instanceof HTMLTextAreaElement && savedTextarea) surface.setSelectionRange(...savedTextarea);
  else if (savedRange?.startContainer.isConnected) { const selection = window.getSelection()!; selection.removeAllRanges(); selection.addRange(savedRange); }
}
function nativeAction(id: string, selector?: string) {
  restoreSelection();
  const root = editor.vditor.toolbar.elements[id] as HTMLElement;
  root?.querySelector(selector || 'button')?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  setTimeout(submit, 30);
}
function applySettings() {
  const selected = catalog.themes.find(theme => theme.id === settings.theme);
  const code = catalog.themes.find(theme => theme.id === settings.codeTheme);
  const activeTheme = catalog.themes.find(theme => theme.id === catalog.activeTheme);
  const isDark = selected ? isDarkTheme(selected) : dark;
  document.documentElement.dataset.mode = isDark ? 'dark' : 'light';
  document.documentElement.dataset.appearance = 'auto';
  document.documentElement.dataset.theme = selected ? 'installed' : 'auto';
  document.documentElement.dataset.codeTheme = code ? 'installed' : 'auto';
  document.documentElement.dataset.hostMode = dark ? 'dark' : 'light';
  for (const key of ['bg', 'fg', 'panel', 'border', 'muted', 'accent'] as const) {
    document.documentElement.style.removeProperty(`--${key}`);
    if (selected) document.documentElement.style.setProperty(`--${key}`, selected.colors[key]);
  }
  document.documentElement.style.removeProperty('--code-bg'); document.documentElement.style.removeProperty('--code-fg');
  if (code) { document.documentElement.style.setProperty('--code-bg', code.colors.codeBg); document.documentElement.style.setProperty('--code-fg', code.colors.fg); }
  const codePalette = (code || activeTheme)?.tokens || boot.codePalette || {};
  for (const key of ['keyword', 'string', 'number', 'comment', 'function', 'type', 'variable', 'literal', 'property']) {
    document.documentElement.style.removeProperty(`--host-code-${key}`);
    if (/^#[\da-f]{3,8}$/i.test(codePalette[key] || '')) document.documentElement.style.setProperty(`--host-code-${key}`, codePalette[key]);
  }
  const vars: Record<string, string> = {
    '--ui-size': `${settings.uiFontSize}px`, '--editor-size': `${settings.editorFontSize}px`, '--line-height': String(settings.lineHeight),
    '--body-font': settings.fontFamily || 'system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    '--code-font': settings.codeFontFamily || 'var(--vscode-editor-font-family, ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace)',
    '--bold-color': /^#[0-9a-f]{3,8}$/i.test(settings.boldColor) ? settings.boldColor : 'inherit',
    '--page-width': validPageWidth(settings.pageWidth) ? settings.pageWidth : '100%', '--code-height': settings.codeMaxHeight,
    '--image-width': `${settings.imageMaxWidth}%`, '--image-height': `${settings.imageMaxHeight}vh`,
  };
  for (const [key, value] of Object.entries(vars)) document.documentElement.style.setProperty(key, value);
  if (!initialized) return;
  editor.setTheme(isDark ? 'dark' : 'classic', isDark ? 'dark' : 'light', isDark ? 'github-dark' : 'github');
  editor.vditor.options.typewriterMode = settings.typewriterMode;
  const width = pageWidthPixels(settings.pageWidth) || getSurface()!.clientWidth;
  editor.vditor.options.preview.maxWidth = Math.max(240, width - 64);
  const outline = document.getElementById('outline'); if (outline) outline.hidden = !settings.outline;
  const divider = document.getElementById('outline-resizer'); if (divider) divider.hidden = !settings.outline;
  outlineResize?.update();
  toolbar.querySelector('[data-action="outline"]')?.setAttribute('aria-pressed', String(settings.outline));
  if (editor.vditor.currentMode !== settings.mode) {
    submit(); const text = editor.getValue(); suppress = true;
    setEditMode(editor.vditor, settings.mode, text); baseline = getValue(); suppress = false;
    updateOutline(); updateStatus();
  }
  codeBlocks?.refresh(); blockMenus?.refresh(); structures?.refresh(); selectionColors?.refresh(); colorMenus?.refresh(); toolbarState?.refresh();
}
function headings() {
  const root = document.createElement('div'); root.innerHTML = editor.vditor.lute.Md2HTML(editor.getValue());
  return [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')];
}
function updateOutline() {
  const outline = document.getElementById('outline'); if (!outline) return;
  const list = headings();
  outline.innerHTML = `<div class="outline-title">文档大纲 <span>${list.length}</span></div>${list.length ? list.map((h, i) => `<button data-heading="${i}" style="--level:${Number(h.tagName.slice(1))}">${esc(h.textContent || '未命名标题')}</button>`).join('') : '<p class="muted">使用标题组织文档</p>'}`;
}
function navigateHeading(index: number) {
  const surface = getSurface()!;
  if (surface instanceof HTMLTextAreaElement) {
    let fenced = false, count = -1, offset = 0;
    const lines = surface.value.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
      const heading = /^\s{0,3}(?:>\s*)*#{1,6}\s/.test(line) || (line.trim() && /^\s{0,3}(?:=+|-+)\s*$/.test(lines[i + 1] || ''));
      if (!fenced && heading && ++count === index) { surface.focus(); surface.setSelectionRange(offset, offset + line.length); surface.scrollTop = Math.max(0, surface.value.slice(0, offset).split('\n').length * settings.editorFontSize * settings.lineHeight - 80); return; }
      offset += line.length + 1;
    }
  } else surface.querySelectorAll('h1,h2,h3,h4,h5,h6')[index]?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}
function showDialog(title: string, body: string, footer = '', wide = false) {
  themeMenu.close(); selectionColors?.hide(); blockMenus?.close(); colorMenus?.close();
  rememberSelection(); previousFocus = document.activeElement as HTMLElement;
  overlay.innerHTML = `<div class="scrim"><section class="dialog${wide ? ' wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header><h2 id="dialog-title">${title}</h2><button class="close" aria-label="关闭">×</button></header><div class="dialog-body">${body}</div>${footer ? `<footer>${footer}</footer>` : ''}</section></div>`;
  post('dialog', { open: true });
  overlay.querySelector('.close')!.addEventListener('click', closeDialog);
  overlay.querySelector('.scrim')!.addEventListener('click', e => { if (e.target === e.currentTarget) closeDialog(); });
  overlay.querySelector<HTMLElement>('button,input,select')?.focus();
}
function closeDialog(restoreFocus: boolean | Event = true) {
  if (overlay.querySelector('[data-export-running]')) return;
  overlay.innerHTML = ''; toolbar.querySelector('[data-action=settings]')!.setAttribute('aria-expanded', 'false'); post('dialog', { open: false }); if (restoreFocus !== false) previousFocus?.focus();
}
function showSettingsMenu(body: string) {
  themeMenu.close(); selectionColors?.hide(); blockMenus?.close(); colorMenus?.close(); rememberSelection(); previousFocus = document.activeElement as HTMLElement;
  const anchor = toolbar.querySelector<HTMLElement>('[data-action=settings]')!, rect = anchor.getBoundingClientRect();
  overlay.innerHTML = `<section id="settings-menu" class="settings-dropdown" role="region" aria-label="设置"><header><strong>设置</strong><button class="close" aria-label="关闭设置">×</button></header><div class="settings-body">${body}</div><footer><button id="reset-settings">恢复默认</button><button id="settings-done" class="primary">完成</button></footer></section>`;
  const menu = overlay.firstElementChild as HTMLElement;
  const width = Math.min(450, innerWidth - 16), top = rect.bottom + 4;
  menu.style.width = `${width}px`; menu.style.left = `${Math.max(8, Math.min(rect.right - width, innerWidth - width - 8))}px`;
  menu.style.top = `${top}px`; menu.style.maxHeight = `${innerHeight - top - 8}px`;
  menu.querySelector('.close')!.addEventListener('click', closeDialog); post('dialog', { open: true });
  anchor.setAttribute('aria-expanded', 'true'); menu.querySelector<HTMLElement>('button')?.focus({ preventScroll: true });
}
function pageWidthControl() {
  const custom = !pageWidths.some(([value]) => value === settings.pageWidth);
  const value = Math.round(pageWidthPixels(settings.pageWidth) || getSurface()?.clientWidth || 960);
  return `<div id="page-width-control"><select id="page-width-select" aria-label="页面宽度">${pageWidths.map(([width, label]) => `<option value="${width}" ${settings.pageWidth === width ? 'selected' : ''}>${label}</option>`).join('')}<option value="custom" ${custom ? 'selected' : ''}>自定义 px</option></select><div id="page-width-custom" ${custom ? '' : 'hidden'}><input id="page-width-pixels" type="number" min="240" max="6000" step="1" value="${value}" aria-label="自定义页面宽度"><span>px</span><button id="page-width-apply" type="button">应用</button></div><small id="page-width-error" role="status"></small></div>`;
}
function bindPageWidth() {
  const picker = overlay.querySelector<HTMLSelectElement>('#page-width-select')!, custom = overlay.querySelector<HTMLElement>('#page-width-custom')!, input = overlay.querySelector<HTMLInputElement>('#page-width-pixels')!;
  picker.onchange = () => {
    custom.hidden = picker.value !== 'custom';
    if (picker.value === 'custom') { input.focus(); input.select(); }
    else void changeSetting('pageWidth', picker.value);
  };
  const apply = () => {
    const width = `${input.value}px`, feedback = overlay.querySelector('#page-width-error')!;
    if (!validPageWidth(width)) { feedback.textContent = '请输入 240–6000px 的宽度'; return; }
    feedback.textContent = ''; if (settings.pageWidth !== width) void changeSetting('pageWidth', width);
  };
  input.onchange = apply; input.onkeydown = event => { if (event.key === 'Enter') { event.preventDefault(); apply(); } };
  overlay.querySelector<HTMLElement>('#page-width-apply')!.onclick = apply;
}
function showHeadingDialog() {
  showDialog('标题', `<div class="heading-picker">${[1, 2, 3, 4, 5, 6].map(n => `<button data-level="${n}"><strong>H${n}</strong><span>${n} 级标题</span></button>`).join('')}</div>`);
  overlay.querySelectorAll<HTMLElement>('[data-level]').forEach(button => button.onclick = () => { const n = button.dataset.level; closeDialog(); nativeAction('headings', `[data-tag="h${n}"]`); });
}
function selectedMarkdown(): string {
  const surface = getSurface();
  if (surface instanceof HTMLTextAreaElement) return surface.value.slice(surface.selectionStart, surface.selectionEnd);
  const selection = window.getSelection(); if (!selection?.rangeCount) return '';
  const range = selection.getRangeAt(0);
  const root = document.createElement('div'); root.append(range.cloneContents());
  let ancestor = range.commonAncestorContainer instanceof Element ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
  while (ancestor && ancestor !== surface && !/^(P|H[1-6]|LI|TD|TH|PRE|BLOCKQUOTE)$/.test(ancestor.tagName)) {
    if (/^(STRONG|B|EM|I|S|DEL|CODE|A)$/.test(ancestor.tagName)) { const wrapper = ancestor.cloneNode(false) as HTMLElement; wrapper.append(...root.childNodes); root.append(wrapper); }
    ancestor = ancestor.parentElement;
  }
  const html = root.querySelector('p,h1,h2,h3,li') ? root.innerHTML : `<p data-block="0">${root.innerHTML}</p>`;
  return (editor.vditor.currentMode === 'ir' ? editor.vditor.lute.VditorIRDOM2Md(html) : editor.vditor.lute.VditorDOM2Md(html)).trimEnd();
}
function setColor(property: 'color' | 'background-color', color: string | null) {
  restoreSelection();
  const surface = getSurface()!;
  if (!(surface instanceof HTMLTextAreaElement)) {
    const node = window.getSelection()?.anchorNode; const parent = node instanceof Element ? node : node?.parentElement;
    const span = parent?.closest<HTMLElement>('[data-vm-color]');
    if (span && (window.getSelection()?.isCollapsed || color === null)) {
      if (color) span.style.setProperty(property, color); else span.style.removeProperty(property);
      const tokens = [...span.children].filter(c => c.classList.contains('vm-color-token'));
      if (span.style.length) tokens[0].textContent = `<span style="${span.getAttribute('style')}">`;
      else { tokens.forEach(t => t.remove()); span.replaceWith(...span.childNodes); }
      surface.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'formatFontColor' })); submit(); return;
    }
  }
  let text = selectedMarkdown();
  if (!text) { toast('请先选中需要设置颜色的文字。'); return; }
  if (color === null) text = text.replace(/<span\s+style=["'][^"']*(?:color|background-color)[^"']*["']\s*>|<\/span\s*>/gi, '');
  else text = text.split('\n').map(line => {
    if (!line) return '';
    const [, prefix, content] = line.match(/^(\s*(?:(?:#{1,6}|>|[-+*]|\d+[.)])\s+)*(?:\[[ xX]\]\s+)?)(.*)$/)!;
    return `${prefix}<span style="${property}: ${color}">${content}</span>`;
  }).join('\n');
  editor.insertMD(text); submit();
}
function palette(property: ColorProperty) {
  const colors = settings[property === 'color' ? 'textColors' : 'backgroundColors'];
  return validPalette(colors) ? colors : defaultColors;
}
async function changeSetting(key: keyof Settings, value: any) {
  const previous = settings[key], update = { value }; pendingSettings.set(key, update);
  if (key === 'theme') settings = { ...settings, colorMode: 'auto' };
  settings = { ...settings, [key]: value }; applySettings();
  try { await rpc('setting', { key, value }); }
  catch (error) { if (pendingSettings.get(key) === update) { settings = { ...settings, [key]: previous }; applySettings(); } toast((error as Error).message, true); }
  finally { if (pendingSettings.get(key) === update) pendingSettings.delete(key); }
}
const select = (key: keyof Settings, values: [string, string][]) => `<select data-setting="${key}">${values.map(([v, label]) => `<option value="${esc(v)}" ${String(settings[key]) === v ? 'selected' : ''}>${label}</option>`).join('')}</select>`;
const stepper = (key: keyof Settings, suffix: string, step: number, min: number, max: number) => `<div class="stepper"><button data-step="${key}" data-delta="-${step}" aria-label="减小">−</button><output data-output="${key}">${settings[key]}${suffix}</output><button data-step="${key}" data-delta="${step}" aria-label="增大">＋</button><input type="hidden" data-bound="${key}" data-min="${min}" data-max="${max}" data-suffix="${suffix}"></div>`;
function showSettings() {
  if (overlay.querySelector('#settings-menu')) { closeDialog(); return; }
  const fonts: [string, string][] = [['', '默认'], ['PingFang SC', '苹方'], ['Heiti SC', '黑体'], ['STSong', '华文宋体'], ['STKaiti', '华文楷体'], ['Microsoft YaHei', '微软雅黑'], ['SimSun', '宋体'], ['KaiTi', '楷体'], ['Arial', 'Arial'], ['Georgia', 'Georgia'], ['SF Mono', 'SF Mono'], ['Menlo', 'Menlo'], ['Monaco', 'Monaco'], ['Consolas', 'Consolas']];
  const row = (label: string, control: string) => `<div class="setting-row"><span>${label}</span>${control}</div>`;
  showSettingsMenu(`<h3>编辑模式</h3><div class="settings-group">${row('模式', select('mode', [['ir', '即时渲染'], ['wysiwyg', '所见即所得'], ['sv', '分屏预览']]))}<button id="configure-shortcuts" class="settings-link">${icon('shortcuts')} 快捷键配置 <span>›</span></button></div>
  <h3>字号</h3><div class="settings-group">${row('UI', stepper('uiFontSize', 'px', 1, 10, 24))}${row('正文', stepper('editorFontSize', 'px', 1, 10, 40))}</div>
  <h3>排版</h3><div class="settings-group">${row('字体', select('fontFamily', fonts))}${row('粗体颜色', select('boldColor', [['', '默认'], ['#007c91', '青色'], ['#1971c2', '蓝色'], ['#e53935', '红色'], ['#7048e8', '紫色']]))}${row('页面宽度', pageWidthControl())}${row('行高', stepper('lineHeight', '', 0.1, 1, 3))}${row('打字机模式', `<input type="checkbox" class="switch" data-setting="typewriterMode" ${settings.typewriterMode ? 'checked' : ''} aria-label="打字机模式">`)}</div>
  <h3>代码块</h3><div class="settings-group">${row('字体', select('codeFontFamily', fonts))}${row('主题', `<select data-setting="codeTheme">${themeSelectOptions(catalog, settings.codeTheme)}</select>`)}${row('最大高度', select('codeMaxHeight', [['none', '默认'], ['240px', '240px'], ['400px', '400px'], ['60vh', '60vh']]))}</div>
  <h3>图片尺寸</h3><div class="settings-group">${row('最大宽度', stepper('imageMaxWidth', '%', 5, 10, 100))}${row('最大高度', stepper('imageMaxHeight', 'vh', 5, 10, 100))}</div>
  <h3>更多功能</h3><div class="extra-tools"><button data-extra="image">插入图片</button><button data-extra="emoji">表情</button><button data-extra="line">分隔线</button><button data-extra="inline-code">行内代码</button><button data-extra="outdent">减少缩进</button><button data-extra="indent">增加缩进</button><button data-extra="preview">预览</button></div>
  <h3>导出浏览器</h3><label class="browser-path">Edge / Chrome 路径<input data-setting="browserPath" value="${esc(settings.browserPath)}" placeholder="留空自动检测本机浏览器"></label>`);
  bindPageWidth();
  overlay.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-setting]').forEach(input => input.onchange = () => { void changeSetting(input.dataset.setting as keyof Settings, input instanceof HTMLInputElement && input.type === 'checkbox' ? input.checked : input.value); });
  overlay.querySelectorAll<HTMLElement>('[data-step]').forEach(button => button.onclick = () => {
    const key = button.dataset.step as keyof Settings, bound = overlay.querySelector<HTMLElement>(`[data-bound="${key}"]`)!;
    const value = Math.min(Number(bound.dataset.max), Math.max(Number(bound.dataset.min), Math.round((Number(settings[key]) + Number(button.dataset.delta)) * 10) / 10));
    void changeSetting(key, value); overlay.querySelector(`[data-output="${key}"]`)!.textContent = `${value}${bound.dataset.suffix}`;
  });
  overlay.querySelector<HTMLElement>('#configure-shortcuts')!.onclick = () => { closeDialog(); post('shortcuts'); };
  overlay.querySelector<HTMLElement>('#settings-done')!.onclick = closeDialog;
  overlay.querySelector<HTMLElement>('#reset-settings')!.onclick = async () => { await rpc('resetSettings'); settings = { ...defaults }; applySettings(); closeDialog(); showSettings(); };
  overlay.querySelectorAll<HTMLElement>('[data-extra]').forEach(b => b.onclick = () => {
    closeDialog();
    if (b.dataset.extra === 'image') insertImage();
    else if (b.dataset.extra === 'emoji') {
      showDialog('插入表情', `<div class="emoji-picker">${['😀', '😊', '👍', '❤️', '🎉', '🚀', '✅', '⚠️', '💡', '📌', '📝', '🔥', '👀', '🙏', '✨', '🐱'].map(emoji => `<button data-emoji="${emoji}">${emoji}</button>`).join('')}</div>`);
      overlay.querySelectorAll<HTMLElement>('[data-emoji]').forEach(button => button.onclick = () => { const emoji = button.dataset.emoji; closeDialog(); restoreSelection(); editor.insertMD(emoji); submit(); });
    } else nativeAction(b.dataset.extra!);
  });
}
function showTheme() {
  themeMenu.show(toolbar.querySelector<HTMLElement>('[data-action=theme]')!, 'theme');
}
function showExport() {
  const x = exportOptions;
  const toggle = (id: keyof ExportOptions, label: string, help: string) => `<label class="export-row"><span><strong>${label}</strong><small>${help}</small></span><input type="checkbox" class="switch" id="export-${id}" ${x[id] ? 'checked' : ''}></label>`;
  showDialog(`${icon('export')} 导出`, `<form id="export-form"><div class="export-row"><strong>格式</strong><div class="format-picker">${['pdf', 'html', 'docx'].map(v => `<button type="button" data-format="${v}" class="${x.format === v ? 'selected' : ''}">${v.toUpperCase()}</button>`).join('')}</div></div>
  <label class="export-row"><span><strong>顶部边距</strong><small>以像素为单位</small></span><input id="export-topMargin" type="number" min="0" max="300" value="${x.topMargin}" required></label>
  ${toggle('toc', '目录', '包含可点击目录，PDF 同时生成书签')}${toggle('beautify', '美化导出', '优化表格、代码块、图片与分页')}${toggle('theme', '应用主题', '使用当前编辑器的颜色')}
  <label class="export-row"><strong>纸张大小</strong><select id="export-paperSize">${['A4', 'A3', 'Letter'].map(v => `<option ${x.paperSize === v ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
  <div class="export-fonts"><label>字体<select id="export-font">${[['', '默认'], ['PingFang SC', '苹方'], ['Heiti SC', '黑体'], ['STSong', '华文宋体'], ['STKaiti', '华文楷体'], ['Microsoft YaHei', '微软雅黑'], ['SimSun', '宋体'], ['Arial', 'Arial'], ['Georgia', 'Georgia']].map(([v, label]) => `<option value="${v}" ${x.font === v ? 'selected' : ''}>${label}</option>`).join('')}</select></label><label>字号<input type="number" id="export-fontSize" min="8" max="72" value="${x.fontSize}" required><span>px</span></label></div>
  <label class="export-path">导出目录<div><input id="export-directory" value="${esc(x.directory)}" required><button type="button" id="browse-directory">浏览…</button></div></label><p id="export-note" class="muted"></p><p id="export-feedback" role="status"></p></form>`, '<button id="cancel-export">取消</button><button id="perform-export" class="primary">导出</button>', true);
  const setFormat = (format: ExportOptions['format']) => {
    exportOptions.format = format;
    overlay.querySelectorAll<HTMLElement>('[data-format]').forEach(b => b.classList.toggle('selected', b.dataset.format === format));
    (overlay.querySelector('#export-paperSize') as HTMLSelectElement).disabled = format === 'html';
    overlay.querySelector('#export-note')!.textContent = format === 'docx' ? '正文与表格可编辑，公式及复杂图表以图片保留。' : format === 'html' ? '生成独立 HTML 文件；纸张大小不适用于 HTML。' : '自动使用本机 Edge 或 Chrome，无需打开打印窗口。';
  };
  setFormat(x.format);
  overlay.querySelectorAll<HTMLElement>('[data-format]').forEach(b => b.onclick = () => setFormat(b.dataset.format as ExportOptions['format']));
  overlay.querySelector<HTMLElement>('#browse-directory')!.onclick = async () => { const folder = await rpc('browse'); if (folder) (overlay.querySelector('#export-directory') as HTMLInputElement).value = folder; };
  overlay.querySelector<HTMLElement>('#cancel-export')!.onclick = closeDialog;
  overlay.querySelector<HTMLElement>('#perform-export')!.onclick = async () => {
    const form = overlay.querySelector<HTMLFormElement>('#export-form')!; if (!form.reportValidity()) return;
    const value = (key: string) => (overlay.querySelector(`#export-${key}`) as HTMLInputElement | HTMLSelectElement).value;
    const checked = (key: string) => (overlay.querySelector(`#export-${key}`) as HTMLInputElement).checked;
    exportOptions = { format: exportOptions.format, topMargin: Number(value('topMargin')), toc: checked('toc'), beautify: checked('beautify'), theme: checked('theme'), paperSize: value('paperSize') as ExportOptions['paperSize'], font: value('font'), fontSize: Number(value('fontSize')), directory: value('directory') };
    submit();
    const button = overlay.querySelector<HTMLButtonElement>('#perform-export')!; button.disabled = true; button.dataset.exportRunning = '1'; button.textContent = '正在导出…';
    try { const result = await rpc('export', { options: exportOptions }); delete button.dataset.exportRunning; if (!result?.cancelled) { closeDialog(); toast('导出完成'); } }
    catch (error) { overlay.querySelector('#export-feedback')!.textContent = (error as Error).message; }
    finally { delete button.dataset.exportRunning; button.disabled = false; button.textContent = '导出'; }
  };
}
function showSearch() {
  let bar = document.getElementById('search-bar');
  if (!bar) {
    bar = document.createElement('div'); bar.id = 'search-bar';
    bar.innerHTML = '<input id="search-input" type="search" placeholder="搜索当前文档" aria-label="搜索当前文档"><label><input type="checkbox" id="search-case">Aa</label><output id="search-count">0 项</output><button id="search-prev" aria-label="上一处">↑</button><button id="search-next" aria-label="下一处">↓</button><button id="search-close" aria-label="关闭搜索">×</button>';
    toolbar.after(bar);
    bar.querySelector('#search-input')!.addEventListener('input', () => { searchIndex = -1; findText(1); });
    bar.querySelector('#search-case')!.addEventListener('change', () => { searchIndex = -1; findText(1); });
    bar.querySelector('#search-prev')!.addEventListener('click', () => findText(-1));
    bar.querySelector('#search-next')!.addEventListener('click', () => findText(1));
    bar.querySelector('#search-close')!.addEventListener('click', () => { (CSS as any).highlights?.delete('vm-find'); bar!.remove(); });
    bar.querySelector('#search-input')!.addEventListener('keydown', e => { const key = e as KeyboardEvent; if (key.key === 'Enter') { key.preventDefault(); findText(key.shiftKey ? -1 : 1); } if (key.key === 'Escape') { bar!.remove(); getSurface()?.focus(); } });
  }
  bar.querySelector<HTMLInputElement>('input')!.focus();
}
function findText(direction: number) {
  const query = (document.getElementById('search-input') as HTMLInputElement).value;
  const matchCase = (document.getElementById('search-case') as HTMLInputElement).checked;
  const surface = getSurface()!, nodes: Text[] = []; let text = '';
  if (surface instanceof HTMLTextAreaElement) text = surface.value;
  else {
    const walker = document.createTreeWalker(surface, NodeFilter.SHOW_TEXT, { acceptNode(node) {
      const parent = node.parentElement!;
      if (!parent.getClientRects().length || parent.closest('.vm-color-token,.vditor-ir__marker,.vditor-wysiwyg__pre,.vditor-ir__marker--pre,script,style')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    } });
    let node; while ((node = walker.nextNode())) { nodes.push(node as Text); text += node.textContent; }
  }
  const haystack = matchCase ? text : text.toLocaleLowerCase(), needle = matchCase ? query : query.toLocaleLowerCase();
  const matches: number[] = [];
  if (needle) { let at = haystack.indexOf(needle); while (at >= 0) { matches.push(at); at = haystack.indexOf(needle, at + Math.max(1, needle.length)); } }
  searchIndex = matches.length ? (searchIndex + direction + matches.length) % matches.length : -1;
  document.getElementById('search-count')!.textContent = `${searchIndex < 0 ? 0 : searchIndex + 1} / ${matches.length}`;
  (CSS as any).highlights?.delete('vm-find');
  if (searchIndex < 0) return;
  const start = matches[searchIndex], end = start + query.length;
  if (surface instanceof HTMLTextAreaElement) { surface.setSelectionRange(start, end); surface.scrollTop = Math.max(0, text.slice(0, start).split('\n').length * settings.editorFontSize * settings.lineHeight - surface.clientHeight / 2); }
  else {
    const range = document.createRange(); let offset = 0, started = false;
    for (const node of nodes) { const next = offset + node.length; if (!started && start < next) { range.setStart(node, start - offset); started = true; } if (started && end <= next) { range.setEnd(node, end - offset); break; } offset = next; }
    if ((window as any).Highlight) (CSS as any).highlights.set('vm-find', new (window as any).Highlight(range));
    range.startContainer.parentElement?.scrollIntoView({ block: 'center' });
  }
}
function insertImage() {
  const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/png,image/jpeg,image/gif,image/webp,image/bmp'; input.multiple = true;
  input.onchange = () => { if (input.files) void uploadImages([...input.files]); }; input.click();
}
async function uploadImages(files: File[]) {
  for (const file of files) {
    if (file.size > 20 * 1024 * 1024) { toast('图片不能超过 20MB。', true); continue; }
    try {
      const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]); reader.onerror = reject; reader.readAsDataURL(file); });
      const relative = await rpc('image', { data, mime: file.type });
      restoreSelection(); editor.insertMD(`![${file.name.replace(/[\[\]]/g, '')}](<${relative}>)`); submit();
    } catch (error) { toast((error as Error).message, true); }
  }
}
function action(id: Action) {
  if (!initialized) return;
  if (['save', 'source', 'undo', 'redo'].includes(id)) { submit(); post(id); return; }
  if (id === 'outline') { void changeSetting('outline', !settings.outline); return; }
  if (id === 'headings') return showHeadingDialog();
  if (id === 'textColor' || id === 'backgroundColor') return colorMenus?.showPalette(toolbar.querySelector<HTMLElement>(`[data-action=${id}]`)!, id === 'textColor' ? 'color' : 'background-color');
  if (id === 'settings') return showSettings();
  if (id === 'export') return showExport();
  if (id === 'theme') return showTheme();
  if (id === 'brightness') {
    const next = catalog.themes.find(theme => theme.kind === (document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark'));
    if (next) void changeSetting('theme', next.id);
    return;
  }
  if (id === 'shortcuts') { post('shortcuts'); return; }
  if (id === 'search') return showSearch();
  nativeAction(id);
}
toolbar.addEventListener('pointerdown', e => { rememberSelection(); if ((e.target as Element).closest('button')) e.preventDefault(); });
toolbar.addEventListener('click', e => { const button = (e.target as Element).closest<HTMLElement>('[data-action]'); if (button) action(button.dataset.action as Action); });
document.addEventListener('selectionchange', rememberSelection);
document.addEventListener('keydown', e => {
  if (!overlay.childElementCount) return;
  if (e.key === 'Escape') { e.preventDefault(); closeDialog(); }
  if (e.key === 'Tab' && overlay.querySelector('.scrim')) {
    const focusable = [...overlay.querySelectorAll<HTMLElement>('button:not(:disabled),input:not([type=hidden]):not(:disabled),select:not(:disabled)')];
    const first = focusable[0], last = focusable.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }
});
document.addEventListener('pointerdown', event => {
  const menu = overlay.querySelector('#settings-menu');
  if (menu && !menu.contains(event.target as Node) && !(event.target as Element).closest('[data-action=settings]')) closeDialog(false);
});
window.addEventListener('resize', () => { if (overlay.querySelector('#settings-menu')) closeDialog(false); });
document.addEventListener('click', e => {
  const anchor = (e.target as Element).closest<HTMLAnchorElement>('#editor a');
  if (!anchor) return;
  e.preventDefault(); const href = anchor.getAttribute('href') || '';
  if (href.startsWith('#')) document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView();
  else post('openLink', { href });
});
document.addEventListener('beforeinput', e => {
  if (window.acquireVsCodeApi && !overlay.childElementCount && getSurface()?.contains(e.target as Node) && (e.inputType === 'historyUndo' || e.inputType === 'historyRedo')) {
    e.preventDefault(); e.stopImmediatePropagation(); action(e.inputType === 'historyUndo' ? 'undo' : 'redo');
  }
}, true);

document.addEventListener('paste', e => {
  if (!getSurface()?.contains(e.target as Node)) return;
  let files = [...(e.clipboardData?.files || [])].filter(f => f.type.startsWith('image/'));
  if (!files.length) files = [...(e.clipboardData?.items || [])].filter(item => item.kind === 'file' && item.type.startsWith('image/')).map(item => item.getAsFile()).filter((file): file is File => !!file);
  if (files.length) { e.preventDefault(); e.stopImmediatePropagation(); rememberSelection(); void uploadImages(files); }
}, true);
document.addEventListener('drop', e => {
  const files = [...(e.dataTransfer?.files || [])].filter(f => f.type.startsWith('image/'));
  if (files.length && getSurface()?.contains(e.target as Node)) { e.preventDefault(); e.stopImmediatePropagation(); rememberSelection(); void uploadImages(files); }
}, true);
window.addEventListener('message', e => {
  const m = e.data; if (!m || typeof m.type !== 'string') return;
  if (m.type === 'result' || m.type === 'error') {
    const request = requests.get(m.requestId); if (request) { requests.delete(m.requestId); m.type === 'error' ? request.reject(new Error(m.message)) : request.resolve(m.value); }
    if (m.type === 'error') toast(m.message, true);
  } else if (m.type === 'document' && initialized) {
    if (m.initial || m.text !== lastSent) applyDocument(m.text, m.version); else version = m.version;
  } else if (m.type === 'ack') { pending.delete(m.seq); version = m.version; updateStatus(); }
  else if (m.type === 'saved') toast('已保存');
  else if (m.type === 'command') action(m.action);
  else if (m.type === 'config') { settings = { ...defaults, ...m.settings, ...Object.fromEntries([...pendingSettings].map(([key, update]) => [key, update.value])) }; dark = m.dark; catalog = { themes: m.themes || catalog.themes, activeTheme: m.activeTheme || catalog.activeTheme }; exportOptions = { ...exportDefaults, ...m.exportDefaults }; applySettings(); }
});
applySettings();
editor = new Vditor('editor', {
  cdn: boot.cdn, lang: 'zh_CN', mode: settings.mode, height: '100%', cache: { enable: false },
  theme: document.documentElement.dataset.mode === 'dark' ? 'dark' : 'classic',
  value: '', placeholder: '开始书写 Markdown…', outline: { enable: false },
  toolbar: nativeTools.map(name => ({ name, hotkey: '' })), toolbarConfig: { hide: true },
  preview: { maxWidth: 1200, delay: 200, math: { engine: 'KaTeX' }, markdown: { sanitize: true, toc: true, mark: true }, theme: { current: 'light', path: `${boot.cdn}/dist/css/content-theme` } },
  input: () => { submit(); },
  after: () => {
    installColorAdapter(editor.vditor.lute);
    toolbarState = installToolbarState(toolbar, editor.vditor.toolbar.element, overlay);
    codeBlocks = installCodeBlocks(editor, { openThemeMenu: anchor => themeMenu.show(anchor, 'codeTheme'), rpc, submit, toast });
    structures = installStructures(editor, submit);
    blockMenus = installBlockMenus(editor, { submit, rpc, toast, beforeOpen: () => { closeDialog(false); themeMenu.close(); colorMenus?.close(); selectionColors?.hide(); }, menuState: open => post('dialog', { open }) });
    colorMenus = installColorMenus({ surface: getSurface, palette, changePalette: (property, colors) => { void changeSetting(property === 'color' ? 'textColors' : 'backgroundColors', colors); }, edit: (target, styles) => {
      try { const caret = editTextStyles(target, styles, editor.vditor.lute, editor.vditor.currentMode); for (const preview of caret.querySelectorAll<HTMLElement>('.vditor-ir__preview[data-render="2"]')) processCodeRender(preview, editor.vditor); const surface = getSurface()!; surface.focus({ preventScroll: true }); const range = document.createRange(); range.selectNodeContents(caret); range.collapse(false); getSelection()!.removeAllRanges(); getSelection()!.addRange(range); surface.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'formatFontColor' })); submit(); }
      catch (error) { toast((error as Error).message, true); }
    }, blocked: () => !!overlay.childElementCount || themeMenu.isOpen() || !!blockMenus?.isOpen(), beforeOpen: () => { closeDialog(false); themeMenu.close(); blockMenus?.close(); selectionColors?.hide(); }, menuState: open => post('dialog', { open }) });
    const outline = document.createElement('nav'); outline.id = 'outline'; outline.setAttribute('aria-label', '文档大纲');
    const divider = document.createElement('div'); divider.id = 'outline-resizer'; divider.tabIndex = 0; divider.setAttribute('role', 'separator'); divider.setAttribute('aria-label', '调整大纲宽度'); divider.setAttribute('aria-orientation', 'vertical');
    editor.vditor.element.querySelector('.vditor-content').prepend(outline, divider);
    outlineResize = installOutlineResize(outline, divider, { width: () => settings.outlineWidth, change: width => { void changeSetting('outlineWidth', width); } });
    outline.addEventListener('click', e => { const heading = (e.target as Element).closest<HTMLElement>('[data-heading]'); if (heading) navigateHeading(Number(heading.dataset.heading)); });
    initialized = true; baseline = getValue(); applySettings(); post('ready');
    selectionColors = installSelectionColors({ surface: getSurface, palette, blocked: () => !!overlay.childElementCount || themeMenu.isOpen() || !!blockMenus?.isOpen() || !!colorMenus?.isOpen(), remember: rememberSelection, apply: setColor });
    window.VM_APP = { editor, action, getValue, applyDocument, submit, settings: () => settings, documentVersion: () => version, ready: true };
  },
});
