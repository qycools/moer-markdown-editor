import { defaultColors, type ColorProperty } from '../shared';
import type { TextStyles } from './colors';
import { icon } from './icons';

export function installColorMenus(options: {
  surface: () => HTMLElement | undefined;
  palette: (property: ColorProperty) => string[];
  changePalette: (property: ColorProperty, colors: string[]) => void;
  edit: (target: HTMLElement, styles: TextStyles) => void;
  blocked: () => boolean;
  beforeOpen: () => void;
  menuState: (open: boolean) => void;
}) {
  let menu: HTMLElement | undefined, paletteProperty: ColorProperty | undefined, target: HTMLElement | undefined;
  let dragIndex = -1;
  function close() { if (!menu) return; menu.remove(); menu = undefined; target = undefined; paletteProperty = undefined; options.menuState(false); }
  function show(id: string, label: string, anchor: DOMRect) {
    close(); options.beforeOpen(); menu = document.createElement('section'); menu.id = id; menu.className = 'color-menu'; menu.setAttribute('role', 'region'); menu.setAttribute('aria-label', label);
    document.body.append(menu); options.menuState(true);
    const position = () => {
      if (!menu) return;
      menu.style.left = `${Math.max(8, Math.min(anchor.left, innerWidth - menu.offsetWidth - 8))}px`;
      menu.style.top = `${anchor.bottom + menu.offsetHeight + 5 <= innerHeight - 8 ? anchor.bottom + 5 : Math.max(8, anchor.top - menu.offsetHeight - 5)}px`;
    };
    menu.addEventListener('pointerdown', event => { if (!(event.target as Element).closest('input,[draggable=true]')) event.preventDefault(); });
    menu.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(); } });
    return position;
  }
  function renderPalette() {
    if (!menu || !paletteProperty) return;
    const colors = options.palette(paletteProperty), label = paletteProperty === 'color' ? '字体颜色配色' : '背景颜色配色';
    menu.innerHTML = `<header><strong>${label}</strong><button data-color-close aria-label="关闭配色菜单">×</button></header><p class="muted">保留 1–8 色；拖动六点号调整顺序。</p><div class="palette-list">${colors.map((color, i) => `<div class="palette-color-row" draggable="true" data-palette-index="${i}"><span class="palette-grip" title="拖动排序">${icon('grip')}</span><input type="color" value="${color}" data-palette-edit="${i}" aria-label="颜色 ${i + 1}"><span class="palette-hex">${color.toUpperCase()}</span><button data-palette-move="${i}" data-direction="-1" aria-label="上移颜色 ${i + 1}" ${i === 0 ? 'disabled' : ''}>↑</button><button data-palette-move="${i}" data-direction="1" aria-label="下移颜色 ${i + 1}" ${i === colors.length - 1 ? 'disabled' : ''}>↓</button><button data-palette-delete="${i}" aria-label="删除颜色 ${i + 1}" ${colors.length === 1 ? 'disabled' : ''}>${icon('trash')}</button></div>`).join('')}</div><footer><button id="palette-add" ${colors.length === 8 ? 'disabled' : ''}>${icon('add')}添加颜色</button><button id="palette-default">恢复默认</button></footer>`;
    menu.querySelector<HTMLElement>('[data-color-close]')!.onclick = close;
    const update = (next: string[]) => options.changePalette(paletteProperty!, next);
    menu.querySelectorAll<HTMLInputElement>('[data-palette-edit]').forEach(input => input.onchange = () => { const next = [...colors]; next[Number(input.dataset.paletteEdit)] = input.value; update(next); });
    menu.querySelectorAll<HTMLElement>('[data-palette-delete]').forEach(button => button.onclick = () => { if (colors.length > 1) update(colors.filter((_, i) => i !== Number(button.dataset.paletteDelete))); });
    const move = (from: number, to: number) => { if (from < 0 || to < 0 || to >= colors.length || from === to) return; const next = [...colors]; next.splice(to, 0, next.splice(from, 1)[0]); update(next); };
    menu.querySelectorAll<HTMLElement>('[data-palette-move]').forEach(button => button.onclick = () => move(Number(button.dataset.paletteMove), Number(button.dataset.paletteMove) + Number(button.dataset.direction)));
    menu.querySelectorAll<HTMLElement>('[data-palette-index]').forEach(row => {
      row.ondragstart = event => { dragIndex = Number(row.dataset.paletteIndex); event.dataTransfer!.effectAllowed = 'move'; event.dataTransfer!.setData('text/plain', String(dragIndex)); row.classList.add('dragging'); };
      row.ondragover = event => { if (dragIndex >= 0) { event.preventDefault(); event.dataTransfer!.dropEffect = 'move'; } };
      row.ondrop = event => { event.preventDefault(); move(dragIndex, Number(row.dataset.paletteIndex)); dragIndex = -1; };
      row.ondragend = () => { dragIndex = -1; row.classList.remove('dragging'); };
    });
    menu.querySelector<HTMLElement>('#palette-add')!.onclick = () => { if (colors.length < 8) update([...colors, '#007c91']); };
    menu.querySelector<HTMLElement>('#palette-default')!.onclick = () => update([...defaultColors]);
  }
  function showPalette(anchor: HTMLElement, property: ColorProperty) {
    if (menu?.id === 'palette-menu' && paletteProperty === property) { close(); return; }
    const position = show('palette-menu', property === 'color' ? '字体颜色配色' : '背景颜色配色', anchor.getBoundingClientRect());
    paletteProperty = property; renderPalette(); position();
    menu!.dataset.palette = property;
    menu!.querySelector<HTMLElement>('button')?.focus({ preventScroll: true });
  }
  function showAnnotation(span: HTMLElement) {
    const position = show('annotation-menu', '修改文字格式', span.getBoundingClientRect()); target = span;
    const computed = getComputedStyle(span);
    const hex = (value: string) => {
      const rgb = value.match(/\d+(?:\.\d+)?/g); return rgb && rgb.length >= 3 ? '#' + rgb.slice(0, 3).map(n => Math.round(Number(n)).toString(16).padStart(2, '0')).join('') : '#000000';
    };
    let background = span.style.backgroundColor;
    for (let parent = span.parentElement; !background && parent?.closest('[data-vm-color]'); parent = parent.parentElement) if (parent.matches('[data-vm-color]')) background = parent.style.backgroundColor;
    const foreground = hex(computed.color), bg = background ? hex(background) : options.palette('background-color')[0], size = Math.round(parseFloat(computed.fontSize));
    menu!.innerHTML = `<div class="annotation-fields"><label>字体颜色<input type="color" id="annotation-color" value="${foreground}"></label><label>背景颜色<input type="color" id="annotation-background" value="${bg}"></label><label>字号<input type="number" id="annotation-size" min="8" max="96" value="${size}" aria-label="文字字号"><span>px</span></label><button id="annotation-clear" title="清除字体色与背景色" aria-label="清除字体色与背景色">${icon('eraser')}</button><button id="annotation-save" class="primary">保存</button></div><small id="annotation-error" role="status"></small>`;
    const changes: TextStyles = {};
    menu!.querySelector<HTMLInputElement>('#annotation-color')!.onchange = event => { changes.color = (event.target as HTMLInputElement).value; };
    menu!.querySelector<HTMLInputElement>('#annotation-background')!.onchange = event => { changes['background-color'] = (event.target as HTMLInputElement).value; };
    menu!.querySelector<HTMLInputElement>('#annotation-size')!.oninput = event => { changes['font-size'] = (event.target as HTMLInputElement).value + 'px'; };
    menu!.querySelector<HTMLElement>('#annotation-save')!.onclick = () => {
      const input = menu!.querySelector<HTMLInputElement>('#annotation-size')!;
      if (!input.checkValidity() || !input.value) { menu!.querySelector('#annotation-error')!.textContent = '字号范围为 8–96px'; return; }
      const selected = target; close(); if (selected?.isConnected && Object.keys(changes).length) options.edit(selected, changes);
    };
    menu!.querySelector<HTMLElement>('#annotation-clear')!.onclick = () => { const selected = target; close(); if (selected?.isConnected) options.edit(selected, { color: null, 'background-color': null }); };
    position();
  }
  document.addEventListener('pointerdown', event => { if (menu && !menu.contains(event.target as Node) && !(event.target as Element).closest('[data-action=textColor],[data-action=backgroundColor]')) close(); });
  document.addEventListener('click', event => {
    if (options.blocked() || menu?.contains(event.target as Node) || !getSelection()?.isCollapsed) return;
    const span = (event.target as Element).closest<HTMLElement>('[data-vm-color]');
    if (span && options.surface()?.contains(span) && !span.closest('[data-type=code-block],.vm-color-token')) showAnnotation(span);
  });
  document.addEventListener('scroll', event => { if (menu && !menu.contains(event.target as Node)) close(); }, true);
  window.addEventListener('resize', close);
  return { close, showPalette, refresh: () => { if (paletteProperty) renderPalette(); }, isOpen: () => !!menu };
}
