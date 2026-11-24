import { markdownOffsets } from './documentPositions';
import { clipboardHTML } from './clipboardHTML';

const inline = 'strong,b,em,i,s,strike,del,mark,sub,sup,code,a,[data-vm-color],[data-type=backslash],[data-type=link-ref],.vditor-ir__node:is([data-type=strong],[data-type=em],[data-type=s],[data-type=mark],[data-type=code],[data-type=a])';
const hidden = '.vditor-ir__marker,.vm-color-token,.vm-inline-format-token,[data-type=html-inline],[data-type=backslash]>span,[hidden]';

function includeCompleteFormat(surface: HTMLElement, range: Range, start: boolean) {
  const node = start ? range.startContainer : range.endContainer;
  for (let parent = node instanceof Element ? node : node.parentElement; parent && parent !== surface; parent = parent.parentElement) {
    if (!parent.matches(inline)) continue;
    const edge = document.createRange(); edge.selectNodeContents(parent);
    if (start) edge.setEnd(range.startContainer, range.startOffset);
    else edge.setStart(range.endContainer, range.endOffset);
    const fragment = edge.cloneContents();
    fragment.querySelectorAll(hidden).forEach(element => element.remove());
    if (fragment.textContent?.replaceAll('\u200b', '') || fragment.querySelector('img,br,svg')) return;
    if (start) range.setStartBefore(parent);
    else range.setEndAfter(parent);
  }
}

export function installSelectionCopy(options: {
  surface: () => HTMLElement | undefined;
  markdown: () => string;
  toMarkdown: (html: string) => string;
  toHTML: (markdown: string) => string;
  fallback: () => string;
  blocked: () => boolean;
  beforeOpen: () => void;
  write: (text: string, html?: string) => void;
}) {
  const menu = document.createElement('div');
  menu.id = 'vm-selection-copy';
  menu.setAttribute('role', 'menu'); menu.setAttribute('aria-label', '复制选区');
  menu.innerHTML = '<button type="button" role="menuitem" data-copy="text">复制纯文本</button><button type="button" role="menuitem" data-copy="markdown">复制 Markdown 源码</button>';
  const items = [...menu.querySelectorAll('button')];
  function close(restore = false) {
    if (!menu.isConnected) return;
    menu.remove();
    if (restore) options.surface()?.focus({ preventScroll: true });
  }
  function open(event: MouseEvent) {
    const surface = options.surface();
    if (!surface?.contains(event.target as Node) || options.blocked()) return;
    const sourceMode = surface instanceof HTMLTextAreaElement;
    const selection = getSelection();
    const range = !sourceMode && selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : undefined;
    if (!sourceMode && (!range || range.collapsed || !surface.contains(range.commonAncestorContainer))) return;
    const text = sourceMode ? surface.value.slice(surface.selectionStart, surface.selectionEnd) : selection!.toString().replaceAll('\u200b', '');
    if (!text) return;
    const box = range?.getBoundingClientRect() || surface.getBoundingClientRect();
    if (event.button === 2 && range && ![...range.getClientRects()].some(rect => event.clientX >= rect.left - 2 && event.clientX <= rect.right + 2 && event.clientY >= rect.top - 2 && event.clientY <= rect.bottom + 2)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const visualRange = range?.cloneRange();
    close(); options.beforeOpen();
    let markdown = text;
    if (range) {
      includeCompleteFormat(surface, range, true); includeCompleteFormat(surface, range, false);
      const source = options.markdown();
      const offsets = markdownOffsets(surface, options.toMarkdown, source, [
        { node: range.startContainer, offset: range.startOffset }, { node: range.endContainer, offset: range.endOffset },
      ]);
      markdown = offsets && offsets[0] < offsets[1] ? source.slice(offsets[0], offsets[1]) : options.fallback() || text;
    }
    items[0].onclick = () => { close(true); options.write(text); };
    items[1].onclick = () => {
      const html = clipboardHTML(options.toHTML, markdown, visualRange ? surface : undefined, visualRange);
      close(true); options.write(markdown, html);
    };
    document.body.append(menu);
    const x = event.clientX || box.left, y = event.clientY || box.bottom;
    menu.style.left = `${Math.max(4, Math.min(x, innerWidth - menu.offsetWidth - 4))}px`;
    menu.style.top = `${Math.max(4, Math.min(y, innerHeight - menu.offsetHeight - 4))}px`;
    items[0].focus({ preventScroll: true });
  }
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.key === 'Tab') { event.preventDefault(); event.stopPropagation(); close(true); }
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); items[items[0] === document.activeElement ? 1 : 0].focus(); }
  });
  document.addEventListener('contextmenu', open, true);
  document.addEventListener('pointerdown', event => { if (!menu.contains(event.target as Node)) close(); });
  window.addEventListener('resize', () => close());
  return { close };
}
