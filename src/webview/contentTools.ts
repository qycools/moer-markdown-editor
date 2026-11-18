import { canEditImage, fillImageTools } from './imageTools';
import { editableTable, fillTableTools } from './tableTools';

export function installContentTools(editor: any, options: {
  surface: () => HTMLElement | undefined;
  beforeOpen: () => void;
  submit: () => void;
  copy: (text: string) => Promise<void>;
  toast: (text: string, error?: boolean) => void;
  menuState: (open: boolean) => void;
}) {
  let panel: HTMLElement | undefined;
  let anchor: HTMLElement | undefined;
  let editingImage = false;
  function close() {
    panel?.remove();
    panel = undefined;
    anchor = undefined;
    if (editingImage) options.menuState(false);
    editingImage = false;
  }
  function place() {
    if (!panel || !anchor) return;
    const surface = options.surface();
    if (!surface?.contains(anchor)) { close(); return; }
    const rect = anchor.getBoundingClientRect();
    const viewport = surface.getBoundingClientRect();
    if (rect.bottom < viewport.top || rect.top > viewport.bottom || rect.right < viewport.left || rect.left > viewport.right) { close(); return; }
    const bounds = !editingImage ? anchor.closest('table')!.getBoundingClientRect() : rect;
    const gap = 6, padding = 8;
    const width = panel.offsetWidth, height = panel.offsetHeight;
    const above = bounds.top - height - gap, below = bounds.bottom + gap;
    const top = !editingImage && above >= viewport.top ? above
      : below + height <= innerHeight - padding ? below
      : above >= viewport.top ? above : rect.bottom + gap;
    panel.style.left = `${Math.max(padding, Math.min(rect.left, innerWidth - width - padding))}px`;
    panel.style.top = `${Math.max(padding, Math.min(top, innerHeight - height - padding))}px`;
  }
  function show(target: HTMLElement, image: boolean) {
    close();
    options.beforeOpen();
    anchor = target;
    editingImage = image;
    panel = document.createElement('section');
    panel.className = 'vm-content-popover ' + (image ? 'vm-image-tools' : 'vm-table-tools');
    panel.setAttribute('role', image ? 'dialog' : 'toolbar');
    panel.setAttribute('aria-label', image ? '图片操作' : '表格操作');
    document.body.append(panel);
    if (editingImage) options.menuState(true);
    return panel;
  }
  function focusRange(range: Range) {
    const surface = options.surface();
    surface?.focus({ preventScroll: true });
    if (surface?.contains(range.startContainer)) {
      const selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  function openImage(image: HTMLImageElement) {
    image.closest('.vditor-ir__node--expand')?.classList.remove('vditor-ir__node--expand');
    fillImageTools(show(image, true), image, editor, {
      close, copy: options.copy, toast: options.toast,
      commit: range => { focusRange(range); options.submit(); },
    });
    place();
  }
  function openTable(cell: HTMLTableCellElement, axis?: 'row' | 'column', focus = false) {
    const table = editableTable(cell);
    if (!table) return;
    const toolbar = show(cell, false);
    fillTableTools(toolbar, table, cell, editor, axis, next => {
      const range = document.createRange();
      range.selectNodeContents(next);
      range.collapse(true);
      focusRange(range);
      options.submit();
      openTable(next, axis);
    });
    place();
    if (focus) toolbar.querySelector('button')?.focus({ preventScroll: true });
  }
  function imageAt(target: EventTarget | null) {
    return target instanceof HTMLImageElement && options.surface()?.contains(target) && canEditImage(target) ? target : undefined;
  }
  document.addEventListener('pointerdown', event => {
    if (panel && !panel.contains(event.target as Node) && !anchor?.contains(event.target as Node)) close();
    if (event.button === 0 && imageAt(event.target)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('click', event => {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const image = imageAt(event.target);
    if (image) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openImage(image);
      return;
    }
    const cell = event.target.closest('td,th');
    if (!(cell instanceof HTMLTableCellElement) || !options.surface()?.contains(cell)) return;
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && cell.contains(selection.anchorNode)) return;
    const rect = cell.getBoundingClientRect();
    const horizontal = Math.min(Math.abs(event.clientY - rect.top), Math.abs(event.clientY - rect.bottom));
    const vertical = Math.min(Math.abs(event.clientX - rect.left), Math.abs(event.clientX - rect.right));
    const axis = Math.min(horizontal, vertical) <= 5 ? horizontal < vertical ? 'row' : 'column' : undefined;
    openTable(cell, axis);
  }, true);
  document.addEventListener('keydown', event => {
    if (!panel || event.key !== 'Escape') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (panel.contains(document.activeElement)) options.surface()?.focus({ preventScroll: true });
    close();
  }, true);
  document.addEventListener('input', event => { if (panel && !panel.contains(event.target as Node)) close(); }, true);
  document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (panel && !editingImage && selection && !selection.isCollapsed && options.surface()?.contains(selection.anchorNode)) close();
  });
  document.addEventListener('scroll', place, true);
  window.addEventListener('resize', place);
  return {
    close, isOpen: () => !!panel,
    openForBlock: (block: HTMLElement) => {
      const cell = block instanceof HTMLTableElement ? block.rows[0]?.cells[0] : undefined;
      const image = block.querySelector('img');
      if (cell) openTable(cell, undefined, true);
      else if (image && canEditImage(image)) openImage(image);
    },
  };
}
