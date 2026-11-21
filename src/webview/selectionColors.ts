import type { ColorProperty } from '../shared';
import { textareaMirror } from './textareaMirror';

function textareaRect(surface: HTMLTextAreaElement): DOMRect {
  const mirror = textareaMirror(surface), style = getComputedStyle(surface), rect = surface.getBoundingClientRect();
  mirror.textContent = surface.value.slice(0, surface.selectionEnd);
  const marker = document.createElement('span'); marker.textContent = '\u200b'; mirror.append(marker); document.body.append(mirror);
  const point = new DOMRect(rect.left + marker.offsetLeft - surface.scrollLeft, rect.top + marker.offsetTop - surface.scrollTop, 1, parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.7);
  mirror.remove(); return point;
}
export function installSelectionColors(options: {
  surface: () => HTMLElement | undefined;
  blocked: () => boolean;
  remember: () => void;
  palette: (property: ColorProperty) => string[];
  apply: (property: ColorProperty, color: string) => void;
}) {
  const bar = document.createElement('div'); bar.id = 'selection-colors'; bar.hidden = true;
  bar.setAttribute('role', 'toolbar'); bar.setAttribute('aria-label', '文字颜色');
  let signature = '';
  function render() {
    const next = JSON.stringify([options.palette('background-color'), options.palette('color')]); if (signature === next) return; signature = next;
    bar.innerHTML = (['background-color', 'color'] as const).map(property => `<div class="selection-color-row" role="group" aria-label="${property === 'color' ? '字体颜色' : '背景颜色'}">${options.palette(property).map(color => `<button type="button" data-color-property="${property}" ${property === 'color' ? 'data-text-color' : 'data-highlight-color'}="${color}" style="--swatch:${color}" aria-label="${property === 'color' ? '字体颜色' : '标记背景色'} ${color}" title="${color}">${property === 'color' ? 'A' : ''}</button>`).join('')}</div>`).join('');
  }
  render();
  document.body.append(bar);
  let timer = 0, dragging = false;
  function hide() { clearTimeout(timer); bar.hidden = true; }
  function update() {
    if (dragging || options.blocked()) { hide(); return; }
    const surface = options.surface(); if (!surface) { hide(); return; }
    if (!surface.contains(document.activeElement)) { hide(); return; }
    let rect: DOMRect;
    if (surface instanceof HTMLTextAreaElement) {
      if (surface.selectionStart === surface.selectionEnd || !surface.value.slice(surface.selectionStart, surface.selectionEnd).trim()) { hide(); return; }
      const prefix = surface.value.slice(0, surface.selectionStart);
      const fence = /^\s*(?:>\s*)*(?:```|~~~)/m;
      if (prefix.split('\n').filter(line => fence.test(line)).length % 2 || fence.test(surface.value.slice(surface.selectionStart, surface.selectionEnd))) { hide(); return; }
      rect = textareaRect(surface);
    } else {
      const selection = window.getSelection();
      if (!selection?.rangeCount || selection.isCollapsed || !selection.toString().trim()) { hide(); return; }
      const range = selection.getRangeAt(0);
      if (!surface.contains(range.startContainer) || !surface.contains(range.endContainer)) { hide(); return; }
      const contents = range.cloneContents();
      const parent = range.startContainer.parentElement;
      if (parent?.closest('[data-type="code-block"],.vditor-ir__preview,.vditor-wysiwyg__preview') || contents.querySelector('[data-type="code-block"],pre')) { hide(); return; }
      const bounds = surface.getBoundingClientRect();
      const visible = [...range.getClientRects()].filter(r => r.width && r.height && r.bottom > bounds.top && r.top < bounds.bottom);
      if (!visible.length) { hide(); return; }
      rect = visible[visible.length - 1];
    }
    const bounds = surface.getBoundingClientRect();
    if (rect.bottom < bounds.top || rect.top > bounds.bottom) { hide(); return; }
    options.remember(); render(); bar.hidden = false;
    const width = bar.offsetWidth, height = bar.offsetHeight;
    bar.style.left = `${Math.max(8, Math.min(rect.left + rect.width / 2 - width / 2, innerWidth - width - 8))}px`;
    const below = rect.bottom + 9;
    const top = below + height <= Math.min(bounds.bottom, innerHeight - 8) ? below : Math.max(bounds.top + 4, rect.top - height - 9);
    bar.style.top = `${top}px`;
  }
  function schedule() { clearTimeout(timer); timer = window.setTimeout(update, 100); }
  bar.addEventListener('pointerdown', event => { event.preventDefault(); event.stopPropagation(); });
  bar.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLElement>('[data-color-property]'), color = button?.dataset.highlightColor || button?.dataset.textColor;
    if (color) { hide(); options.apply(button!.dataset.colorProperty as ColorProperty, color); }
  });
  document.addEventListener('selectionchange', schedule);
  document.addEventListener('pointerdown', event => { if (!bar.contains(event.target as Node)) { dragging = !!options.surface()?.contains(event.target as Node); hide(); } });
  window.addEventListener('pointerup', () => { dragging = false; schedule(); });
  window.addEventListener('pointercancel', () => { dragging = false; hide(); });
  document.addEventListener('keyup', schedule);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
  document.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide); window.addEventListener('blur', hide);
  return { hide, refresh: render };
}
