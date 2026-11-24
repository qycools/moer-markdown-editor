import { templateFor } from './contentMarkup';
import { markdownOffsets, renderedText } from './documentPositions';

export type InlineFormat = 'bold' | 'italic';
type SourceEdit = { text: string; start: number; end: number };
type Delimiters = readonly [string, string];
const formats = { bold: { tags: 'strong,b', marks: ['**', '__'], html: ['<strong>', '</strong>'] }, italic: { tags: 'em,i', marks: ['*', '_'], html: ['<em>', '</em>'] } } as const;
const zeroWidth = '\u200b';

function trimRange(text: string, start: number, end: number) {
  const selected = text.slice(start, end);
  return [start + selected.length - selected.trimStart().length, start + selected.trimEnd().length];
}

function wrap(text: string, [open, close]: Delimiters) {
  const core = text.trim();
  if (!core) return text;
  const start = text.indexOf(core);
  return text.slice(0, start) + open + core + close + text.slice(start + core.length);
}

function formatLines(text: string, start: number, end: number, marks: readonly Delimiters[]): SourceEdit | undefined {
  let next = '', last = 0, from = -1, to = -1, fence = '';
  for (const match of text.matchAll(/[^\n]*(?:\n|$)/g)) {
    const line = match[0].replace(/\n$/, ''), lineStart = match.index;
    if (lineStart >= end) break;
    const prefix = /^(?: {0,3}>[ \t]?)*(?: {0,3}(?:#{1,6}|[-+*]|\d{1,9}[.)])[ \t]+)?/.exec(line)![0];
    const content = line.slice(prefix.length);
    const code = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(content);
    if (fence) {
      if (code && code[1][0] === fence[0] && code[1].length >= fence.length && !code[2].trim()) fence = '';
      continue;
    }
    if (code) { fence = code[1]; continue; }
    if (/^(?: {4}|\t)|^ {0,3}(?:[-=_*]){3,}[ \t]*$/.test(content)) continue;
    const [left, right] = trimRange(text, Math.max(start, lineStart + prefix.length), Math.min(end, lineStart + line.length));
    if (left >= right) continue;
    const selected = text.slice(left, right);
    const paired = marks.find(([open, close]) => selected.length > open.length + close.length && selected.startsWith(open) && selected.endsWith(close)
      && (open !== close || (selected[open.length] !== open[0] && selected.at(-close.length - 1) !== close[0])));
    const [open, close] = marks[0];
    next += text.slice(last, left);
    const inner = paired ? selected.slice(paired[0].length, -paired[1].length) : selected;
    if (!paired) next += open;
    if (from < 0) from = next.length;
    next += inner;
    to = next.length;
    if (!paired) next += close;
    last = right;
  }
  return from >= 0 ? { text: next + text.slice(last), start: from, end: to } : undefined;
}

function removeFormat(text: string, start: number, end: number, innerStart: number, innerEnd: number, delimiters: Delimiters): SourceEdit | undefined {
  const [open, close] = delimiters;
  const from = innerStart - open.length, to = innerEnd + close.length;
  if (from < 0 || text.slice(from, innerStart) !== open || text.slice(innerEnd, to) !== close) return;
  if (start === end) return { text: text.slice(0, from) + text.slice(innerStart, innerEnd) + text.slice(to), start: start - open.length, end: start - open.length };
  const before = wrap(text.slice(innerStart, start), delimiters);
  const selected = text.slice(start, end);
  const after = wrap(text.slice(end, innerEnd), delimiters);
  const offset = from + before.length;
  return { text: text.slice(0, from) + before + selected + after + text.slice(to), start: offset, end: offset + selected.length };
}

function elementAt(node: Node) { return node instanceof Element ? node : node.parentElement; }

export function formatInline(surface: HTMLElement, action: InlineFormat, markdown: string, toMarkdown: (html: string) => string, toDOM: (text: string) => string): SourceEdit | undefined {
  const { tags, marks, html } = formats[action];
  const markdownMarks = marks.map(mark => [mark, mark] as const);
  const formatSelection = (text: string, start: number, end: number) => {
    const content = renderedText(text, toDOM);
    for (const delimiters of [markdownMarks, [...markdownMarks].reverse(), [html]]) {
      const edit = formatLines(text, start, end, delimiters);
      if (edit && renderedText(edit.text, toDOM) === content) return edit;
    }
  };
  if (surface instanceof HTMLTextAreaElement) {
    const { selectionStart: start, selectionEnd: end, value } = surface;
    if (start !== end) {
      const [left, right] = trimRange(value, start, end);
      if (left < right && !value.slice(left, right).includes('\n')) for (const mark of [...markdownMarks, html]) {
        const edit = removeFormat(value, left, right, left, right, mark);
        if (edit && renderedText(edit.text, toDOM) === renderedText(value, toDOM)) return edit;
      }
      return formatSelection(value, start, end);
    }
    const mark = marks[0];
    if (value.slice(start - mark.length, start + mark.length) === mark + mark) {
      const position = start - mark.length;
      return { text: value.slice(0, position) + value.slice(start + mark.length), start: position, end: position };
    }
    return { text: value.slice(0, start) + mark + mark + value.slice(end), start: start + mark.length, end: start + mark.length };
  }
  const range = getSelection()?.rangeCount ? getSelection()!.getRangeAt(0) : undefined;
  if (!range || !surface.contains(range.commonAncestorContainer) || elementAt(range.startContainer)?.closest('[data-type=code-block],.vditor-ir__preview,.vditor-wysiwyg__preview')) return;
  const existing = elementAt(range.startContainer)?.closest(tags);
  const sameFormat = existing && existing.contains(range.endContainer) ? existing : undefined;
  if (range.collapsed && !sameFormat) {
    const mark = marks[0];
    const placeholder = templateFor(toDOM(mark + zeroWidth + mark)).content.querySelector(tags);
    if (!placeholder) return;
    const wrapper = placeholder.closest('.vditor-ir__node') || placeholder;
    wrapper.classList.add('vm-inline-pending');
    placeholder.textContent = zeroWidth;
    range.insertNode(wrapper);
    range.setStart(placeholder.firstChild!, 1); range.collapse(true);
    return;
  }
  if (range.collapsed && sameFormat) {
    const pending = sameFormat.closest('.vm-inline-pending');
    if (pending && !sameFormat.textContent?.replaceAll(zeroWidth, '').trim()) {
      range.setStartBefore(pending); range.collapse(true);
      pending.remove();
      return;
    }
  }
  const points = [{ node: range.startContainer, offset: range.startOffset }, { node: range.endContainer, offset: range.endOffset }];
  const edges = sameFormat?.hasAttribute('data-vm-inline-format') ? 1 : 0;
  if (sameFormat) points.push({ node: sameFormat, offset: edges }, { node: sameFormat, offset: sameFormat.childNodes.length - edges });
  const offsets = markdownOffsets(surface, toMarkdown, markdown, points);
  if (!offsets) return;
  const [start, end, innerStart, innerEnd] = offsets;
  if (sameFormat) for (const mark of [...markdownMarks, html]) {
    const edit = removeFormat(markdown, start, end, innerStart, innerEnd, mark);
    if (edit && renderedText(edit.text, toDOM) === renderedText(markdown, toDOM)) return edit;
  }
  return start < end ? formatSelection(markdown, start, end) : undefined;
}
