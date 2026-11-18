import { escapeHTML as esc, type ThemeCatalog, type ThemeDefinition } from '../shared';

export const isDarkTheme = (theme?: ThemeDefinition) => theme?.kind === 'dark' || theme?.kind === 'hc-dark';
export function installThemeMenu(options: {
  catalog: () => ThemeCatalog;
  current: (target: 'theme' | 'codeTheme') => string;
  choose: (target: 'theme' | 'codeTheme', id: string) => void;
  beforeOpen: () => void;
}) {
  let menu: HTMLElement | undefined, anchor: HTMLElement | undefined;
  function close(focus = false) {
    menu?.remove(); menu = undefined; anchor?.setAttribute('aria-expanded', 'false');
    if (focus && anchor?.isConnected) anchor.focus({ preventScroll: true });
    anchor = undefined;
  }
  function show(button: HTMLElement, target: 'theme' | 'codeTheme') {
    if (menu && anchor === button) { close(); return; }
    close(); options.beforeOpen(); anchor = button;
    const catalog = options.catalog(), value = options.current(target);
    const item = (id: string, label: string) => `<button type="button" role="menuitemradio" data-theme-id="${esc(id)}" aria-checked="${value === id}"><span>${esc(label)}</span><span class="theme-check" aria-hidden="true">${value === id ? '✓' : ''}</span></button>`;
    const groups: [string, (theme: ThemeDefinition) => boolean][] = [
      ['亮色主题', theme => theme.kind === 'light'], ['暗色主题', theme => theme.kind === 'dark'], ['高对比度主题', theme => theme.kind.startsWith('hc-')],
    ];
    menu = document.createElement('div'); menu.id = 'theme-menu'; menu.className = 'theme-menu'; menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', target === 'theme' ? '界面主题' : '代码块主题');
    menu.innerHTML = `<div class="theme-group">系统</div>${item('auto', 'Auto · 跟随 VS Code')}${groups.map(([label, filter]) => { const themes = catalog.themes.filter(filter); return themes.length ? `<div class="theme-group">${label}</div>${themes.map(theme => item(theme.id, theme.label)).join('')}` : ''; }).join('')}`;
    document.body.append(menu); button.setAttribute('aria-expanded', 'true');
    const rect = button.getBoundingClientRect(), width = Math.min(280, innerWidth - 16);
    menu.style.width = `${width}px`; menu.style.maxHeight = `${Math.min(520, innerHeight - 24)}px`;
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`;
    const below = innerHeight - rect.bottom - 8, above = rect.top - 8;
    if (below >= Math.min(menu.scrollHeight, 240) || below >= above) { menu.style.top = `${rect.bottom + 4}px`; menu.style.maxHeight = `${Math.min(520, below - 4)}px`; }
    else { menu.style.bottom = `${innerHeight - rect.top + 4}px`; menu.style.maxHeight = `${Math.min(520, above - 4)}px`; }
    menu.addEventListener('pointerdown', event => event.preventDefault());
    menu.addEventListener('click', event => {
      const selected = (event.target as Element).closest<HTMLElement>('[data-theme-id]');
      if (selected) { const id = selected.dataset.themeId!; close(); options.choose(target, id); }
    });
    menu.addEventListener('keydown', event => {
      const buttons = [...menu!.querySelectorAll<HTMLButtonElement>('button')];
      let index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true); }
      else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
        buttons[index]?.focus({ preventScroll: true }); buttons[index]?.scrollIntoView({ block: 'nearest' });
      } else if (event.key === 'Tab') close();
    });
    menu.querySelector<HTMLElement>('[aria-checked=true]')?.focus({ preventScroll: true });
  }
  document.addEventListener('pointerdown', event => { if (menu && !menu.contains(event.target as Node) && !anchor?.contains(event.target as Node)) close(); });
  document.addEventListener('scroll', event => { if (menu && !menu.contains(event.target as Node)) close(); }, true);
  window.addEventListener('resize', () => close());
  return { show, close, isOpen: () => !!menu };
}

export function themeSelectOptions(catalog: ThemeCatalog, value: string) {
  return `<option value="auto" ${value === 'auto' ? 'selected' : ''}>Auto · 跟随 VS Code</option>${[['light', '亮色主题'], ['dark', '暗色主题'], ['hc-light', '高对比度亮色'], ['hc-dark', '高对比度暗色']].map(([kind, label]) => `<optgroup label="${label}">${catalog.themes.filter(theme => theme.kind === kind).map(theme => `<option value="${esc(theme.id)}" ${value === theme.id ? 'selected' : ''}>${esc(theme.label)}</option>`).join('')}</optgroup>`).join('')}`;
}
