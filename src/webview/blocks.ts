import { processCodeRender } from '@local/code';
import { icon } from './icons';
import { viewportLayer } from './viewportLayer';
import { canEditImage } from './imageTools';
import { headingSelector } from './mindmap';

const types = [['p', '文本'], ['ordered-list', '有序列表'], ['list', '无序列表'], ['check', '任务列表'], ['code', '代码块'], ['callout', '高亮块'], ['quote', '引用'], ['columns', '分栏'], ['fold', '折叠块']];
const typeIcons: Record<string, string> = { p: 'headings', 'ordered-list': 'ordered-list', list: 'list', check: 'check', code: 'code', callout: 'backgroundColor', quote: 'quote', columns: 'columns', fold: 'fold' };

export function installBlockMenus(editor: any, options: {
  submit: () => void;
  rpc: (type: string, data?: object) => Promise<any>;
  toast: (text: string, error?: boolean) => void;
  beforeOpen: () => void;
  menuState: (open: boolean) => void;
  openProperties: (block: HTMLElement) => void;
  editSource: (block: HTMLElement) => void;
}) {
  const handles = new Map<HTMLElement, HTMLButtonElement>(), layers = new Map<HTMLElement, HTMLElement>();
  let menu: HTMLElement | undefined, activeBlock: HTMLElement | undefined, scheduled = false;
  let hoveredHeading: HTMLButtonElement | undefined;
  const surface = () => editor.vditor.currentMode === 'sv' ? undefined : editor.vditor[editor.vditor.currentMode].element as HTMLElement;
  function close() {
    const wasOpen = !!menu;
    menu?.remove(); menu = undefined; activeBlock = undefined;
    handles.forEach(handle => handle.setAttribute('aria-expanded', 'false')); if (wasOpen) options.menuState(false);
  }
  function markdown(block: HTMLElement): string {
    let html = block.outerHTML;
    if (block.tagName === 'LI') { const list = block.parentElement!.cloneNode(false) as HTMLElement; list.append(block.cloneNode(true)); html = list.outerHTML; }
    return (editor.vditor.currentMode === 'ir' ? editor.vditor.lute.VditorIRDOM2Md(html) : editor.vditor.lute.VditorDOM2Md(html)).trimEnd();
  }
  function focus(block: HTMLElement, end = false) {
    const root = surface(); if (!root || !block.isConnected) return;
    const code = block.matches('[data-type="code-block"]') ? block.querySelector<HTMLElement>(':scope>pre>code') : null;
    let target = block;
    if (code) { code.parentElement!.style.display = 'block'; block.classList.add('vditor-ir__node--expand'); target = code; }
    else target = block.querySelector<HTMLElement>('[data-vm-block]>:first-child') || block.querySelector<HTMLElement>('td,th,p,.vditor-ir__preview,.vditor-wysiwyg__preview') || block;
    root.focus({ preventScroll: true }); const range = document.createRange(); range.selectNodeContents(target); range.collapse(!end);
    getSelection()!.removeAllRanges(); getSelection()!.addRange(range);
  }
  function nodes(text: string): HTMLElement[] {
    const root = document.createElement('div'), mode = editor.vditor.currentMode;
    root.innerHTML = mode === 'ir' ? editor.vditor.lute.Md2VditorIRDOM(text) : editor.vditor.lute.Md2VditorDOM(text);
    return [...root.children] as HTMLElement[];
  }
  function render(elements: HTMLElement[]) {
    for (const element of elements) for (const preview of element.querySelectorAll<HTMLElement>('.vditor-ir__preview[data-render="2"],.vditor-wysiwyg__preview[data-render="2"]')) {
      if (editor.vditor.currentMode === 'wysiwyg') { const code = preview.previousElementSibling as HTMLElement; code?.classList.add('vditor-wysiwyg__pre'); if (code) code.style.display = 'none'; }
      processCodeRender(preview, editor.vditor);
    }
  }
  function replace(block: HTMLElement, text: string) {
    const elements = nodes(text);
    if (block.tagName === 'LI') {
      const list = block.parentElement!, items = [...list.children], index = items.indexOf(block);
      const before = list.cloneNode(false) as HTMLElement, after = list.cloneNode(false) as HTMLElement;
      before.append(...items.slice(0, index)); after.append(...items.slice(index + 1));
      if (list.tagName === 'OL') after.setAttribute('start', String(Number(list.getAttribute('start') || 1) + index + 1));
      list.replaceWith(...(before.children.length ? [before] : []), ...elements, ...(after.children.length ? [after] : []));
    } else block.replaceWith(...elements);
    render(elements); close(); if (elements[0]) focus(elements[0]); options.submit(); schedule();
  }
  function plain(text: string): string {
    if (/^\s*(`{3,}|~{3,})/.test(text)) return text.split('\n').slice(1, -1).join('\n');
    return text.replace(/^>\s?\[![A-Z]+\].*\n?/, '').replace(/^>\s?/gm, '').replace(/^#{1,6}\s+/, '').replace(/^(?:[-+*]|\d+[.)])\s+(?:\[[ xX]\]\s+)?/, '');
  }
  function converted(type: string, text: string): string {
    const body = plain(text) || '新段落';
    if (/^h[1-6]$/.test(type)) return `${'#'.repeat(Number(type[1]))} ${body}`;
    if (type === 'list' || type === 'ordered-list' || type === 'check') return `${type === 'list' ? '- ' : type === 'check' ? '- [ ] ' : '1. '}${body.replace(/\n/g, '\n  ')}`;
    if (type === 'quote' || type === 'callout') return `${type === 'callout' ? '> [!NOTE]\n' : ''}${body.split('\n').map(line => '> ' + line).join('\n')}`;
    if (type === 'code') { const fence = '`'.repeat(Math.max(3, ...[...body.matchAll(/`+/g)].map(match => match[0].length + 1))); return `${fence}plaintext\n${body}\n${fence}`; }
    const html = editor.vditor.lute.Md2HTML(body).replace(/\n/g, '');
    if (type === 'columns') return `<div data-vm-block="columns" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px"><div>${html}</div><div><p>第二栏</p></div></div>`;
    if (type === 'fold') return `<details data-vm-block="fold" open><summary>折叠块</summary><div>${html}</div></details>`;
    return body;
  }
  function remove(block: HTMLElement) {
    const root = surface()!, next = block.nextElementSibling as HTMLElement | null, previous = block.previousElementSibling as HTMLElement | null, parent = block.parentElement!;
    block.remove(); if (/^(UL|OL)$/.test(parent.tagName) && !parent.children.length) parent.remove();
    if (!root.children.length) root.innerHTML = '<p data-block="0">\n</p>';
    close(); focus(next?.isConnected ? next : previous?.isConnected ? previous : root.firstElementChild as HTMLElement); options.submit(); schedule();
  }
  function indent(block: HTMLElement, out: boolean) {
    if (block.tagName === 'LI') {
      const list = block.parentElement!, owner = list.parentElement!;
      if (out && owner.tagName === 'LI') { owner.after(block); if (!list.children.length) list.remove(); }
      else if (!out && block.previousElementSibling) {
        const previous = block.previousElementSibling, nested = previous.querySelector<HTMLElement>(`:scope>${list.tagName.toLowerCase()}`) || document.createElement(list.tagName.toLowerCase());
        previous.append(nested); nested.append(block);
      } else if (out) { replace(block, plain(markdown(block))); return; }
    } else { replace(block, out ? plain(markdown(block)) : markdown(block).split('\n').map(line => '> ' + line).join('\n')); return; }
    close(); focus(block); options.submit(); schedule();
  }
  function submenu(kind: string) {
    if (!menu || !activeBlock) return;
    const panel = menu.querySelector<HTMLElement>('.block-menu-sub')!;
    if (panel.dataset.kind === kind) return;
    panel.dataset.kind = kind; panel.hidden = false;
    panel.style.top = '0';
    if (kind === 'convert' || kind === 'add') {
      const action = kind === 'convert' ? 'convert' : 'add';
      panel.innerHTML = `<div class="block-heading-grid">${[1, 2, 3, 4, 5, 6].map(n => `<button type="button" role="menuitem" data-block-action="${action}:h${n}">H${n}</button>`).join('')}</div><div class="block-type-grid">${types.map(([type, label]) => `<button type="button" role="menuitem" data-block-action="${action}:${type}">${icon(typeIcons[type])}<span>${label}</span></button>`).join('')}</div>`;
    } else if (kind === 'indent') panel.innerHTML = `${[['in', '增加缩进'], ['out', '减少缩进'], ['up', '上移'], ['down', '下移']].map(([action, label]) => `<button type="button" role="menuitem" data-block-action="${action}">${label}</button>`).join('')}`;
    const rect = menu.getBoundingClientRect();
    panel.style.left = rect.right + panel.offsetWidth + 8 <= innerWidth ? '100%' : 'auto'; panel.style.right = panel.style.left === 'auto' ? '100%' : 'auto';
    if (rect.left < panel.offsetWidth && panel.style.left === 'auto') { panel.style.left = '0'; panel.style.right = 'auto'; panel.style.top = '100%'; }
    const top = panel.getBoundingClientRect().top;
    if (top + panel.offsetHeight > innerHeight - 8) panel.style.top = `${Math.max(8, innerHeight - panel.offsetHeight - 8) - rect.top}px`;
  }
  async function run(action: string) {
    const block = activeBlock; if (!block?.isConnected) return;
    if (['convert', 'indent', 'add'].includes(action)) { submenu(action); return; }
    if (action === 'properties') { close(); options.openProperties(block); return; }
    if (action === 'source') { close(); options.editSource(block); return; }
    try {
      const text = markdown(block);
      if (action === 'copy' || action === 'cut') { await options.rpc('clipboardWrite', { text: text + '\n' }); if (action === 'cut' && block.isConnected) remove(block); else { close(); options.toast('段落已复制'); } }
      else if (action === 'delete') remove(block);
      else if (action.startsWith('convert:')) replace(block, converted(action.slice(8), text));
      else if (action.startsWith('add:')) {
        const added = converted(action.slice(4), '新段落');
        if (block.tagName === 'LI') replace(block, text + '\n\n' + added);
        else { const elements = nodes(added); block.after(...elements); render(elements); close(); if (elements[0]) focus(elements[0]); options.submit(); schedule(); }
      } else if (action === 'in' || action === 'out') indent(block, action === 'out');
      else if (action === 'up' || action === 'down') {
        const sibling = action === 'up' ? block.previousElementSibling : block.nextElementSibling;
        if (sibling) action === 'up' ? sibling.before(block) : sibling.after(block);
        close(); focus(block); options.submit(); schedule();
      }
    } catch (error) { options.toast((error as Error).message, true); }
  }
  function open(block: HTMLElement, handle: HTMLElement) {
    if (activeBlock === block && menu) { close(); return; }
    close(); options.beforeOpen(); activeBlock = block; handle.setAttribute('aria-expanded', 'true');
    const buttons = [
      ['convert', 'convert', '转化为', true], ['source', 'code', '编辑 Markdown 源码', false],
      ['delete', 'trash', '删除', false], ['copy', 'copy', '复制', false], ['cut', 'cut', '剪切', false],
      ['indent', 'indent', '缩进', true], ['add', 'add', '在下方添加', true],
    ] as const;
    menu = document.createElement('div'); menu.id = 'block-menu'; menu.className = 'block-menu';
    const image = block.querySelector('img');
    const properties = block.tagName === 'TABLE' ? '表格操作' : image && canEditImage(image) ? '图片操作' : '';
    menu.innerHTML = `<div class="block-menu-main" role="menu" aria-label="段落操作">${buttons.map(([action, image, label, sub]) => `<button type="button" role="menuitem" data-block-action="${action}" ${sub ? 'aria-haspopup="menu"' : ''}>${icon(image)}<span>${label}</span>${sub ? '<span class="block-chevron">›</span>' : ''}</button>`).join('')}${properties ? `<button type="button" role="menuitem" data-block-action="properties">${properties}</button>` : ''}</div><div class="block-menu-sub" role="menu" aria-label="段落子菜单" hidden></div>`;
    document.body.append(menu); const rect = handle.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - menu.offsetWidth - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(rect.bottom + 3, innerHeight - menu.offsetHeight - 8))}px`;
    menu.addEventListener('pointerdown', event => { if (!(event.target as Element).closest('input,select,textarea')) event.preventDefault(); });
    menu.addEventListener('click', event => { const action = (event.target as Element).closest<HTMLElement>('[data-block-action]')?.dataset.blockAction; if (action) void run(action); });
    menu.querySelectorAll<HTMLElement>('[aria-haspopup]').forEach(button => button.addEventListener('pointerenter', () => submenu(button.dataset.blockAction!)));
    menu.addEventListener('keydown', event => {
      const buttons = [...menu!.querySelectorAll<HTMLButtonElement>('button')].filter(button => !!button.getClientRects().length), current = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (event.key === 'Escape') { event.preventDefault(); const target = activeBlock; close(); if (target) focus(target); }
      else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); buttons[(current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length]?.focus(); }
      else if (event.key === 'ArrowRight' && document.activeElement?.hasAttribute('aria-haspopup')) { const action = (document.activeElement as HTMLElement).dataset.blockAction; if (action) submenu(action); }
    });
    menu.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true }); options.menuState(true);
  }
  function refresh() {
    scheduled = false; const root = surface();
    const blocks = root ? [...root.children].flatMap(element => /^(UL|OL)$/.test(element.tagName) ? [...element.querySelectorAll('li')] : [element]) as HTMLElement[] : [];
    const current = new Set(blocks);
    for (const [block, handle] of handles) if (!current.has(block)) { handle.remove(); handles.delete(block); }
    if (activeBlock && !activeBlock.isConnected) close(); if (!root) return;
    const { layer, origin } = viewportLayer(root.parentElement!, layers, 'vm-block-layer');
    const gutter = Math.max(22, root.getBoundingClientRect().left - origin.left + parseFloat(getComputedStyle(root).paddingLeft) - 27);
    for (const block of blocks) {
      if (block.tagName === 'WBR' || !block.getClientRects().length) continue;
      let handle = handles.get(block);
      if (!handle) {
        handle = document.createElement('button'); handle.className = 'vm-block-handle'; handle.type = 'button';
        const heading = block.matches(headingSelector) ? block.tagName : '';
        if (heading) handle.dataset.headingLevel = heading;
        handle.setAttribute('aria-label', heading ? `${heading} 段落操作` : '段落操作');
        handle.setAttribute('aria-haspopup', 'menu'); handle.innerHTML = icon('grip');
        handle.onpointerdown = event => event.preventDefault(); handle.onclick = () => open(block, handle!);
        handles.set(block, handle); layer.append(handle);
      }
      const rect = block.getBoundingClientRect(); handle.style.transform = `translate(${gutter}px,${rect.top - origin.top + 2}px)`;
      handle.hidden = rect.bottom < origin.top || rect.top > origin.bottom;
    }
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(refresh); } }
  function hover(target: EventTarget | null) {
    const heading = target instanceof Element ? target.closest<HTMLElement>(headingSelector) : null;
    const handle = heading ? handles.get(heading) : undefined;
    if (handle === hoveredHeading) return;
    hoveredHeading?.removeAttribute('data-heading-hover');
    hoveredHeading = handle;
    handle?.setAttribute('data-heading-hover', '');
  }
  const observer = new MutationObserver(schedule);
  for (const mode of ['ir', 'wysiwyg']) {
    const root = editor.vditor[mode].element as HTMLElement; observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['style', 'class'] });
    root.addEventListener('pointerover', event => hover(event.target));
    root.addEventListener('pointerout', event => hover(event.relatedTarget));
    root.addEventListener('scroll', schedule, { passive: true }); root.parentElement!.addEventListener('scroll', schedule, { passive: true }); new ResizeObserver(schedule).observe(root);
  }
  document.addEventListener('pointerdown', event => { if (menu && !menu.contains(event.target as Node) && !(event.target as Element).closest('.vm-block-handle')) close(); });
  document.addEventListener('scroll', event => { if (menu && !menu.contains(event.target as Node)) close(); }, true);
  window.addEventListener('resize', () => { close(); schedule(); });
  schedule(); return { close, refresh: schedule, isOpen: () => !!menu };
}
