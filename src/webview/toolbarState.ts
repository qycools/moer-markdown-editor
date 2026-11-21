import { headingSelector } from './mindmap';

const formats = {
  headings: headingSelector, bold: 'strong,b,[data-type=strong]', italic: 'em,i,[data-type=em]',
  strike: 's,strike,del,[data-type=s]', link: 'a,[data-type=a],[data-type=link-ref]',
  table: 'table', quote: 'blockquote', code: '[data-type=code-block]',
};

export function installToolbarState(toolbar: HTMLElement, native: HTMLElement, overlay: HTMLElement, surface: () => HTMLElement | undefined) {
  const menus: Record<string, string> = { headings: '.heading-picker', export: '#perform-export', search: '#search-bar', settings: '#settings-menu', textColor: '#palette-menu[data-palette="color"]', backgroundColor: '#palette-menu[data-palette="background-color"]' };
  const buttons = new Map([...toolbar.querySelectorAll<HTMLButtonElement>('[data-action]')].map(button => [button.dataset.action, button]));
  let clicked: Element | null = null;
  let scheduled = false;
  const set = (action: string, attribute: string, value: boolean) => {
    const button = buttons.get(action);
    if (button?.getAttribute(attribute) !== String(value)) button?.setAttribute(attribute, String(value));
  };
  function context(root: HTMLElement) {
    const selection = getSelection(), node = selection?.focusNode;
    const caret = node instanceof Element ? node : node?.parentElement;
    if (clicked && root.contains(clicked) && (!root.contains(caret ?? null) || caret?.contains(clicked))) return clicked;
    return caret && root.contains(caret) ? caret : null;
  }
  function update() {
    scheduled = false;
    const root = surface();
    const target = root && !(root instanceof HTMLTextAreaElement) ? context(root) : null;
    const li = target?.closest('li');
    const list = li?.matches('.vditor-task') ? 'check' : li?.parentElement?.tagName === 'OL' ? 'ordered-list' : li ? 'list' : '';
    const nativeActive = (action: string) => !!native.querySelector(`[data-type="${action}"].vditor-menu--current`);
    for (const action of ['list', 'ordered-list', 'check']) {
      set(action, 'aria-pressed', root instanceof HTMLTextAreaElement ? nativeActive(action) : action === list);
    }
    for (const [action, selector] of Object.entries(formats)) {
      set(action, 'aria-pressed', root instanceof HTMLTextAreaElement ? nativeActive(action) : !!target?.closest(selector));
    }
    let textColor = false, backgroundColor = false;
    for (let element = target; element && element !== root; element = element.parentElement) {
      if (element instanceof HTMLElement && element.hasAttribute('data-vm-color')) {
        textColor ||= !!element.style.color;
        backgroundColor ||= !!element.style.backgroundColor;
      }
    }
    set('textColor', 'aria-pressed', textColor);
    set('backgroundColor', 'aria-pressed', backgroundColor);
    for (const [action, selector] of Object.entries(menus)) set(action, 'aria-expanded', !!document.querySelector(selector));
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  document.addEventListener('selectionchange', () => { clicked = null; schedule(); });
  document.addEventListener('click', event => {
    if (event.target instanceof Element && surface()?.contains(event.target)) { clicked = event.target; schedule(); }
  }, true);
  document.addEventListener('input', schedule);
  const observer = new MutationObserver(schedule);
  observer.observe(native, { subtree: true, attributes: true, attributeFilter: ['class'] });
  observer.observe(overlay, { childList: true, subtree: true });
  observer.observe(document.body, { childList: true });
  observer.observe(toolbar.parentElement!, { childList: true });
  schedule(); return { refresh: schedule };
}
