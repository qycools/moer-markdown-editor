export function installOutlineResize(outline: HTMLElement, separator: HTMLElement, options: { width: () => number; change: (width: number) => void }) {
  const container = outline.parentElement!;
  const limit = (width: number) => Math.max(120, Math.min(Math.min(1600, Math.max(120, container.clientWidth - 220)), width));
  const update = (width = options.width()) => {
    const value = limit(Number.isFinite(width) ? width : 216);
    outline.style.width = `${value}px`; separator.setAttribute('aria-valuenow', String(Math.round(value)));
    separator.setAttribute('aria-valuemin', '120'); separator.setAttribute('aria-valuemax', String(Math.max(120, container.clientWidth - 220)));
  };
  let dragging = false, start = 0, width = 216;
  separator.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault(); dragging = true; start = event.clientX; width = outline.getBoundingClientRect().width;
    separator.setPointerCapture(event.pointerId); document.documentElement.classList.add('resizing-outline');
  });
  separator.addEventListener('pointermove', event => { if (dragging) update(width + event.clientX - start); });
  const finish = () => {
    if (!dragging) return;
    dragging = false; document.documentElement.classList.remove('resizing-outline'); options.change(Math.round(outline.getBoundingClientRect().width));
  };
  separator.addEventListener('pointerup', finish); separator.addEventListener('lostpointercapture', finish);
  separator.addEventListener('keydown', event => {
    const delta = event.key === 'ArrowLeft' ? -10 : event.key === 'ArrowRight' ? 10 : 0;
    if (delta) { event.preventDefault(); const value = limit(outline.getBoundingClientRect().width + delta); update(value); options.change(Math.round(value)); }
  });
  separator.addEventListener('dblclick', () => { update(216); options.change(216); });
  new ResizeObserver(() => { if (!dragging) update(); }).observe(container);
  update(); return { update };
}
