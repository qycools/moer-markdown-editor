import { headingSelector } from './mindmap';
import { textareaMirror } from './textareaMirror';
import { scanSearch, searchWorker } from './searchPattern';

const blockSelector = `p,pre,li,td,th,${headingSelector},[data-block]`;
const previewSelector = '.vditor-ir__preview,.vditor-wysiwyg__preview';
const codePreviewSelector = 'pre:has(>code)';
const skipped = '[hidden],script,style,.vm-color-token,.vditor-copy,[data-moye-table],[data-type=html-inline],[data-type=backslash]>span';
const zeroWidth = '\u200b';
const inlineFormat = 'strong,b,em,i,s,strike,del,a,code,.vditor-ir__link,[data-type=link-ref]';

type Part = { node: Text; offset: number; start: number; end: number };
type Section = { text: string; parts: Part[]; source?: Element };
type Match = { section: Section; start: number; end: number; replacement?: string };
type Seed = { text: string; includes: (match: Match) => boolean };

function sections(surface: HTMLElement): Section[] {
  if (surface instanceof HTMLTextAreaElement) return [{ text: surface.value, parts: [] }];
  const result: Section[] = [];
  let block: Element | null = null;
  let section: Section | undefined;
  const walker = document.createTreeWalker(surface, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, node => {
    if (!(node instanceof Element)) return NodeFilter.FILTER_ACCEPT;
    if (node.matches(skipped) || (node instanceof HTMLElement && node.style.display === 'none')) return NodeFilter.FILTER_REJECT;
    if (node.matches(previewSelector) && getComputedStyle(node).display === 'none') return NodeFilter.FILTER_REJECT;
    if (node.matches('.vditor-ir__marker') && (!node.matches('pre') || !node.parentElement?.classList.contains('vditor-ir__node--expand'))) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  });
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node instanceof Element) {
      if (node.matches(`br,img,hr,${previewSelector}`)) section = undefined;
      continue;
    }
    if (!(node instanceof Text) || !node.parentElement) continue;
    const parent = node.parentElement;
    const preview = parent.closest(previewSelector);
    if (preview && !preview.matches(codePreviewSelector)) continue;
    const owner = parent.closest(blockSelector);
    if (!owner || !surface.contains(owner)) continue;
    if (owner !== block || !section) {
      block = owner;
      const source = preview?.matches('pre') ? preview.previousElementSibling?.querySelector(':scope>code') : undefined;
      if (preview && !source) continue;
      section = { text: '', parts: [], source: source ?? undefined };
      result.push(section);
    }
    for (const part of node.data.matchAll(/[^\u200b]+/g)) {
      const start = section.text.length;
      section.text += part[0];
      section.parts.push({ node, offset: part.index, start, end: section.text.length });
    }
  }
  return result.filter(({ text, source }) => !source || text === source.textContent?.replaceAll(zeroWidth, ''));
}

function* overlappingParts({ section, start, end }: Match) {
  const parts = section.parts;
  let left = 0, right = parts.length;
  while (left < right) {
    const middle = (left + right) >>> 1;
    if (parts[middle].end <= start) left = middle + 1;
    else right = middle;
  }
  for (let i = left; i < parts.length && parts[i].start < end; i++) {
    const part = parts[i];
    yield { node: part.node, start: part.offset + Math.max(0, start - part.start), end: part.offset + Math.min(part.end, end) - part.start };
  }
}

function editorSelection(surface?: HTMLElement): Seed | undefined {
  if (!surface?.contains(document.activeElement)) return;
  let seed: Seed;
  if (surface instanceof HTMLTextAreaElement) {
    const { selectionStart, selectionEnd, value } = surface;
    seed = { text: value.slice(selectionStart, selectionEnd), includes: match => match.start === selectionStart };
  } else {
    const selection = getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0).cloneRange();
    if (!surface.contains(range.commonAncestorContainer)) return;
    seed = { text: selection.toString().replaceAll(zeroWidth, ''), includes: match => {
      const part = overlappingParts(match).next().value;
      return !!part && range.comparePoint(part.node, part.start) === 0 && range.comparePoint(part.node, part.end) === 0;
    } };
  }
  if (seed.text.trim() && !/[\r\n]/.test(seed.text)) return seed;
}

function textRange(node: Text, start: number, end: number) {
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, end);
  return range;
}

function revealIn(scroller: HTMLElement, rect: DOMRect, vertical: boolean, horizontal: boolean) {
  const bounds = scroller.getBoundingClientRect();
  if (vertical && scroller.scrollHeight > scroller.clientHeight) {
    scroller.scrollTop += rect.top + rect.height / 2 - bounds.top - scroller.clientTop - scroller.clientHeight / 2;
  }
  if (horizontal && scroller.scrollWidth > scroller.clientWidth) {
    const left = bounds.left + scroller.clientLeft;
    const right = left + scroller.clientWidth;
    if (rect.left < left || rect.right > right) scroller.scrollLeft += rect.left < left ? rect.left - left : rect.right - right;
  }
}

function revealRich(surface: HTMLElement, range: Range) {
  const wrapper = surface.parentElement;
  for (let element = range.startContainer.parentElement; element; element = element.parentElement) {
    const rect = range.getClientRects()[0];
    if (!rect?.height) return;
    if (element === surface) {
      revealIn(element, rect, true, true);
    } else if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
      const style = getComputedStyle(element);
      revealIn(element, rect, /^(auto|scroll)$/.test(style.overflowY), /^(auto|scroll)$/.test(style.overflowX));
    }
    if (element === wrapper) return;
  }
}

function replaceText(text: string, start: number, end: number, value: string) {
  return text.slice(0, start) + value + text.slice(end);
}

function replaceRich(match: Match, value: string, formats: Set<Element>) {
  const source = match.section.source;
  if (source) {
    const text = source.textContent || '';
    const offset = (position: number) => {
      let raw = 0;
      while (raw < text.length && (position || text[raw] === zeroWidth)) {
        if (text[raw] !== zeroWidth) position--;
        raw++;
      }
      return raw;
    };
    const start = text.includes(zeroWidth) ? offset(match.start) : match.start;
    const end = text.includes(zeroWidth) ? offset(match.end) : match.end;
    source.textContent = replaceText(text, start, end, value);
    return;
  }
  const parts = [...overlappingParts(match)];
  for (let i = parts.length - 1; i >= 0; i--) {
    const { node, start, end } = parts[i];
    const escaped = node.parentElement;
    if (escaped?.matches('[data-type=backslash]')) {
      escaped.firstElementChild?.remove();
      escaped.replaceWith(...escaped.childNodes);
    }
    const inCode = !!node.parentElement?.closest('code');
    const inserted = inCode ? value : value.replace(/[\\`*_[\]<>#+.!|~$=&-]/g, '\\$&');
    node.replaceData(start, end - start, i === 0 ? inserted : '');
    for (let parent = node.parentElement; parent && !parent.matches(blockSelector); parent = parent.parentElement) {
      if (parent.matches(inlineFormat)) formats.add(parent);
    }
  }
}

function removeEmptyFormats(formats: Set<Element>) {
  for (const element of formats) {
    if (element.textContent?.replaceAll(zeroWidth, '') || element.querySelector('img,svg,br,video,audio,input')) continue;
    const wrapper = element.parentElement;
    if (wrapper?.matches('.vditor-ir__node')) wrapper.remove();
    else element.remove();
  }
}

export function installSearch(toolbar: HTMLElement, options: {
  surface: () => HTMLElement | undefined;
  commit: (text?: string) => void;
}) {
  const anchor = document.createElement('div');
  anchor.className = 'vm-search-anchor';
  anchor.innerHTML = `<section id="search-bar" role="search" aria-label="查找和替换">
    <div class="vm-search-row">
      <button type="button" id="search-toggle-replace" aria-expanded="false" aria-controls="search-replace-row" aria-label="展开替换" title="展开替换">›</button>
      <input id="search-input" type="search" placeholder="查找" aria-label="查找" aria-describedby="search-error">
      <label class="vm-search-case" title="区分大小写"><input type="checkbox" id="search-case" aria-label="区分大小写"><span>Aa</span></label>
      <label class="vm-search-case" title="全词匹配"><input type="checkbox" id="search-word" aria-label="全词匹配"><span>W</span></label>
      <label class="vm-search-case" title="使用正则表达式"><input type="checkbox" id="search-regex" aria-label="使用正则表达式"><span>.*</span></label>
      <output id="search-count" aria-live="polite">0 / 0</output>
      <button type="button" id="search-prev" aria-label="上一处" title="上一处（Shift+Enter）">↑</button>
      <button type="button" id="search-next" aria-label="下一处" title="下一处（Enter）">↓</button>
      <button type="button" id="search-close" aria-label="关闭查找" title="关闭（Esc）">×</button>
    </div>
    <div id="search-replace-row" class="vm-search-row" hidden>
      <input id="search-replacement" type="text" placeholder="替换为" aria-label="替换为">
      <button type="button" id="search-replace">替换</button>
      <button type="button" id="search-replace-all">全部替换</button>
    </div>
    <p id="search-error" class="vm-search-error" role="status" hidden></p>
  </section>`;
  const find = anchor.querySelector<HTMLInputElement>('#search-input')!;
  const replacement = anchor.querySelector<HTMLInputElement>('#search-replacement')!;
  const matchCase = anchor.querySelector<HTMLInputElement>('#search-case')!;
  const wholeWord = anchor.querySelector<HTMLInputElement>('#search-word')!;
  const regex = anchor.querySelector<HTMLInputElement>('#search-regex')!;
  const error = anchor.querySelector<HTMLElement>('#search-error')!;
  const count = anchor.querySelector<HTMLOutputElement>('#search-count')!;
  const toggle = anchor.querySelector<HTMLButtonElement>('#search-toggle-replace')!;
  const row = anchor.querySelector<HTMLElement>('#search-replace-row')!;
  const prev = anchor.querySelector<HTMLButtonElement>('#search-prev')!;
  const next = anchor.querySelector<HTMLButtonElement>('#search-next')!;
  const replace = anchor.querySelector<HTMLButtonElement>('#search-replace')!;
  const replaceAll = anchor.querySelector<HTMLButtonElement>('#search-replace-all')!;
  let index = 0, scheduled = false;
  let cancelSearch: (() => void) | undefined;
  const observer = new MutationObserver(refresh);
  const sourceResize = new ResizeObserver(refresh);
  const sourceLayer = document.createElement('div');
  sourceLayer.className = 'vm-find-source';
  sourceLayer.setAttribute('aria-hidden', 'true');
  let observed: HTMLElement | undefined;
  let mirror: HTMLElement | undefined;
  let sourceText: Text | undefined;
  let sourceWidth = 0;

  function positionSource() {
    if (!(observed instanceof HTMLTextAreaElement) || !mirror) return;
    const { left, top } = observed.getBoundingClientRect();
    Object.assign(sourceLayer.style, {
      left: `${left + observed.clientLeft}px`, top: `${top + observed.clientTop}px`,
      width: `${observed.clientWidth}px`, height: `${observed.clientHeight}px`,
    });
    mirror.style.transform = `translate(${-observed.scrollLeft}px, ${-observed.scrollTop}px)`;
  }

  function observe(surface?: HTMLElement) {
    if (observed === surface) return;
    observer.disconnect(); sourceResize.disconnect();
    observed?.removeEventListener('scroll', positionSource);
    sourceLayer.remove(); sourceLayer.replaceChildren(); mirror = undefined; sourceText = undefined;
    observed = surface;
    if (surface instanceof HTMLTextAreaElement) {
      surface.addEventListener('scroll', positionSource);
      sourceResize.observe(surface);
    } else if (surface) {
      observer.observe(surface, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    }
  }

  function matches(surface: HTMLElement, done: (found: Match[]) => void, value?: string) {
    cancelSearch?.();
    const snapshot = find.value ? sections(surface) : [];
    const args = [snapshot.map(section => section.text), find.value, regex.checked, matchCase.checked, wholeWord.checked, value] as const;
    const finish = (hits: ReturnType<typeof scanSearch>, message = '') => {
      error.textContent = message;
      error.hidden = !message;
      find.setAttribute('aria-invalid', String(!!message));
      done(hits.map(hit => ({ ...hit, section: snapshot[hit.section] })));
    };
    if (!regex.checked || !find.value) { finish(scanSearch(...args)); return; }
    try { new RegExp(find.value, 'u'); }
    catch { finish([], '正则表达式无效'); return; }
    let worker: Worker;
    try { worker = searchWorker(); }
    catch { finish([], '无法启动正则搜索'); return; }
    const dispose = () => { clearTimeout(timeout); worker.terminate(); cancelSearch = undefined; };
    const timeout = window.setTimeout(() => { dispose(); finish([], '正则搜索超时，请缩小匹配范围'); }, 750);
    cancelSearch = dispose;
    worker.onmessage = event => {
      dispose();
      if (surface !== options.surface() || !anchor.isConnected) return;
      finish(event.data ?? [], event.data ? '' : '无法完成正则搜索');
    };
    worker.onerror = () => { dispose(); finish([], '无法完成正则搜索'); };
    worker.postMessage(args);
  }
  function update(direction = 0, reveal = false, afterReplace?: number, seed?: Seed) {
    const surface = options.surface();
    if (!anchor.isConnected || !surface) return;
    observe(surface);
    matches(surface, found => render(surface, found, direction, reveal, afterReplace, seed));
  }
  function render(surface: HTMLElement, found: Match[], direction: number, reveal: boolean, afterReplace?: number, seed?: Seed) {
    const total = found.length;
    if (seed) index = Math.max(0, found.findIndex(seed.includes));
    if (afterReplace !== undefined) index += Math.max(0, total - afterReplace + 1);
    index = total ? (direction || afterReplace !== undefined ? (index + direction + total) % total : Math.min(index, total - 1)) : 0;
    const label = `${total ? index + 1 : 0} / ${total}`;
    if (count.value !== label) count.value = label;
    for (const button of [prev, next, replace, replaceAll]) button.disabled = !total;
    clearHighlights();
    if (!total) { sourceLayer.remove(); return; }
    const source = surface instanceof HTMLTextAreaElement;
    if (source) {
      if (!mirror || sourceWidth !== surface.clientWidth || !reveal) {
        mirror = textareaMirror(surface);
        Object.assign(mirror.style, { position: 'absolute', left: '0', visibility: 'visible' });
        sourceText = document.createTextNode(surface.value + zeroWidth);
        mirror.append(sourceText);
        sourceLayer.replaceChildren(mirror);
        sourceWidth = surface.clientWidth;
      } else if (sourceText!.data !== surface.value + zeroWidth) sourceText!.data = surface.value + zeroWidth;
      if (!sourceLayer.isConnected) document.body.append(sourceLayer);
      positionSource();
    }
    const current = new Highlight(), others = new Highlight();
    let active: Range | undefined;
    for (const [position, match] of found.entries()) {
      const highlight = position === index ? current : others;
      const parts = source ? [{ node: sourceText!, start: match.start, end: match.end }] : overlappingParts(match);
      for (const part of parts) {
        const range = textRange(part.node, part.start, part.end);
        highlight.add(range);
        if (position === index) active ??= range;
      }
    }
    CSS.highlights.set('vm-find-other', others);
    CSS.highlights.set('vm-find', current);
    if (reveal && active) {
      if (source) {
        const rect = active.getClientRects()[0];
        if (rect?.height) revealIn(surface, rect, true, true);
        positionSource();
      } else revealRich(surface, active);
    }
  }
  function clearHighlights() {
    CSS.highlights.delete('vm-find');
    CSS.highlights.delete('vm-find-other');
  }
  function refresh() {
    if (!scheduled && anchor.isConnected) {
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; update(); });
    }
  }
  function perform(all: boolean) {
    const surface = options.surface();
    if (!surface) return;
    matches(surface, found => applyMatches(surface, found, all), replacement.value);
  }
  function applyMatches(surface: HTMLElement, found: Match[], all: boolean) {
    const current = found[Math.min(index, found.length - 1)];
    if (!current) return;
    const chosen = all ? found : [current];
    if (surface instanceof HTMLTextAreaElement) {
      let text = surface.value;
      for (const match of chosen.reverse()) text = replaceText(text, match.start, match.end, match.replacement ?? '');
      options.commit(text);
    } else {
      const formats = new Set<Element>();
      for (const match of chosen.reverse()) replaceRich(match, match.replacement ?? '', formats);
      removeEmptyFormats(formats);
      options.commit();
    }
    update(0, !all, all ? undefined : found.length);
  }
  function close() {
    cancelSearch?.();
    observe();
    clearHighlights();
    anchor.remove();
    options.surface()?.focus({ preventScroll: true });
  }
  function reset() { index = 0; update(0, true); }
  toggle.onclick = () => {
    row.hidden = !row.hidden;
    const label = row.hidden ? '展开替换' : '收起替换';
    toggle.setAttribute('aria-expanded', String(!row.hidden));
    toggle.setAttribute('aria-label', label); toggle.title = label;
    (row.hidden ? find : replacement).focus();
  };
  find.oninput = reset;
  for (const option of [matchCase, wholeWord, regex]) option.onchange = reset;
  prev.onclick = () => update(-1, true);
  next.onclick = () => update(1, true);
  replace.onclick = () => perform(false);
  replaceAll.onclick = () => perform(true);
  anchor.querySelector<HTMLButtonElement>('#search-close')!.onclick = close;
  anchor.addEventListener('mousedown', event => {
    if (event.target instanceof HTMLButtonElement) event.preventDefault();
  });
  anchor.addEventListener('keydown', event => {
    if (event.isComposing) return;
    if (event.key === 'Escape') {
      event.preventDefault(); event.stopPropagation(); close();
    } else if (event.key === 'Enter' && event.target === find) {
      event.preventDefault(); update(event.shiftKey ? -1 : 1, true);
    } else if (event.key === 'Enter' && event.target === replacement) {
      event.preventDefault(); perform(false);
    }
  });
  return {
    show() {
      const seed = editorSelection(options.surface());
      if (!anchor.isConnected) toolbar.after(anchor);
      if (seed) {
        find.value = seed.text;
        regex.checked = false;
      }
      find.focus({ preventScroll: true }); find.select(); update(0, true, undefined, seed);
    },
    refresh,
  };
}
