import { templateFor } from './contentMarkup';

const syntax = /[\\`*_~#[\]<>$|&=+^@:-]|[.)]/g;
const blocks = 'p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote';

export function insertLiteralInput(event: InputEvent | CompositionEvent, surface: HTMLElement, toDOM: (text: string) => string, input: () => void) {
  const text = event.data, composition = event.type === 'compositionend';
  if (surface instanceof HTMLTextAreaElement || !surface.contains(event.target as Node)
    || (!composition && (!(event instanceof InputEvent) || !['insertText', 'insertReplacementText'].includes(event.inputType) || event.isComposing || !event.cancelable)) || !text) return;
  const characters = [...text.matchAll(syntax)];
  const multiline = /[\r\n]/.test(text);
  if (!characters.length && !multiline) return;
  const selection = getSelection();
  if (!selection?.rangeCount) return;
  const range = selection.getRangeAt(0).cloneRange();
  if (composition) {
    const { startContainer, startOffset } = range;
    if (!range.collapsed || !(startContainer instanceof Text) || startContainer.data.slice(startOffset - text.length, startOffset) !== text) return;
    range.setStart(startContainer, startOffset - text.length);
  } else if (event instanceof InputEvent && event.inputType === 'insertReplacementText') {
    const target = event.getTargetRanges()[0];
    if (target && surface.contains(target.startContainer) && surface.contains(target.endContainer)) {
      range.setStart(target.startContainer, target.startOffset); range.setEnd(target.endContainer, target.endOffset);
    }
  }
  if (!surface.contains(range.commonAncestorContainer)) return;
  const start = range.startContainer instanceof Element ? range.startContainer : range.startContainer.parentElement;
  const end = range.endContainer instanceof Element ? range.endContainer : range.endContainer.parentElement;
  const excluded = 'code,[data-type=code-block],.vditor-ir__preview,.vditor-wysiwyg__preview,[data-vm-editable]';
  if (start?.closest(excluded) || end?.closest(excluded)) return;
  let prefix = '';
  const block = start?.closest(blocks);
  if (block && /[.)]/.test(text)) {
    const before = document.createRange(); before.selectNodeContents(block); before.setEnd(range.startContainer, range.startOffset);
    prefix = before.toString().replaceAll('\u200b', '');
  }
  const escaped = characters.filter(({ 0: char, index }) => {
    if (char !== '.' && char !== ')') return true;
    const previous = (prefix + text.slice(0, index)).split(/\r\n?|\n/).at(-1)!;
    return /^\s*\d{1,9}$/.test(previous) || (char === '.' && /(?:^|\W)www$/i.test(previous));
  });
  if (!escaped.length && !multiline) return;
  const token = templateFor(toDOM('\\*')).content.querySelector('[data-type=backslash]');
  if (!token?.lastChild) return;
  const fragment = document.createDocumentFragment();
  function appendText(part: string) {
    const lines = part.split(/\r\n?|\n/);
    for (const [index, line] of lines.entries()) {
      if (index) fragment.append(document.createElement('br'));
      if (line) fragment.append(line);
    }
  }
  let offset = 0;
  for (const { 0: char, index } of escaped) {
    if (index > offset) appendText(text.slice(offset, index));
    const literal = token.cloneNode(true);
    literal.lastChild!.textContent = char;
    fragment.append(literal);
    offset = index + char.length;
  }
  if (offset < text.length) appendText(text.slice(offset));
  const caret = document.createTextNode('\u200b');
  fragment.append(caret);
  if (event.cancelable) event.preventDefault();
  event.stopImmediatePropagation();
  range.deleteContents();
  if (range.startContainer === surface) {
    const paragraph = document.createElement('p'); paragraph.dataset.block = '0';
    paragraph.append(fragment); range.insertNode(paragraph);
  } else range.insertNode(fragment);
  range.setStart(caret, 0); range.collapse(true);
  selection.removeAllRanges(); selection.addRange(range);
  input();
}
