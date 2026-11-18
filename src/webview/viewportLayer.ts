export function viewportLayer(wrapper: HTMLElement, layers: Map<HTMLElement, HTMLElement>, className: string) {
  const parent = wrapper.parentElement!;
  let layer = layers.get(wrapper);
  if (!layer) { layer = document.createElement('div'); layer.className = className; parent.append(layer); layers.set(wrapper, layer); }
  const origin = wrapper.getBoundingClientRect(), bounds = parent.getBoundingClientRect();
  Object.assign(layer.style, { left: `${origin.left - bounds.left}px`, top: `${origin.top - bounds.top}px`, width: `${wrapper.clientWidth}px`, height: `${wrapper.clientHeight}px` });
  return { layer, origin };
}
