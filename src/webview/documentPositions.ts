import DiffMatchPatch from 'diff-match-patch';
import type { SourceLineRange } from '../shared';
import { templateFor } from './contentMarkup';
import { textareaOffsets } from './textareaMirror';

type Point = { node: Node; offset: number };
type Convert = (value: string) => string;

export const normalizeMarkdown = (text: string) => text.replace(/\r\n/g, '\n');

export function mapOffsets(before: string, after: string, offsets: number[]) {
  if (before === after) return offsets;
  const diff = new DiffMatchPatch();
  diff.Diff_Timeout = 0.2;
  const chunks = diff.diff_main(before, after, false);
  return offsets.map(offset => Math.max(0, Math.min(after.length, diff.diff_xIndex(chunks, offset))));
}

export function reconcileMarkdown(before: string, after: string, source: string) {
  if (before === after) return source;
  if (before === source) return after;
  let markerSpace = '';
  if (after.includes('<wbr data-moye-') || before.includes('<wbr data-moye-')) {
    for (let code = 0xe000; code <= 0xf8ff; code++) {
      const candidate = String.fromCharCode(code);
      if (![before, after, source].some(value => value.includes(candidate))) { markerSpace = candidate; break; }
    }
    if (markerSpace) {
      // Table padding must not match the space inside a layout tag.
      const protect = (value: string) => value.replace(/<wbr (?=data-moye-(?:col-width="\d{1,4}"|table="auto")>)/g, '<wbr' + markerSpace);
      before = protect(before); after = protect(after); source = protect(source);
    }
  }
  const diff = new DiffMatchPatch();
  diff.Diff_Timeout = 0.2;
  const changes: { start: number; end: number; text: string }[] = [];
  let offset = 0, change: (typeof changes)[number] | undefined;
  for (const [operation, text] of diff.diff_main(before, after, false)) {
    if (operation === 0) { offset += text.length; change = undefined; continue; }
    if (!change) { change = { start: offset, end: offset, text: '' }; changes.push(change); }
    if (operation < 0) { offset += text.length; change.end = offset; }
    else change.text += text;
  }
  const positions = mapOffsets(before, source, changes.flatMap(({ start, end }) => [start, end]));
  let result = '', cursor = 0;
  for (const [index, { text }] of changes.entries()) {
    result += source.slice(cursor, positions[index * 2]) + text;
    cursor = positions[index * 2 + 1];
  }
  result += source.slice(cursor);
  return markerSpace ? result.replaceAll(markerSpace, ' ') : result;
}

function markers(count: number) {
  const prefix = `VMPosition${crypto.randomUUID().replaceAll('-', '')}`;
  return Array.from({ length: count }, (_, index) => `${prefix}Z${index}Z`);
}

function readMarkers(value: string, tokens: string[]) {
  const positions = tokens.map((token, index) => ({ token, index, at: value.indexOf(token) }));
  if (positions.some(position => position.at === -1)) return;
  let text = '', offset = 0;
  const offsets: number[] = [];
  for (const { token, index, at } of positions.sort((a, b) => a.at - b.at)) {
    text += value.slice(offset, at);
    offsets[index] = text.length;
    offset = at + token.length;
  }
  return { text: text + value.slice(offset), offsets };
}

export function markdownOffsets(surface: HTMLElement, toMarkdown: Convert, markdown: string, points: Point[]) {
  const clone = surface.cloneNode(true) as HTMLElement;
  const tokens = markers(points.length);
  const ranges = points.map(({ node, offset }, index) => {
    const path: number[] = [];
    for (let child = node; child !== surface; child = child.parentNode!) {
      path.unshift(Array.prototype.indexOf.call(child.parentNode!.childNodes, child));
    }
    const copy = path.reduce<Node>((parent, child) => parent.childNodes[child], clone);
    const range = document.createRange();
    range.setStart(copy, offset); range.collapse(true);
    return { range, token: tokens[index] };
  });
  ranges.sort((a, b) => b.range.compareBoundaryPoints(Range.START_TO_START, a.range));
  for (const { range, token } of ranges) range.insertNode(document.createTextNode(token));
  const marked = readMarkers(normalizeMarkdown(toMarkdown(clone.innerHTML)), tokens);
  return marked && mapOffsets(marked.text, markdown, marked.offsets);
}

export function blockMarkdownOffsets(surface: HTMLElement, block: Element, toMarkdown: Convert, markdown: string) {
  const index = Array.prototype.indexOf.call(surface.children, block);
  if (index < 0) return;
  const clone = surface.cloneNode(true) as HTMLElement, copy = clone.children[index];
  const tokens = markers(2);
  const boundaries = tokens.map(token => {
    const paragraph = document.createElement('p');
    paragraph.dataset.block = '0'; paragraph.textContent = token;
    return paragraph;
  });
  copy.before(boundaries[0]); copy.after(boundaries[1]);
  const marked = readMarkers(normalizeMarkdown(toMarkdown(clone.innerHTML)), tokens);
  if (!marked) return;
  const [left, right] = marked.offsets;
  const part = marked.text.slice(left, right);
  const start = left + (part.match(/^\n*/)?.[0].length || 0);
  const end = right - (part.match(/\n*$/)?.[0].length || 0);
  if (start < end) return mapOffsets(marked.text, markdown, [start, end]);
}

function visualText(root: Node) {
  const hidden = '.vditor-ir__marker,.vditor-wysiwyg__pre,.vm-color-token,.vditor-copy,[data-type=html-inline],[data-type=backslash]>span,[hidden],script,style';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, node =>
    node instanceof Element && (node.matches(hidden) || (node instanceof HTMLElement && node.style.display === 'none'))
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT);
  let text = '', node: Node | null;
  const parts: { node: Text; end: number }[] = [];
  while ((node = walker.nextNode())) {
    if (!(node instanceof Text) || !node.length) continue;
    text += node.data;
    parts.push({ node, end: text.length });
  }
  return {
    text,
    point(offset: number, end = false): Point {
      const part = parts.find(part => end ? part.end >= offset : part.end > offset) ?? parts.at(-1);
      return part ? { node: part.node, offset: Math.min(part.node.length, offset - (part.end - part.node.length)) } : { node: root, offset: 0 };
    },
  };
}

export function renderedText(markdown: string, toDOM: Convert) {
  return visualText(templateFor(toDOM(markdown)).content).text.replaceAll('\u200b', '').replace(/\s+/g, ' ').trim();
}

function visualRange(surface: HTMLElement, markdown: string, toDOM: Convert, start: number, end: number) {
  const tokens = markers(start === end ? 1 : 2);
  const markedSource = start === end
    ? markdown.slice(0, start) + tokens[0] + markdown.slice(start)
    : markdown.slice(0, start) + tokens[0] + markdown.slice(start, end) + tokens[1] + markdown.slice(end);
  const marked = readMarkers(visualText(templateFor(toDOM(markedSource)).content).text, tokens);
  const actual = visualText(surface);
  const offsets = marked ? mapOffsets(marked.text, actual.text, marked.offsets)
    : [Math.min(actual.text.length, visualText(templateFor(toDOM(markdown.slice(0, start))).content).text.length)];
  const first = actual.point(offsets[0]), last = offsets.length > 1 && offsets[1] > offsets[0] ? actual.point(offsets[1], true) : first;
  const range = document.createRange();
  range.setStart(first.node, first.offset); range.setEnd(last.node, last.offset);
  return range;
}

export function sourceLineOffsets(markdown: string, lines: SourceLineRange) {
  const rows = markdown.split('\n');
  if (lines.start < 1 || lines.end < lines.start || lines.end > rows.length) return;
  let start = 0, end = 0;
  for (let index = 0; index < lines.end; index++) {
    if (index === lines.start - 1) start = end;
    end += rows[index].length + 1;
  }
  const first = rows[lines.start - 1], last = rows[lines.end - 1];
  const leading = first.match(/^(?:[ \t]*>[ \t]?)*[ \t]*(?:(?:#{1,6}|[-+*]|\d+[.)])[ \t]+(?:\[[ xX]\][ \t]+)?|\|[ \t]*)?/)?.[0].length ?? 0;
  const trailing = last.length - last.trimEnd().length + Number(last.trimEnd().endsWith('|') && last.trimStart().startsWith('|'));
  return { start, end: end - 1, visualStart: start + leading, visualEnd: Math.max(start + leading, end - 1 - trailing) };
}

type RevealPosition = 'center' | 'top';
const lineJumpPadding = new WeakMap<HTMLElement, () => void>();

function revealAtTop(scroll: HTMLElement, offset: number) {
  lineJumpPadding.get(scroll)?.();
  const top = Math.max(0, offset - 12);
  if (top > scroll.scrollHeight - scroll.clientHeight) {
    const property = 'padding-bottom';
    const original = scroll.style.getPropertyValue(property), priority = scroll.style.getPropertyPriority(property);
    const padding = parseFloat(getComputedStyle(scroll).paddingBottom);
    const viewport = scroll.clientHeight;
    const requiredHeight = top + viewport;
    scroll.style.setProperty(property, `${padding + viewport}px`, 'important');
    const extra = Math.max(0, Math.ceil(viewport + requiredHeight - scroll.scrollHeight));
    const value = `${padding + extra}px`;
    scroll.style.setProperty(property, value, 'important');
    const listeners = new AbortController();
    const reset = () => {
      listeners.abort();
      lineJumpPadding.delete(scroll);
      if (scroll.style.getPropertyValue(property) === value && scroll.style.getPropertyPriority(property) === 'important') {
        scroll.style.setProperty(property, original, priority);
      }
    };
    lineJumpPadding.set(scroll, reset);
    scroll.addEventListener('input', reset, { signal: listeners.signal });
    scroll.addEventListener('scroll', () => {
      if (scroll.scrollTop <= Math.max(0, scroll.scrollHeight - scroll.clientHeight - extra) + 1) reset();
    }, { signal: listeners.signal });
  }
  scroll.scrollTop = top;
}

function revealRange(scroll: HTMLElement, range: Range, position: RevealPosition) {
  const parent = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
  const rect = range.getClientRects()[0];
  const top = rect?.height ? rect.top : parent?.getBoundingClientRect().top;
  if (top === undefined) return;
  const offset = scroll.scrollTop + top - scroll.getBoundingClientRect().top;
  if (position === 'top') revealAtTop(scroll, offset - scroll.clientTop);
  else {
    lineJumpPadding.get(scroll)?.();
    scroll.scrollTop = offset - scroll.clientHeight / 2;
  }
}

export function revealPreviewRange(content: HTMLElement, scroll: HTMLElement, markdown: string, toDOM: Convert, start: number, end: number) {
  revealRange(scroll, visualRange(content, markdown, toDOM, start, end), 'top');
}

export function revealElementAtTop(target: HTMLElement, scroll: HTMLElement) {
  revealAtTop(scroll, scroll.scrollTop + target.getBoundingClientRect().top - scroll.getBoundingClientRect().top - scroll.clientTop);
}

export function selectMarkdownRange(surface: HTMLElement, markdown: string, toDOM: Convert, start: number, end: number, reveal?: RevealPosition) {
  if (surface instanceof HTMLTextAreaElement) {
    surface.setSelectionRange(start, end);
    if (reveal === 'top') revealAtTop(surface, textareaOffsets(surface, [start])[0]);
    else if (reveal === 'center') {
      lineJumpPadding.get(surface)?.();
      surface.scrollTop = textareaOffsets(surface, [start])[0] - surface.clientHeight / 2;
    }
    return;
  }
  const range = visualRange(surface, markdown, toDOM, start, end);
  const parent = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
  if (!parent?.closest('.vditor-ir__preview,.vditor-wysiwyg__preview')) {
    const selection = getSelection()!;
    selection.removeAllRanges(); selection.addRange(range);
  }
  if (reveal) revealRange(surface, range, reveal);
}
