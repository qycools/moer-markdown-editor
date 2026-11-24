export const columnWidthSelector = '[data-moye-col-width]';
export const minColumnWidth = 36;
export const maxColumnWidth = 6000;

export function measuredColumnWidths(table: HTMLTableElement) {
  return [...table.rows[0].cells].map(cell =>
    Math.min(maxColumnWidth, Math.max(minColumnWidth, Math.round(cell.getBoundingClientRect().width))));
}

export function storedColumnWidths(table: HTMLTableElement) {
  const header = table.tHead?.rows[0];
  if (!header) return [];
  return [...header.cells].map(cell => {
    const value = cell.querySelector(columnWidthSelector)?.getAttribute('data-moye-col-width');
    return value && /^\d{1,4}$/.test(value) && Number(value) <= maxColumnWidth ? Number(value) : 0;
  });
}

export function applyColumnWidths(table: HTMLTableElement, widths = storedColumnWidths(table)) {
  const total = widths.reduce((sum, width) => sum + width, 0);
  const header = table.tHead?.rows[0];
  if (!header) return;
  table.toggleAttribute('data-vm-column-widths', total > 0);
  if (total) table.style.setProperty('--vm-table-width', `${total + widths.filter(width => !width).length * 100}px`);
  else table.style.removeProperty('--vm-table-width');
  for (const [index, cell] of [...header.cells].entries()) {
    if (widths[index]) cell.style.setProperty('--vm-column-width', `${widths[index]}px`);
    else cell.style.removeProperty('--vm-column-width');
  }
}

type LayoutMarker = 'data-moye-col-width' | 'data-moye-table';

export function applyTableWidths(root: ParentNode, createMarker: (name: LayoutMarker, value: string) => Element | null = () => document.createElement('wbr')) {
  for (const table of root.querySelectorAll('table')) {
    for (const cell of table.tHead?.rows[0]?.cells ?? []) {
      for (const node of [...cell.childNodes]) {
        if (!(node instanceof Text)) continue;
        const match = /<wbr(data-moye-col-width)="(\d{1,4})">(?=\s*$)|<wbr(data-moye-table)="(auto)">(?=\s*$)/.exec(node.data);
        if (!match) continue;
        const name = (match[1] || match[3]) as LayoutMarker, value = match[2] || match[4];
        if (name === 'data-moye-col-width' && (Number(value) < 1 || Number(value) > maxColumnWidth)) continue;
        const marker = createMarker(name, value);
        if (!marker) continue;
        marker.setAttribute(name, value);
        const following = node.splitText(match.index);
        following.deleteData(0, match[0].length);
        following.before(marker);
      }
    }
    if (table.querySelector(columnWidthSelector)) applyColumnWidths(table);
  }
}
