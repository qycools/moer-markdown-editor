export function textareaMirror(surface: HTMLTextAreaElement) {
  const mirror = document.createElement('div');
  const style = getComputedStyle(surface);
  for (const key of ['font', 'fontVariantLigatures', 'lineHeight', 'letterSpacing', 'padding', 'boxSizing', 'whiteSpace', 'overflowWrap', 'wordBreak', 'tabSize'] as const) {
    mirror.style[key] = style[key];
  }
  Object.assign(mirror.style, { position: 'fixed', left: '-10000px', top: '0', width: `${surface.clientWidth}px`, visibility: 'hidden' });
  return mirror;
}

export function textareaOffsets(surface: HTMLTextAreaElement, offsets: number[]) {
  if (!offsets.length) return [];
  const mirror = textareaMirror(surface);
  const text = document.createTextNode(surface.value + '\u200b');
  mirror.append(text);
  document.body.append(mirror);
  const origin = mirror.getBoundingClientRect().top;
  const range = document.createRange();
  const positions = offsets.map(offset => {
    range.setStart(text, offset);
    range.collapse(true);
    return range.getBoundingClientRect().top - origin;
  });
  mirror.remove();
  return positions;
}
