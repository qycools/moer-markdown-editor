import { headingSelector } from './mindmap';

const blockSelector = `p,pre,li,td,th,${headingSelector},[data-block]`;
const previewSelector = '.vditor-ir__preview,.vditor-wysiwyg__preview';
const codePreviewSelector = 'pre:has(>code)';
const skipped = '[hidden],script,style,.vm-color-token,.vditor-copy,[data-moye-table],[data-type=html-inline],[data-type=backslash]>span';
const zeroWidth = '\u200b';
const inlineFormat = 'strong,b,em,i,s,strike,del,a,code,.vditor-ir__link,[data-type=link-ref]';

type Part = { node: Text; offset: number; start: number; end: number };
type Section = { text: string; parts: Part[]; source?: Element };
type Match = { section: Section; start: number; end: number };

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
  lineHeight: () => number;
  commit: (text?: string) => void;
}) {
  const anchor = document.createElement('div');
  anchor.className = 'vm-search-anchor';
  anchor.innerHTML = `<section id="search-bar" role="search" aria-label="查找和替换">
    <div class="vm-search-row">
      <button type="button" id="search-toggle-replace" aria-expanded="false" aria-controls="search-replace-row" aria-label="展开替换" title="展开替换">›</button>
      <input id="search-input" type="search" placeholder="查找" aria-label="查找">
      <label class="vm-search-case" title="区分大小写"><input type="checkbox" id="search-case" aria-label="区分大小写"><span>Aa</span></label>
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
  </section>`;
  const find = anchor.querySelector<HTMLInputElement>('#search-input')!;
  const replacement = anchor.querySelector<HTMLInputElement>('#search-replacement')!;
  const matchCase = anchor.querySelector<HTMLInputElement>('#search-case')!;
  const count = anchor.querySelector<HTMLOutputElement>('#search-count')!;
  const toggle = anchor.querySelector<HTMLButtonElement>('#search-toggle-replace')!;
  const row = anchor.querySelector<HTMLElement>('#search-replace-row')!;
  const prev = anchor.querySelector<HTMLButtonElement>('#search-prev')!;
  const next = anchor.querySelector<HTMLButtonElement>('#search-next')!;
  const replace = anchor.querySelector<HTMLButtonElement>('#search-replace')!;
  const replaceAll = anchor.querySelector<HTMLButtonElement>('#search-replace-all')!;
  let index = 0, scheduled = false;
  const observer = new MutationObserver(refresh);
  let observed: HTMLElement | undefined;

  function matches(surface: HTMLElement): Match[] {
    if (!find.value) return [];
    const pattern = new RegExp(find.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), matchCase.checked ? 'gu' : 'giu');
    return sections(surface).flatMap(section => [...section.text.matchAll(pattern)].map(match => ({
      section, start: match.index, end: match.index + match[0].length,
    })));
  }
  function update(direction = 0, reveal = false, afterReplace?: number) {
    const surface = options.surface();
    if (!anchor.isConnected || !surface) return;
    if (observed !== surface) {
      observer.disconnect();
      observer.observe(surface, { childList: true, subtree: true, characterData: true });
      observed = surface;
    }
    const found = matches(surface), total = found.length;
    if (afterReplace !== undefined) index += Math.max(0, total - afterReplace + 1);
    index = total ? (direction || afterReplace !== undefined ? (index + direction + total) % total : Math.min(index, total - 1)) : 0;
    const label = `${total ? index + 1 : 0} / ${total}`;
    if (count.value !== label) count.value = label;
    for (const button of [prev, next, replace, replaceAll]) button.disabled = !total;
    CSS.highlights?.delete('vm-find');
    const match = found[index];
    if (!match) return;
    if (surface instanceof HTMLTextAreaElement) {
      if (reveal || document.activeElement !== surface) surface.setSelectionRange(match.start, match.end);
      if (reveal) {
        const line = match.section.text.slice(0, match.start).split('\n').length - 1;
        surface.scrollTop = Math.max(0, line * options.lineHeight() - surface.clientHeight / 2);
      }
    } else {
      const parts = [...overlappingParts(match)];
      const first = parts[0], last = parts.at(-1)!;
      const range = document.createRange();
      range.setStart(first.node, first.start); range.setEnd(last.node, last.end);
      if (CSS.highlights) CSS.highlights.set('vm-find', new Highlight(range));
      if (reveal) first.node.parentElement?.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
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
    const found = matches(surface);
    const current = found[Math.min(index, found.length - 1)];
    if (!current) return;
    const chosen = all ? found : [current];
    if (surface instanceof HTMLTextAreaElement) {
      let text = surface.value;
      for (const match of chosen.reverse()) text = replaceText(text, match.start, match.end, replacement.value);
      options.commit(text);
    } else {
      const formats = new Set<Element>();
      for (const match of chosen.reverse()) replaceRich(match, replacement.value, formats);
      removeEmptyFormats(formats);
      options.commit();
    }
    update(0, !all, all ? undefined : found.length);
  }
  function close() {
    observer.disconnect(); observed = undefined;
    CSS.highlights?.delete('vm-find');
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
  matchCase.onchange = reset;
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
      if (!anchor.isConnected) toolbar.after(anchor);
      find.focus(); find.select(); update(0, true);
    },
    refresh,
  };
}
