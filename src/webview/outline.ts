import { escapeHTML } from '../shared';
import { templateFor } from './contentMarkup';
import { headingSelector } from './mindmap';
import { textareaOffsets } from './textareaMirror';

type SourceHeading = { start: number; end: number };
type HeadingPosition = { index: number; top: number; source?: SourceHeading };

function sourceHeadings(markdown: string, frontMatter: boolean): SourceHeading[] {
  const headings: SourceHeading[] = [];
  let fence = '', offset = 0;
  let paragraph: SourceHeading | undefined;
  for (const line of markdown.split('\n')) {
    const range = { start: offset, end: offset + line.length };
    offset = range.end + 1;
    if (frontMatter) {
      if (range.start && /^---[ \t]*$/.test(line)) frontMatter = false;
      continue;
    }
    const content = line.replace(/^(?: {0,3}>[ \t]?)+/, '').replace(/^ {0,3}(?:[-+*]|\d{1,9}[.)])[ \t]+/, '');
    const marker = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(content);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim()) fence = '';
      continue;
    }
    if (marker) {
      fence = marker[1]; paragraph = undefined;
    } else if (/^ {0,3}(?:#{1,6}(?:[ \t]+|$)|<h[1-6][\s>])/i.test(content)) {
      headings.push(range); paragraph = undefined;
    } else if (paragraph && /^ {0,3}(?:=+|-+)[ \t]*$/.test(content)) {
      headings.push(paragraph); paragraph = undefined;
    } else if (!content.trim() || /^(?: {4}|\t)|^ {0,3}(?:-{3,}|\*{3,}|_{3,})[ \t]*$/.test(content)) {
      paragraph = undefined;
    } else {
      paragraph ??= range;
    }
  }
  return headings;
}

function measureSourceHeadings(surface: HTMLTextAreaElement, frontMatter: boolean): HeadingPosition[] {
  const headings = sourceHeadings(surface.value, frontMatter);
  const positions = textareaOffsets(surface, headings.map(heading => heading.start));
  return headings.map((source, index) => ({ index, source, top: positions[index] }));
}

export function installOutline(outline: HTMLElement, surfaces: HTMLElement[], options: {
  surface: () => HTMLElement | undefined;
  markdown: () => string;
  markdownToHTML: (text: string) => string;
}) {
  let entries: HTMLButtonElement[] = [], active: HTMLButtonElement | undefined;
  let renderedText: string | undefined;
  let frontMatter = false;
  let sourceLayout: { text: string; positions: HeadingPosition[] } | undefined;
  let scheduled = false;
  const readingOffset = (surface: HTMLElement) => Math.min(52, surface.clientHeight / 3);

  function positions(surface: HTMLElement): HeadingPosition[] {
    if (surface instanceof HTMLTextAreaElement) {
      if (sourceLayout?.text !== surface.value) sourceLayout = { text: surface.value, positions: measureSourceHeadings(surface, frontMatter) };
      return sourceLayout.positions;
    }
    const origin = surface.getBoundingClientRect().top + surface.clientTop - surface.scrollTop;
    return [...surface.querySelectorAll(headingSelector)].flatMap((heading, index) => {
      const rect = heading.getBoundingClientRect();
      return rect.height ? [{ index, top: rect.top - origin }] : [];
    });
  }

  function setCurrent(entry?: HTMLButtonElement) {
    if (entry === active) return;
    active?.removeAttribute('aria-current');
    active = entry;
    if (!entry) return;
    entry.setAttribute('aria-current', 'location');
    const row = entry.getBoundingClientRect(), panel = outline.getBoundingClientRect();
    const top = panel.top + outline.clientTop, bottom = top + outline.clientHeight;
    if (row.top < top) outline.scrollTop += row.top - top;
    else if (row.bottom > bottom) outline.scrollTop += row.bottom - bottom;
  }

  function sync() {
    scheduled = false;
    const surface = options.surface();
    if (outline.hidden || !surface || !entries.length) { setCurrent(); return; }
    const at = surface.scrollTop + readingOffset(surface);
    const end = surface.scrollHeight - surface.clientHeight;
    const atBottom = end > 1 && surface.scrollTop >= end - 1;
    let current = -1, nearest = -Infinity;
    for (const { index, top } of positions(surface)) {
      if (index >= entries.length) continue;
      if (atBottom || (top <= at && top >= nearest)) { current = index; nearest = top; }
    }
    setCurrent(entries[current]);
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(sync); }
  }
  function refresh() {
    sourceLayout = undefined;
    if (outline.hidden) setCurrent();
    else schedule();
  }
  function render() {
    const markdown = options.markdown();
    if (markdown !== renderedText) {
      renderedText = markdown;
      const content = templateFor(options.markdownToHTML(markdown)).content;
      frontMatter = content.firstElementChild?.classList.contains('vditor-yml-front-matter') ?? false;
      const headings = [...content.querySelectorAll(headingSelector)];
      outline.innerHTML = `<div class="outline-title">文档大纲 <span>${headings.length}</span></div>${headings.length ? headings.map((heading, index) => `<button type="button" data-heading="${index}" style="--level:${heading.tagName[1]}">${escapeHTML(heading.textContent || '未命名标题')}</button>`).join('') : '<p class="muted">使用标题组织文档</p>'}`;
      entries = [...outline.querySelectorAll<HTMLButtonElement>('[data-heading]')];
    }
    refresh();
  }

  outline.addEventListener('click', event => {
    const clicked = (event.target as Element).closest<HTMLButtonElement>('[data-heading]');
    const surface = options.surface();
    if (!clicked || !surface) return;
    const target = positions(surface).find(position => position.index === Number(clicked.dataset.heading));
    if (!target) return;
    const end = surface.scrollHeight - surface.clientHeight;
    const top = Math.min(end, Math.max(0, target.top - readingOffset(surface) + 1));
    if (surface instanceof HTMLTextAreaElement && target.source) {
      surface.focus({ preventScroll: true });
      surface.setSelectionRange(target.source.start, target.source.end);
    }
    if (Math.abs(surface.scrollTop - top) <= 1) setCurrent(clicked);
    else surface.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });

  const resize = new ResizeObserver(refresh);
  const changes = new MutationObserver(schedule);
  for (const surface of surfaces) {
    surface.addEventListener('scroll', () => { if (surface === options.surface() && !outline.hidden) schedule(); }, { passive: true });
    surface.addEventListener('load', schedule, true);
    resize.observe(surface);
    if (!(surface instanceof HTMLTextAreaElement)) changes.observe(surface, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style', 'open'] });
  }
  return { render, refresh };
}
