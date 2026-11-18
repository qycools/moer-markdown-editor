import { markmapFitEvent, markmapHeight, setMarkmapHeight, withMarkmapHeight } from '../../vditor-master/src/ts/markdown/markmapSize';

export function createMarkmapResize(graph: HTMLElement, source: HTMLElement, submit: () => void) {
  const handle = document.createElement('div');
  handle.className = 'vm-markmap-resize';
  handle.tabIndex = 0;
  handle.title = '拖动调整导图高度，双击恢复默认';
  handle.setAttribute('role', 'separator');
  handle.setAttribute('aria-orientation', 'horizontal');
  handle.setAttribute('aria-label', '调整 Markmap 导图高度');
  handle.setAttribute('aria-valuemin', String(markmapHeight.min));
  handle.setAttribute('aria-valuemax', String(markmapHeight.max));
  const height = () => parseFloat(graph.style.getPropertyValue('--vm-markmap-height')) || markmapHeight.default;
  const apply = (value: number) => {
    const next = Math.max(markmapHeight.min, Math.min(markmapHeight.max, Math.round(value)));
    setMarkmapHeight(graph, next);
    handle.setAttribute('aria-valuenow', String(next));
  };
  const fit = () => graph.querySelector('svg')?.dispatchEvent(new Event(markmapFitEvent));
  const commit = (reset = false) => {
    if (!graph.isConnected || !source.isConnected || !source.classList.contains('language-markmap')) return;
    const next = withMarkmapHeight(source.textContent || '', reset ? undefined : height());
    if (next !== source.textContent) {
      source.textContent = next;
      submit();
    }
    fit();
  };
  let drag: { id: number; y: number; height: number } | undefined;
  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0 || drag) return;
    event.preventDefault();
    drag = { id: event.pointerId, y: event.clientY, height: height() };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', event => {
    if (drag?.id === event.pointerId) apply(drag.height + event.clientY - drag.y);
  });
  handle.addEventListener('pointerup', event => {
    if (drag?.id !== event.pointerId) return;
    const changed = drag.height !== height();
    drag = undefined;
    if (changed) commit();
  });
  const cancel = (event: PointerEvent) => {
    if (drag?.id !== event.pointerId) return;
    if (graph.isConnected) {
      apply(drag.height);
      fit();
    }
    drag = undefined;
  };
  handle.addEventListener('pointercancel', cancel);
  handle.addEventListener('lostpointercapture', cancel);
  handle.addEventListener('keydown', event => {
    const delta = event.key === 'ArrowUp' ? -24 : event.key === 'ArrowDown' ? 24 : 0;
    if (!delta) return;
    event.preventDefault();
    apply(height() + delta);
    commit();
  });
  handle.addEventListener('dblclick', () => {
    apply(markmapHeight.default);
    commit(true);
  });
  handle.setAttribute('aria-valuenow', String(height()));
  return { handle, graph, source };
}
