import { templateFor } from './contentMarkup';
import { linkDestination } from './links';
import { storedColumnWidths } from './tableWidths';

const elements = new Set('a b blockquote br code del div em h1 h2 h3 h4 h5 h6 hr i img li mark ol p pre s span strike strong sub sup table tbody td th thead tr u ul'.split(' '));
const hidden = '.vditor-ir__marker:not(pre),.vditor-copy,.vm-color-token,.vm-inline-format-token,[data-type=html-inline],[data-type=backslash]>span,[data-type=code-block-open-marker],[data-type=code-block-close-marker],[data-type=code-block-info],[data-type=link-ref-defs-block],[hidden],script,style,iframe,object';
const renderPanels = 'pre.vditor-ir__marker,.vditor-wysiwyg__pre,.vditor-ir__preview,.vditor-wysiwyg__preview';
const irLink = '[data-type=a],[data-type=link-ref]';

function safeURL(value?: string | null, image = false) {
  if (!value) return;
  const url = value.trim();
  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(url.replace(/[\u0000-\u0020]/g, ''))?.[1].toLowerCase();
  if (!scheme || scheme === 'http' || scheme === 'https' || (scheme === 'mailto' && !image)
    || (image && /^data:image\/(?:png|jpeg|gif|webp|bmp);base64,/i.test(url))) return url;
}

export function clipboardHTML(toHTML: (text: string) => string, markdown: string, surface?: HTMLElement, range?: Range) {
  const root = surface ?? templateFor(toHTML(markdown)).content;
  const result = document.createElement('div');
  const widths = new WeakMap<HTMLTableElement, number[]>();
  function append(node: Node, target: HTMLElement) {
    if (range && !range.intersectsNode(node)) return;
    if (node instanceof Text) {
      const start = node === range?.startContainer ? range.startOffset : 0;
      const end = node === range?.endContainer ? range.endOffset : node.length;
      const text = node.data.slice(start, end).replaceAll('\u200b', '');
      if (text) target.append(text);
      return;
    }
    if (!(node instanceof HTMLElement) || node.matches(hidden) || node.style.display === 'none') return;
    if (node.matches(renderPanels) && getComputedStyle(node).display === 'none') return;
    const link = surface && node.matches(irLink) ? linkDestination(node, surface, toHTML) : node.getAttribute('href');
    const tag = link ? 'a' : node.localName === 'code' && node.closest('[data-type=html-entity]') ? 'span' : node.localName;
    const copy = elements.has(tag) ? document.createElement(tag) : undefined;
    if (!copy) {
      for (const child of node.childNodes) append(child, target);
      return;
    }
    if (tag === 'a') {
      const href = safeURL(link);
      if (href) copy.setAttribute('href', href);
    } else if (tag === 'img') {
      const src = safeURL(node.getAttribute('data-src') || node.getAttribute('src'), true);
      if (!src) return;
      copy.setAttribute('src', src);
      copy.setAttribute('alt', node.getAttribute('alt') || '');
    }
    for (const attribute of ['start', 'value', 'colspan', 'rowspan']) {
      const value = node.getAttribute(attribute);
      if (value && /^-?\d+$/.test(value)) copy.setAttribute(attribute, value);
    }
    if (tag === 'code') {
      const language = [...node.classList].find(name => /^language-[\w+-]+$/.test(name));
      if (language) copy.className = language;
    }
    if (node instanceof HTMLTableCellElement) {
      const table = node.closest('table')!;
      if (table && !widths.has(table)) widths.set(table, storedColumnWidths(table));
      const width = widths.get(table)?.[node.cellIndex];
      if (width) {
        copy.setAttribute('width', String(width));
        copy.style.width = `${width}px`;
      }
      const align = node.style.textAlign || node.getAttribute('align')?.toLowerCase();
      if (align && /^(left|center|right|justify)$/.test(align)) {
        copy.setAttribute('align', align);
        copy.style.textAlign = align;
      }
    }
    for (const property of ['color', 'background-color', 'font-size']) {
      const value = node.style.getPropertyValue(property);
      if (value) copy.style.setProperty(property, value);
    }
    for (const child of node.childNodes) append(child, copy);
    if (copy.hasChildNodes() || copy.matches('br,hr,img,td,th')) target.append(copy);
  }
  for (const node of root.childNodes) append(node, result);
  return result.innerHTML;
}

export async function writeRichClipboard(text: string, html: string) {
  let written = false;
  const copy = (event: ClipboardEvent) => {
    if (!event.clipboardData) return;
    event.clipboardData.setData('text/plain', text);
    event.clipboardData.setData('text/html', html);
    event.preventDefault(); event.stopImmediatePropagation();
    written = true;
  };
  document.addEventListener('copy', copy, true);
  try { if (document.execCommand?.('copy') && written) return true; }
  finally { document.removeEventListener('copy', copy, true); }
  if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) return false;
  try {
    await navigator.clipboard.write([new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    })]);
    return true;
  } catch { return false; }
}
