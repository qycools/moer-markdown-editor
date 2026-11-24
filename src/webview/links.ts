import { linkLineRange } from '../shared';
import { templateFor } from './contentMarkup';
import { revealElementAtTop } from './documentPositions';
import { headingSelector } from './mindmap';

type Surface = { content: HTMLElement; scroll: HTMLElement };
type Origin = { link: Element; offset: number; top: number };

const linkSelector = 'a[href], [data-type="a"], [data-type="link-ref"], sup[data-type="footnotes-ref"], [data-target-id]';
const referenceSelector = '[data-type="link-ref-defs-block"]';

function decodeFragment(fragment: string) {
  try { return decodeURIComponent(fragment); } catch { return fragment; }
}

function localFragment(href: string, base: string) {
  if (href.startsWith('#')) return href.slice(1);
  try {
    const current = new URL(base), target = new URL(href, current);
    if (target.hash && target.host === current.host && target.protocol === current.protocol
      && decodeFragment(target.pathname) === decodeFragment(current.pathname) && target.search === current.search) return target.hash.slice(1);
  } catch { /* Invalid URLs are handled by the host. */ }
}

function targetById(content: ParentNode, id: string) {
  return content.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"], a[name="${CSS.escape(id)}"]`);
}

function anchorOnly(element: Element) {
  if (element.tagName !== 'P' || !element.querySelector('a[id],a[name],[data-type="html-inline"]')) return false;
  const remaining = element.cloneNode(true) as Element;
  remaining.querySelectorAll('a[id]:empty,a[name]:empty,[data-type="html-inline"],wbr').forEach(node => node.remove());
  return !remaining.textContent?.replaceAll('\u200b', '').trim() && !remaining.querySelector('img,video,audio,svg');
}

function anchorLocation(element: HTMLElement, marker = false) {
  const emptyAnchor = element.matches('a[id]:empty,a[name]:empty');
  if (marker || emptyAnchor) {
    const paragraph = element.closest('p');
    if (paragraph && anchorOnly(paragraph)) {
      let next = paragraph.nextElementSibling;
      while (next && anchorOnly(next)) next = next.nextElementSibling;
      if (next instanceof HTMLElement) return next;
    }
    if (marker) return element.closest('.vm-inline-image')?.querySelector<HTMLElement>('img')
      || element.closest<HTMLElement>('tr,p,li,[data-block]') || element.parentElement;
  }
  return element;
}

function targetFor(content: HTMLElement, id: string, rendered: () => DocumentFragment) {
  const direct = targetById(content, id);
  if (direct) return anchorLocation(direct);

  for (const token of content.querySelectorAll<HTMLElement>('[data-type="html-inline"]')) {
    const markup = token.textContent?.replace(/^\u200b/, '').trim() || '';
    if (/^<[a-z][\w:-]*\s/i.test(markup) && targetById(templateFor(markup).content, id)) return anchorLocation(token, true);
  }

  const headings = [...content.querySelectorAll<HTMLElement>(headingSelector)];
  const explicit = headings.find(heading => heading.dataset.id === `#${id}`
    || heading.querySelector('[data-type="heading-id"]')?.textContent?.trim() === `{#${id}}`);
  if (explicit) return explicit;

  const canonical = [...rendered().querySelectorAll<HTMLElement>(headingSelector)];
  let index = canonical.findIndex(heading => heading.id === id);
  if (index === -1) {
    const match = id.toLowerCase().normalize();
    const slugs = new Set<string>();
    index = canonical.findIndex(heading => {
      const base = (heading.textContent || '').trim().toLowerCase().normalize()
        .replace(/[^\p{L}\p{M}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
      let slug = base;
      for (let suffix = 1; slugs.has(slug); suffix++) slug = `${base}-${suffix}`;
      slugs.add(slug);
      return heading.id.toLowerCase().normalize() === match || slug === match;
    });
  }
  if (index !== -1) return headings[index];
  return headings[canonical.findIndex(heading => heading.id === id.replaceAll('_', '-'))];
}

export function linkDestination(link: Element, content: HTMLElement, toHTML: (text: string) => string) {
  if (link.matches('a[href]')) return link.getAttribute('href');
  const marker = link.querySelector(':scope > .vditor-ir__marker--link');
  if (!link.matches('[data-type="link-ref"]')) return marker?.textContent;
  const label = link.getAttribute('data-link-label') || marker?.textContent?.slice(1, -1) || link.querySelector('.vditor-ir__link')?.textContent;
  const defs = [...content.querySelectorAll(referenceSelector)].map(block => block.textContent).join('\n');
  if (label && defs) {
    return templateFor(toHTML(`[link][${label}]\n\n${defs}`)).content.querySelector('a[href]')?.getAttribute('href');
  }
}

export function installLinks(options: {
  surface: () => Surface | undefined;
  preview: () => Surface | undefined;
  base: string;
  markdown: () => string;
  markdownToHTML: (text: string) => string;
  open: (href: string) => void;
  historyChanged: (canGoBack: boolean) => void;
  missing: (id: string) => void;
}) {
  const histories = new WeakMap<HTMLElement, Origin[]>();
  let canGoBack: boolean | undefined;
  const hint = document.createElement('span');
  hint.className = 'vm-link-hint'; hint.setAttribute('role', 'tooltip');
  hint.textContent = 'Ctrl 键点击跳转链接';
  let hinted: Element | undefined;

  function linkAt(target: Element) {
    const preview = options.preview();
    const surface = preview?.content.contains(target) ? preview : options.surface();
    const link = target.closest(linkSelector) || (surface === preview && target.closest('img[src]:not(.emoji,.vditor-emoji)'));
    return surface && link && surface.content.contains(link) ? { surface, link } : undefined;
  }
  function hideHint() { hint.remove(); hinted = undefined; }
  document.addEventListener('pointerover', event => {
    if (!(event.target instanceof Element) || event.pointerType === 'touch') return;
    const match = linkAt(event.target);
    if (!match || event.target.closest('.vditor-outline__action')) return;
    if (hinted === match.link) return;
    hinted = match.link; document.body.append(hint);
    const rect = match.link.getBoundingClientRect();
    hint.style.left = `${Math.max(4, Math.min(event.clientX, innerWidth - hint.offsetWidth - 4))}px`;
    hint.style.top = `${rect.top >= hint.offsetHeight + 6 ? rect.top - hint.offsetHeight - 4 : rect.bottom + 4}px`;
  });
  document.addEventListener('pointerout', event => { if (hinted && !(event.relatedTarget instanceof Node && hinted.contains(event.relatedTarget))) hideHint(); });
  document.addEventListener('scroll', hideHint, true);
  window.addEventListener('blur', hideHint);

  function refresh() {
    const surface = options.surface();
    const available = !!(surface && histories.get(surface.scroll)?.length);
    if (available !== canGoBack) {
      canGoBack = available;
      options.historyChanged(available);
    }
  }

  function back() {
    const surface = options.surface();
    const origin = surface && histories.get(surface.scroll)?.pop();
    if (!surface || !origin) return;
    const { content, scroll } = surface;
    scroll.scrollTop = content.contains(origin.link) && origin.link.getClientRects().length
      ? scroll.scrollTop + origin.link.getBoundingClientRect().top - scroll.getBoundingClientRect().top - origin.offset
      : origin.top;
    refresh();
  }

  const resolve = (content: HTMLElement, id: string) => targetFor(content, id, () => templateFor(options.markdownToHTML(options.markdown())).content);
  function revealAnchor(id: string) {
    const surface = options.surface();
    if (!surface) return;
    const target = resolve(surface.content, id);
    if (target) revealElementAtTop(target, surface.scroll);
    else options.missing(id);
  }

  function follow(event: MouseEvent) {
    if (event.button !== (event.type === 'auxclick' ? 1 : 0) || !(event.target instanceof Element)) return;
    const match = linkAt(event.target);
    if (!match) return;
    const { surface, link } = match;
    const { content, scroll } = surface;
    const toc = link.closest('.vditor-toc') && link.getAttribute('data-target-id');
    if (toc && event.target.closest('.vditor-outline__action')) return;
    const footnote = link.getAttribute('data-footnotes-label');
    const href = toc || footnote ? undefined : (link.matches('img')
      ? link.getAttribute('data-src') || link.getAttribute('src')
      : linkDestination(link, content, options.markdownToHTML))?.trim();
    if (!toc && !footnote && !href) return;
    event.preventDefault();
    if (!event.ctrlKey) return;
    event.stopImmediatePropagation();
    hideHint();

    const fragment = href === undefined ? undefined : localFragment(href, options.base);
    if (href !== undefined && fragment === undefined) { if (!/^(data|blob):/i.test(href)) options.open(href); return; }

    const id = toc || footnote || decodeFragment(fragment!);
    const target = footnote
      ? [...content.querySelectorAll<HTMLElement>('[data-type="footnotes-li"], [data-type="footnotes-def"]')].find(note =>
          note.getAttribute('data-marker') === footnote || note.firstChild?.textContent?.trim().startsWith(`[${footnote}]:`))
      : id && resolve(content, id);
    if (id && !target) {
      if (href !== undefined && linkLineRange(id)) options.open(href);
      else options.missing(id);
      return;
    }

    const viewportTop = scroll.getBoundingClientRect().top;
    const history = histories.get(scroll) || [];
    history.push({ link, offset: link.getBoundingClientRect().top - viewportTop, top: scroll.scrollTop });
    if (history.length > 100) history.shift();
    histories.set(scroll, history);
    scroll.scrollTop = target ? scroll.scrollTop + target.getBoundingClientRect().top - viewportTop - 16 : 0;
    refresh();
  }
  document.addEventListener('click', follow, true);
  document.addEventListener('auxclick', follow, true);

  return { back, refresh, revealAnchor };
}
