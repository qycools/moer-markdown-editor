import { templateFor } from './contentMarkup';
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

function targetById(content: HTMLElement, id: string) {
  return content.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"], a[name="${CSS.escape(id)}"]`);
}

function targetFor(content: HTMLElement, id: string, rendered: () => DocumentFragment) {
  const direct = targetById(content, id);
  if (direct) return direct;

  for (const token of content.querySelectorAll<HTMLElement>('[data-type="html-inline"]')) {
    const markup = token.textContent?.replace(/^\u200b/, '').trim() || '';
    if (!/^<a\s/i.test(markup)) continue;
    const anchor = templateFor(markup).content.querySelector('a');
    if (anchor?.id === id || anchor?.getAttribute('name') === id) return token.closest<HTMLElement>('[data-block="0"]') || token.parentElement;
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

function linkDestination(link: Element, content: HTMLElement, toHTML: (text: string) => string) {
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
  base: string;
  markdown: () => string;
  markdownToHTML: (text: string) => string;
  open: (href: string) => void;
  historyChanged: (canGoBack: boolean) => void;
  missing: (id: string) => void;
}) {
  const histories = new WeakMap<HTMLElement, Origin[]>();
  let canGoBack: boolean | undefined;

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

  document.addEventListener('click', event => {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const surface = options.surface();
    const link = event.target.closest(linkSelector);
    if (!surface || !link || !surface.content.contains(link)) return;
    const { content, scroll } = surface;
    const toc = link.closest('.vditor-toc') && link.getAttribute('data-target-id');
    if (toc && event.target.closest('.vditor-outline__action')) return;
    const footnote = link.getAttribute('data-footnotes-label');
    const href = toc || footnote ? undefined : linkDestination(link, content, options.markdownToHTML)?.trim();
    if (!toc && !footnote && !href) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    const fragment = href === undefined ? undefined : localFragment(href, options.base);
    if (href !== undefined && fragment === undefined) { options.open(href); return; }

    const id = toc || footnote || decodeFragment(fragment!);
    const target = footnote
      ? [...content.querySelectorAll<HTMLElement>('[data-type="footnotes-li"], [data-type="footnotes-def"]')].find(note =>
          note.getAttribute('data-marker') === footnote || note.firstChild?.textContent?.trim().startsWith(`[${footnote}]:`))
      : id && targetFor(content, id, () => templateFor(options.markdownToHTML(options.markdown())).content);
    if (id && !target) { options.missing(id); return; }

    const viewportTop = scroll.getBoundingClientRect().top;
    const history = histories.get(scroll) || [];
    history.push({ link, offset: link.getBoundingClientRect().top - viewportTop, top: scroll.scrollTop });
    if (history.length > 100) history.shift();
    histories.set(scroll, history);
    scroll.scrollTop = target ? scroll.scrollTop + target.getBoundingClientRect().top - viewportTop - 16 : 0;
    refresh();
  }, true);

  return { back, refresh };
}
