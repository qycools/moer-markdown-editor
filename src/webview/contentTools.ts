import { canEditImage, changeImage, imageReference, removeImage, type CommitImageEdit } from './imageTools';
import { alignTableColumns, editableTable, fillTableTools, selectedTable, setManualTableWidths, type Alignment } from './tableTools';
import { applyColumnWidths, maxColumnWidth, measuredColumnWidths, minColumnWidth } from './tableWidths';

export function installContentTools(editor: any, options: {
  surface: () => HTMLElement | undefined;
  beforeOpen: () => void;
  submit: () => void;
  commitImageEdit: CommitImageEdit;
  copy: (text: string) => Promise<void>;
  toast: (text: string, error?: boolean) => void;
  imageSelection: (selected: boolean) => void;
  tableSelection: (selected: boolean) => void;
}) {
  let panel: HTMLElement | undefined;
  let anchor: HTMLTableCellElement | undefined;
  let selected: HTMLImageElement | undefined;
  let cancelDrag: (() => void) | undefined;
  let skipClick = false;
  let tableContext = false;
  const frame = document.createElement('div');
  frame.className = 'vm-image-selection';
  frame.setAttribute('aria-hidden', 'true');
  frame.innerHTML = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(edge => `<span data-image-edge="${edge}"></span>`).join('');
  const ruler = document.createElement('div');
  ruler.className = 'vm-column-resize-line';
  const imageResize = new ResizeObserver(place);

  function refreshTableContext() {
    const active = !selected && !!selectedTable(options.surface());
    if (active === tableContext) return;
    tableContext = active;
    options.tableSelection(active);
  }
  function closeTable() { panel?.remove(); panel = undefined; anchor = undefined; }
  function deselect() {
    if (!selected) return;
    selected = undefined;
    imageResize.disconnect();
    frame.remove();
    options.imageSelection(false);
    refreshTableContext();
  }
  function close() { cancelDrag?.(); closeTable(); deselect(); ruler.remove(); }
  function place() {
    const surface = options.surface(), viewport = surface?.getBoundingClientRect();
    if (selected) {
      if (!viewport || !selected.isConnected || !surface?.contains(selected)) deselect();
      else {
        const rect = selected.getBoundingClientRect();
        frame.classList.toggle('compact', rect.width < 16 || rect.height < 16);
        Object.assign(frame.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
        frame.hidden = rect.bottom <= viewport.top || rect.top >= viewport.bottom || rect.right <= viewport.left || rect.left >= viewport.right;
        if (!frame.hidden) frame.style.clipPath = `inset(${Math.max(-6, viewport.top - rect.top)}px ${Math.max(-6, rect.right - viewport.right)}px ${Math.max(-6, rect.bottom - viewport.bottom)}px ${Math.max(-6, viewport.left - rect.left)}px)`;
      }
    }
    if (!panel || !anchor) return;
    if (!viewport || !surface?.contains(anchor)) { closeTable(); return; }
    const rect = anchor.getBoundingClientRect(), bounds = anchor.closest('table')!.getBoundingClientRect();
    if (rect.bottom < viewport.top || rect.top > viewport.bottom || rect.right < viewport.left || rect.left > viewport.right) { closeTable(); return; }
    const gap = 6, padding = 8, width = panel.offsetWidth, height = panel.offsetHeight;
    const above = bounds.top - height - gap, below = bounds.bottom + gap;
    const top = above >= viewport.top ? above : below + height <= innerHeight - padding ? below : rect.bottom + gap;
    panel.style.left = `${Math.max(padding, Math.min(rect.left, innerWidth - width - padding))}px`;
    panel.style.top = `${Math.max(padding, Math.min(top, innerHeight - height - padding))}px`;
  }
  function focusRange(range: Range) {
    const surface = options.surface();
    surface?.focus({ preventScroll: true });
    if (surface?.contains(range.startContainer)) {
      const selection = getSelection()!;
      selection.removeAllRanges(); selection.addRange(range);
    }
  }
  function selectImage(image: HTMLImageElement) {
    closeTable(); ruler.remove();
    image.closest('.vditor-ir__node--expand')?.classList.remove('vditor-ir__node--expand');
    const changed = !selected;
    selected = image;
    imageResize.disconnect(); imageResize.observe(image);
    if (!frame.isConnected) document.body.append(frame);
    if (changed) options.imageSelection(true);
    refreshTableContext();
    place();
  }
  function commitImage(image: HTMLImageElement | undefined) {
    if (!image) return;
    selectImage(image);
    const range = document.createRange();
    range.setStartAfter(image.closest('.vm-inline-image,[data-type=img]') || image); range.collapse(true);
    focusRange(range);
  }
  function openTable(cell: HTMLTableCellElement, axis?: 'row' | 'column', focus = false) {
    const table = editableTable(cell);
    if (!table) return;
    close(); options.beforeOpen(); anchor = cell;
    panel = document.createElement('section');
    panel.className = 'vm-content-popover vm-table-tools';
    panel.setAttribute('role', 'toolbar'); panel.setAttribute('aria-label', '表格操作');
    document.body.append(panel);
    fillTableTools(panel, table, cell, editor, axis, next => {
      const range = document.createRange(); range.selectNodeContents(next); range.collapse(true);
      focusRange(range); options.submit(); openTable(next, axis);
    });
    place();
    if (focus) panel.querySelector('button')?.focus({ preventScroll: true });
  }
  function imageAt(target: EventTarget | null) {
    return target instanceof HTMLImageElement && options.surface()?.contains(target) && canEditImage(target) ? target : undefined;
  }
  function columnAt(event: PointerEvent) {
    const cell = event.target instanceof Element ? event.target.closest('td,th') : null;
    if (!(cell instanceof HTMLTableCellElement) || !options.surface()?.contains(cell)) return;
    const table = editableTable(cell);
    if (!table) return;
    const rect = cell.getBoundingClientRect();
    let index = cell.cellIndex;
    if (Math.abs(event.clientX - rect.right) > 6) {
      if (!index || Math.abs(event.clientX - rect.left) > 6) return;
      index--;
    }
    return { table, index };
  }
  function showRuler(table: HTMLTableElement, index: number) {
    const viewport = options.surface()!.getBoundingClientRect(), bounds = table.getBoundingClientRect();
    const x = table.rows[0].cells[index].getBoundingClientRect().right;
    const top = Math.max(viewport.top, bounds.top), height = Math.min(viewport.bottom, bounds.bottom) - top;
    if (height <= 0 || x < viewport.left || x > viewport.right) { ruler.remove(); return; }
    Object.assign(ruler.style, { left: `${x}px`, top: `${top}px`, height: `${height}px` });
    if (!ruler.isConnected) document.body.append(ruler);
  }
  function drag(event: PointerEvent, move: (x: number, y: number) => void, finish: (apply: boolean) => void) {
    event.preventDefault(); event.stopImmediatePropagation();
    const abort = new AbortController(), pointer = event.pointerId;
    const listener = { capture: true, signal: abort.signal };
    let moved = false;
    const end = (apply: boolean) => {
      abort.abort(); cancelDrag = undefined; document.body.classList.remove('vm-resizing');
      if (apply && moved) { skipClick = true; window.setTimeout(() => { skipClick = false; }, 0); }
      finish(apply);
    };
    cancelDrag = () => end(false);
    document.body.classList.add('vm-resizing');
    document.addEventListener('pointermove', next => {
      if (next.pointerId !== pointer) return;
      next.preventDefault(); next.stopImmediatePropagation();
      const x = next.clientX - event.clientX, y = next.clientY - event.clientY;
      moved ||= Math.abs(x) >= 1 || Math.abs(y) >= 1;
      move(x, y);
    }, listener);
    document.addEventListener('pointerup', next => {
      if (next.pointerId !== pointer) return;
      next.preventDefault(); end(true);
    }, listener);
    document.addEventListener('pointercancel', next => { if (next.pointerId === pointer) end(false); }, listener);
    window.addEventListener('blur', () => end(false), listener);
  }
  function resizeImage(event: PointerEvent, image: HTMLImageElement, edge: string) {
    const rect = image.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : rect.width / rect.height;
    const style = getComputedStyle(image);
    const parentWidth = image.closest('p,li,td,th,blockquote')?.clientWidth || options.surface()!.clientWidth;
    const maxWidth = style.maxWidth.endsWith('%') ? parentWidth * parseFloat(style.maxWidth) / 100 : parseFloat(style.maxWidth);
    const maxHeight = parseFloat(style.maxHeight);
    const limit = Math.max(1, Math.min(100000, maxWidth || 100000, maxHeight ? maxHeight * ratio : 100000));
    const original = image.getAttribute('style');
    let width = Math.round(rect.width), changed = false;
    drag(event, (x, y) => {
      const horizontal = edge.includes('e') ? x : edge.includes('w') ? -x : 0;
      const vertical = (edge.includes('s') ? y : edge.includes('n') ? -y : 0) * ratio;
      const delta = Math.abs(horizontal) >= Math.abs(vertical) ? horizontal : vertical;
      if (Math.abs(delta) < 1 && !changed) return;
      width = Math.round(Math.min(limit, Math.max(Math.min(16, limit), rect.width + delta)));
      changed = true;
      image.style.width = `${width}px`;
      image.style.height = `${Math.max(1, Math.round(width / ratio))}px`;
      place();
    }, apply => {
      if (original === null) image.removeAttribute('style'); else image.setAttribute('style', original);
      if (apply && changed && image.isConnected) commitImage(changeImage(image, { width, height: Math.max(1, Math.round(width / ratio)) }, editor, options.commitImageEdit));
      else place();
    });
  }
  function resizeColumn(event: PointerEvent, table: HTMLTableElement, index: number) {
    closeTable(); deselect();
    const widths = measuredColumnWidths(table);
    const original = [...widths];
    let changed = false;
    drag(event, x => {
      const width = Math.max(minColumnWidth, Math.min(maxColumnWidth, Math.round(original[index] + x)));
      if (!changed && width === original[index]) return;
      widths[index] = width; changed = true;
      applyColumnWidths(table, widths); showRuler(table, index);
    }, apply => {
      ruler.remove();
      if (apply && changed && table.isConnected && widths[index] !== original[index]) {
        setManualTableWidths(table, widths, editor); options.submit();
      } else applyColumnWidths(table);
    });
  }
  document.addEventListener('pointermove', event => {
    if (cancelDrag) return;
    const column = columnAt(event);
    if (column) showRuler(column.table, column.index);
    else ruler.remove();
  });
  document.addEventListener('pointerdown', event => {
    if (event.button === 0 && !event.ctrlKey) {
      const edge = event.target instanceof HTMLElement ? event.target.dataset.imageEdge : undefined;
      if (edge && selected) { resizeImage(event, selected, edge); return; }
      const column = columnAt(event);
      if (column) { resizeColumn(event, column.table, column.index); return; }
      if (imageAt(event.target)) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    }
    if (!frame.contains(event.target as Node)) deselect();
    if (panel && !panel.contains(event.target as Node) && !anchor?.contains(event.target as Node)) closeTable();
  }, true);
  document.addEventListener('click', event => {
    if (skipClick) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    if (event.button !== 0 || event.ctrlKey || cancelDrag || !(event.target instanceof Element)) return;
    const image = imageAt(event.target);
    if (image) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (selected !== image) close();
      options.beforeOpen(); options.surface()?.focus({ preventScroll: true });
      selectImage(image);
      return;
    }
    const cell = event.target.closest('td,th');
    if (!(cell instanceof HTMLTableCellElement) || !options.surface()?.contains(cell)) return;
    const selection = getSelection();
    if (selection && !selection.isCollapsed && cell.contains(selection.anchorNode)) return;
    const rect = cell.getBoundingClientRect();
    const row = Math.min(Math.abs(event.clientY - rect.top), Math.abs(event.clientY - rect.bottom));
    const column = Math.min(Math.abs(event.clientX - rect.left), Math.abs(event.clientX - rect.right));
    openTable(cell, Math.min(row, column) <= 5 ? row < column ? 'row' : 'column' : undefined);
  }, true);
  document.addEventListener('keydown', event => {
    if (event.isComposing) return;
    if (event.key === 'Escape' && (panel || selected || cancelDrag)) {
      event.preventDefault(); event.stopImmediatePropagation(); close(); return;
    }
    const surface = options.surface();
    if (!selected || !surface?.contains(document.activeElement)) return;
    if (!surface.contains(selected)) { deselect(); return; }
    const key = event.key.toLowerCase(), shortcut = (event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey;
    const plain = !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
    if (shortcut && key === 'c') {
      event.preventDefault(); event.stopImmediatePropagation();
      const text = imageReference(selected, editor);
      if (text) void options.copy(text).then(() => options.toast('图片引用已复制'), error => options.toast(error.message, true));
    } else if (plain && key === 'delete') {
      event.preventDefault(); event.stopImmediatePropagation();
      const caret = removeImage(selected, options.commitImageEdit);
      deselect();
      if (caret) focusRange(caret);
    } else if (key === 'backspace') {
      event.preventDefault(); event.stopImmediatePropagation();
    } else if (!(shortcut && ['e', 'l', 'r'].includes(key)) && !['control', 'meta', 'shift', 'alt'].includes(key)) {
      deselect();
    }
  }, true);
  document.addEventListener('input', event => { if (panel && !panel.contains(event.target as Node)) closeTable(); deselect(); }, true);
  document.addEventListener('selectionchange', () => {
    refreshTableContext();
    const selection = getSelection();
    if (panel && selection && !selection.isCollapsed && options.surface()?.contains(selection.anchorNode)) closeTable();
  });
  document.addEventListener('focusin', refreshTableContext);
  document.addEventListener('focusout', () => queueMicrotask(refreshTableContext));
  document.addEventListener('scroll', () => { ruler.remove(); place(); }, true);
  window.addEventListener('resize', place);
  return {
    close, isOpen: () => !!panel || !!selected,
    alignImage: (align: Alignment) => { if (selected?.isConnected) commitImage(changeImage(selected, { align }, editor, options.commitImageEdit)); },
    alignTable: (align: Alignment) => {
      if (selected) return;
      const selection = selectedTable(options.surface());
      if (!selection) return;
      const { table, range } = selection;
      const columns = new Set<number>();
      if (range.collapsed) {
        const point = range.startContainer;
        const cell = (point instanceof Element ? point : point.parentElement)?.closest('th,td');
        if (cell instanceof HTMLTableCellElement) columns.add(cell.cellIndex);
      } else {
        for (const row of table.rows) for (const cell of row.cells) if (range.intersectsNode(cell)) columns.add(cell.cellIndex);
      }
      const selectionRange = range.cloneRange();
      if (alignTableColumns(table, columns, align)) {
        closeTable();
        options.submit();
        focusRange(selectionRange);
      }
    },
    openForBlock: (block: HTMLElement) => {
      const cell = block instanceof HTMLTableElement ? block.rows[0]?.cells[0] : undefined;
      const image = block.querySelector('img');
      if (cell) openTable(cell, undefined, true);
      else if (image && canEditImage(image)) { options.surface()?.focus({ preventScroll: true }); selectImage(image); }
    },
  };
}
