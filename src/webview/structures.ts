export function installStructures(editor: any, submit: () => void) {
  let scheduled = false;
  const roots = () => ['ir', 'wysiwyg'].map(mode => editor.vditor[mode].element as HTMLElement);
  function refresh() {
    scheduled = false;
    for (const surface of roots()) for (const block of surface.querySelectorAll<HTMLElement>('[data-type="html-block"]')) {
      const preview = block.querySelector<HTMLElement>('.vditor-ir__preview,.vditor-wysiwyg__preview');
      const structure = preview?.querySelector<HTMLElement>('[data-vm-block="columns"],[data-vm-block="fold"]');
      if (!structure || structure.classList.contains('vm-structure')) continue;
      block.classList.add('vm-structure-block'); block.classList.remove('vditor-ir__node--expand');
      structure.classList.add('vm-structure'); structure.contentEditable = 'false';
      for (const child of structure.children) {
        (child as HTMLElement).contentEditable = 'true'; (child as HTMLElement).dataset.vmEditable = '1';
      }
    }
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(refresh); } }
  const observer = new MutationObserver(schedule);
  for (const surface of roots()) {
    observer.observe(surface, { childList: true, subtree: true });
    for (const name of ['click', 'keydown', 'keyup', 'paste'] as const) surface.addEventListener(name, event => {
      if ((event.target as Element).closest?.('.vm-structure')) event.stopImmediatePropagation();
    }, true);
    surface.addEventListener('input', event => {
      const structure = (event.target as Element).closest?.<HTMLElement>('.vm-structure');
      if (!structure) return;
      event.stopImmediatePropagation();
      const block = structure.closest('[data-type="html-block"]')!, source = block.querySelector('pre>code')!;
      const copy = structure.cloneNode(true) as HTMLElement;
      copy.classList.remove('vm-structure'); if (!copy.className) copy.removeAttribute('class');
      copy.removeAttribute('contenteditable');
      copy.querySelectorAll('[data-vm-editable]').forEach(node => { node.removeAttribute('data-vm-editable'); node.removeAttribute('contenteditable'); });
      if (copy.tagName === 'DETAILS') copy.setAttribute('open', '');
      source.textContent = copy.outerHTML.replace(/\n/g, ''); submit();
    }, true);
  }
  schedule(); return { refresh: schedule };
}
