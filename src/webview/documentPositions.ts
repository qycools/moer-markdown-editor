import DiffMatchPatch from 'diff-match-patch';
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

export function selectMarkdownRange(surface: HTMLElement, markdown: string, toDOM: Convert, start: number, end: number, reveal = false) {
  if (surface instanceof HTMLTextAreaElement) {
    surface.setSelectionRange(start, end);
    if (reveal) surface.scrollTop = textareaOffsets(surface, [start])[0] - surface.clientHeight / 2;
    return;
  }
  const range = visualRange(surface, markdown, toDOM, start, end);
  const parent = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
  if (!parent?.closest('.vditor-ir__preview,.vditor-wysiwyg__preview')) {
    const selection = getSelection()!;
    selection.removeAllRanges(); selection.addRange(range);
  }
  if (reveal) {
    const rect = range.getBoundingClientRect();
    const top = rect.height ? rect.top : parent?.getBoundingClientRect().top;
    if (top !== undefined) surface.scrollTop += top - surface.getBoundingClientRect().top - surface.clientHeight / 2;
  }
}
