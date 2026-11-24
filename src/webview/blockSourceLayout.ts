export function installBlockSourceLayout(dialog: HTMLElement, source: HTMLTextAreaElement, highlight: HTMLElement) {
  const grid = dialog.querySelector<HTMLElement>('.vm-block-source-grid')!;
  const divider = dialog.querySelector<HTMLElement>('.vm-source-divider')!;
  const corner = dialog.querySelector<HTMLButtonElement>('.vm-dialog-resizer')!;
  const scrim = dialog.parentElement!;
  const pane = source.parentElement!;
  const wrap = dialog.querySelector<HTMLButtonElement>('#block-source-wrap')!;

  function sync() {
    highlight.style.width = wrap.getAttribute('aria-pressed') === 'true' ? `${source.clientWidth}px` : '';
    highlight.style.transform = `translate(${-source.scrollLeft}px,${-source.scrollTop}px)`;
  }
  const observer = new ResizeObserver(sync);
  observer.observe(source);
  source.onscroll = sync;
  wrap.onclick = () => {
    const enabled = wrap.getAttribute('aria-pressed') !== 'true';
    wrap.setAttribute('aria-pressed', String(enabled));
    source.wrap = enabled ? 'soft' : 'off';
    pane.classList.toggle('wrapped', enabled);
    source.scrollLeft = 0;
    sync();
    source.focus({ preventScroll: true });
  };

  function bindDrag(handle: HTMLElement, start: (event: PointerEvent) => (event: PointerEvent) => void) {
    let move: ((event: PointerEvent) => void) | undefined;
    handle.onpointerdown = event => {
      if (event.button !== 0 || !event.isPrimary) return;
      event.preventDefault();
      handle.focus({ preventScroll: true });
      handle.setPointerCapture(event.pointerId);
      move = start(event);
    };
    handle.onpointermove = event => { if (handle.hasPointerCapture(event.pointerId)) move?.(event); };
    handle.onlostpointercapture = () => { move = undefined; };
  }

  let share = 50;
  function split(value: number) {
    share = Math.min(80, Math.max(20, Math.round(value)));
    grid.style.setProperty('--vm-source-share', `${share}fr`);
    grid.style.setProperty('--vm-preview-share', `${100 - share}fr`);
    divider.setAttribute('aria-valuenow', String(share));
  }
  bindDrag(divider, () => {
    const area = grid.getBoundingClientRect();
    const half = divider.offsetWidth / 2;
    return event => split(100 * (event.clientX - area.left - half) / (area.width - 2 * half));
  });
  divider.onkeydown = event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    split(share + (event.key === 'ArrowLeft' ? -5 : 5));
  };

  function resize(width: number, height: number) {
    const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(scrim);
    const maxWidth = scrim.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
    const maxHeight = scrim.clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
    dialog.style.width = `${Math.max(Math.min(340, maxWidth), Math.min(width, maxWidth))}px`;
    dialog.style.height = `${Math.max(Math.min(250, maxHeight), Math.min(height, maxHeight))}px`;
  }
  bindDrag(corner, origin => {
    const { width, height } = dialog.getBoundingClientRect();
    return event => resize(width + event.clientX - origin.clientX, height + event.clientY - origin.clientY);
  });
  corner.onkeydown = event => {
    const { width, height } = dialog.getBoundingClientRect();
    const step = event.shiftKey ? 48 : 16;
    const dx = event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
    const dy = event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
    if (!dx && !dy) return;
    event.preventDefault();
    resize(width + dx, height + dy);
  };
  return { sync, dispose: () => observer.disconnect() };
}
