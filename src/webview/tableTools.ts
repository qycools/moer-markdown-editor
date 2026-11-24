import { inlineToken, tableWidthMarkup } from './contentMarkup';
import { applyColumnWidths, columnWidthSelector, maxColumnWidth, measuredColumnWidths, minColumnWidth, storedColumnWidths } from './tableWidths';

const layoutSelector = '[data-type="html-inline"][data-moye-table="auto"]';
export type Alignment = 'left' | 'center' | 'right';

export function editableTable(element: Element | null) {
  const table = element?.closest('table[data-block]');
  if (!(table instanceof HTMLTableElement) || table.parentElement?.closest('[data-type="html-block"]')) return;
  const columns = table.rows[0]?.cells.length;
  if (!columns || table.tHead?.rows.length !== 1) return;
  if ([...table.rows].every(row => row.cells.length === columns && [...row.cells].every(cell => cell.colSpan === 1 && cell.rowSpan === 1))) return table;
}

export function selectedTable(surface: HTMLElement | undefined) {
  const selection = getSelection();
  if (!surface || !surface.contains(document.activeElement) || !selection?.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (!surface.contains(range.commonAncestorContainer)) return;
  const { startContainer, endContainer, startOffset, endOffset } = range;
  const start = startContainer instanceof Element ? startContainer : startContainer.parentElement;
  const end = endContainer instanceof Element ? endContainer : endContainer.parentElement;
  const startTable = start?.closest('table'), endTable = end?.closest('table');
  const enclosed = startContainer === endContainer && endOffset === startOffset + 1
    ? startContainer.childNodes[startOffset] : null;
  const table = editableTable(enclosed instanceof HTMLTableElement ? enclosed : startTable && startTable === endTable ? startTable : null);
  if (table) return { table, range };
}

export function alignTableColumns(table: HTMLTableElement, columns: Iterable<number>, alignment: Alignment) {
  let changed = false;
  for (const index of columns) {
    for (const row of table.rows) {
      const cell = row.cells[index];
      if (cell.align === alignment) continue;
      cell.align = alignment;
      changed = true;
    }
  }
  return changed;
}

export function setTableLayout(table: HTMLTableElement, auto: boolean, editor: any) {
  table.querySelectorAll(columnWidthSelector).forEach(marker => marker.remove());
  applyColumnWidths(table, []);
  const markers = table.querySelectorAll(layoutSelector);
  if (!auto) markers.forEach(marker => marker.remove());
  else if (!markers.length) {
    const { lute, currentMode } = editor.vditor;
    const token = inlineToken(lute, currentMode, tableWidthMarkup);
    if (token instanceof HTMLElement) {
      token.dataset.moyeTable = 'auto';
      table.rows[0].cells[0].append(token);
    }
  }
}

export function setManualTableWidths(table: HTMLTableElement, widths: number[], editor: any) {
  setTableLayout(table, false, editor);
  const { lute, currentMode } = editor.vditor;
  for (const [index, cell] of [...table.rows[0].cells].entries()) {
    const width = widths[index];
    if (!width) continue;
    const token = inlineToken(lute, currentMode, `<wbr data-moye-col-width="${width}">`);
    if (token instanceof HTMLElement) { token.dataset.moyeColWidth = String(width); cell.append(token); }
  }
  applyColumnWidths(table);
}

function moveRow(table: HTMLTableElement, row: HTMLTableRowElement, header: boolean) {
  const section = header ? table.tHead! : table.tBodies[0] || table.createTBody();
  const replacement = section.insertRow(0);
  for (const cell of row.cells) {
    const next = document.createElement(header ? 'th' : 'td');
    if (cell.align) next.align = cell.align;
    next.append(...cell.childNodes);
    replacement.append(next);
  }
  row.remove();
  return replacement;
}

function changeTable(table: HTMLTableElement, cell: HTMLTableCellElement, action: string, editor: any) {
  const row = cell.parentElement as HTMLTableRowElement;
  const rowIndex = row.rowIndex, column = cell.cellIndex;
  const header = table.rows[0], columns = header.cells.length;
  const automatic = !!table.querySelector(layoutSelector);
  const widths = storedColumnWidths(table);
  const manual = widths.some(Boolean);
  if (action.startsWith('align-')) {
    alignTableColumns(table, [column], action.slice(6) as Alignment);
  } else if (action === 'layout-equal' || action === 'layout-auto') {
    setTableLayout(table, action === 'layout-auto', editor);
  } else if (action === 'column-delete') {
    if (columns > 1) {
      for (const row of table.rows) row.deleteCell(column);
      widths.splice(column, 1);
    }
  } else if (action === 'column-left' || action === 'column-right') {
    const index = column + Number(action === 'column-right');
    widths.splice(index, 0, 100);
    for (const row of table.rows) {
      const inserted = document.createElement(row === header ? 'th' : 'td');
      inserted.textContent = ' ';
      row.insertBefore(inserted, row.cells[index] || null);
    }
  } else if (action === 'row-delete') {
    if (table.rows.length <= 1) return cell;
    row.remove();
    if (row === header) moveRow(table, table.rows[0], true);
  } else if (action === 'row-above' || action === 'row-below') {
    const aboveHeader = row === header && action === 'row-above';
    const body = table.tBodies[0] || table.createTBody();
    if (aboveHeader) moveRow(table, header, false);
    const section = aboveHeader ? table.tHead! : body;
    const index = row === header ? 0 : row.sectionRowIndex + Number(action === 'row-below');
    const inserted = section.insertRow(index);
    const reference = aboveHeader ? body.rows[0] : header;
    for (const before of reference.cells) {
      const next = document.createElement(aboveHeader ? 'th' : 'td');
      next.textContent = ' ';
      if (before.align) next.align = before.align;
      inserted.append(next);
    }
  }
  if (manual && !action.startsWith('layout-') && !action.startsWith('align-')) setManualTableWidths(table, widths, editor);
  else if (automatic && !action.startsWith('layout-')) {
    setTableLayout(table, false, editor);
    setTableLayout(table, true, editor);
  }
  return table.rows[Math.min(rowIndex, table.rows.length - 1)].cells[Math.min(column, table.rows[0].cells.length - 1)];
}

export function fillTableTools(panel: HTMLElement, table: HTMLTableElement, cell: HTMLTableCellElement, editor: any, axis: 'row' | 'column' | undefined, commit: (cell: HTMLTableCellElement) => void) {
  const row = cell.parentElement as HTMLTableRowElement;
  const group = (label: string, actions: string, active = false) => `<div class="vm-table-group${active ? ' active' : ''}"><span>${label}</span><div>${actions}</div></div>`;
  const button = (id: string, label: string, attrs = '') => `<button type="button" data-table-action="${id}" ${attrs}>${label}</button>`;
  const rowButtons = group(row.rowIndex === 0 ? '表头' : `第 ${row.rowIndex + 1} 行`,
    button('row-above', '上方插入') + button('row-below', '下方插入') + button('row-delete', '删除行', table.rows.length === 1 ? 'disabled' : ''), axis === 'row');
  const columnButtons = group(`第 ${cell.cellIndex + 1} 列`,
    button('column-left', '左侧插入') + button('column-right', '右侧插入') + button('column-delete', '删除列', row.cells.length === 1 ? 'disabled' : ''), axis === 'column');
  const automatic = !!table.querySelector(layoutSelector);
  const stored = storedColumnWidths(table), manual = stored.some(Boolean);
  const index = cell.cellIndex;
  const width = stored[index] || measuredColumnWidths(table)[index];
  panel.innerHTML = (axis === 'column' ? columnButtons + rowButtons : rowButtons + columnButtons)
    + group('列对齐', [['left', '左对齐'], ['center', '居中'], ['right', '右对齐']].map(([align, label]) =>
      button('align-' + align, label, `aria-pressed="${cell.align === align}"`)).join(''))
    + group('列宽', button('layout-equal', '列等宽', `aria-pressed="${!automatic && !manual}"`) + button('layout-auto', '自适应宽度', `aria-pressed="${automatic}"`))
    + group('当前列', `<form class="vm-table-width-form">
      <input type="number" min="${minColumnWidth}" max="${maxColumnWidth}" step="1" required value="${width}" aria-label="第 ${index + 1} 列宽度（像素）">
      <span>px</span><button type="submit">应用列宽</button>
    </form>`);
  const form = panel.querySelector('form')!;
  form.onsubmit = event => {
    event.preventDefault();
    if (!cell.isConnected || !form.reportValidity()) return;
    const measured = measuredColumnWidths(table);
    const widths = stored.map((value, position) => value || measured[position]);
    widths[index] = form.querySelector('input')!.valueAsNumber;
    setManualTableWidths(table, widths, editor);
    commit(cell);
  };
  panel.addEventListener('click', event => {
    const action = (event.target as Element).closest<HTMLElement>('[data-table-action]')?.dataset.tableAction;
    if (action && cell.isConnected) commit(changeTable(table, cell, action, editor));
  });
}
