import { processCodeRender } from '@local/code';
import { escapeHTML as esc } from '../shared';
import { icon } from './icons';
import { viewportLayer } from './viewportLayer';
import { markmapSource } from '../../vditor-master/src/ts/markdown/markmapSize';
import { createMarkmapResize } from './markmapBlocks';

const languages = ['', 'plaintext', 'javascript', 'typescript', 'json', 'json5', 'html', 'css', 'python', 'java', 'c', 'cpp', 'csharp', 'go', 'rust', 'bash', 'powershell', 'sql', 'yaml', 'xml', 'markdown', 'vue', 'jsx', 'tsx', 'kotlin', 'swift', 'ruby', 'php', 'diff', 'dockerfile', 'mermaid', 'graphviz', 'echarts', 'flowchart', 'wavedrom', 'markmap', 'mindmap', 'plantuml', 'abc', 'smiles'];

export function installCodeBlocks(editor: any, options: {
  openThemeMenu: (anchor: HTMLElement) => void;
  rpc: (type: string, data?: object) => Promise<any>;
  submit: () => void;
  toast: (text: string, error?: boolean) => void;
}) {
  const bars = new Map<HTMLElement, HTMLElement>();
  const resizers = new Map<HTMLElement, ReturnType<typeof createMarkmapResize>>();
  const layers = new Map<HTMLElement, HTMLElement>();
  let scheduled = false;
  const sourceOf = (block: HTMLElement) => block.querySelector<HTMLElement>('pre > code');
  const languageOf = (source: HTMLElement) => source.className.match(/(?:^|\s)language-([^\s]+)/)?.[1] || '';
  const render = (block: HTMLElement) => {
    const preview = block.querySelector<HTMLElement>('.vditor-ir__preview,.vditor-wysiwyg__preview');
    const source = sourceOf(block);
    if (preview && source) { preview.innerHTML = source.outerHTML; processCodeRender(preview, editor.vditor); }
    options.submit(); schedule();
  };
  function createBar(block: HTMLElement, layer: HTMLElement) {
    const bar = document.createElement('div'); bar.className = 'vm-code-toolbar';
    bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', '代码块操作');
    bar.innerHTML = `<select class="vm-code-language" aria-label="代码语言"></select><span class="vm-code-actions"><button type="button" class="vm-code-theme" aria-label="代码块主题" aria-haspopup="menu" title="代码块主题（所有代码块）">${icon('theme')}</button>${[['trash', '删除代码块'], ['copy', '复制代码'], ['paste', '粘贴代码']].map(([id, label]) => `<button type="button" data-code-action="${id}" aria-label="${label}" title="${label}">${icon(id)}</button>`).join('')}</span>`;
    bar.addEventListener('pointerdown', event => { if ((event.target as Element).closest('button')) event.preventDefault(); });
    bar.querySelector<HTMLSelectElement>('.vm-code-language')!.onchange = event => {
      const language = (event.target as HTMLSelectElement).value, source = sourceOf(block)!;
      if (languageOf(source) === 'markmap' && language !== 'markmap') {
        const code = markmapSource(source.textContent || '').code;
        if (code !== source.textContent) source.textContent = code;
      }
      source.className = language ? `language-${language}` : '';
      const info = block.querySelector('[data-type="code-block-info"]'); if (info) info.textContent = '\u200b' + language;
      render(block);
    };
    bar.querySelector<HTMLButtonElement>('.vm-code-theme')!.onclick = event => options.openThemeMenu(event.currentTarget as HTMLElement);
    bar.addEventListener('click', async event => {
      const action = (event.target as Element).closest<HTMLElement>('[data-code-action]')?.dataset.codeAction;
      if (!action) return;
      const source = sourceOf(block)!;
      try {
        if (action === 'copy') {
          await options.rpc('clipboardWrite', { text: source.textContent || '' }); options.toast('代码已复制');
        } else if (action === 'paste') {
          const selection = window.getSelection();
          const selected = selection?.rangeCount && source.contains(selection.getRangeAt(0).commonAncestorContainer) ? selection.getRangeAt(0).cloneRange() : undefined;
          const text = await options.rpc('clipboardRead');
          if (!text || !source.isConnected) return;
          const validSelection = selected?.startContainer.isConnected && source.contains(selected.commonAncestorContainer);
          const range = validSelection ? selected! : document.createRange();
          if (!validSelection) { range.selectNodeContents(source); range.collapse(false); }
          range.deleteContents();
          const node = document.createTextNode(String(text).replace(/\r\n?/g, '\n')); range.insertNode(node); range.setStartAfter(node); range.collapse(true);
          source.parentElement!.style.display = 'block'; block.classList.add('vditor-ir__node--expand');
          const surface = editor.vditor[editor.vditor.currentMode].element; surface.focus({ preventScroll: true });
          selection?.removeAllRanges(); selection?.addRange(range);
          render(block);
        } else if (action === 'trash') {
          const surface = block.closest<HTMLElement>('[contenteditable=true]')!;
          const next = block.nextElementSibling, previous = block.previousElementSibling;
          block.remove();
          if (!surface.children.length) surface.innerHTML = '<p data-block="0">\n</p>';
          surface.focus({ preventScroll: true });
          const range = document.createRange(); range.selectNodeContents(next || previous || surface.firstElementChild!); range.collapse(!!next);
          const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range);
          options.submit(); schedule();
        }
      } catch (error) { options.toast((error as Error).message, true); }
    });
    layer.append(bar); bars.set(block, bar);
    return bar;
  }
  function refresh() {
    scheduled = false;
    const mode = editor.vditor.currentMode;
    const surface = mode === 'sv' ? null : editor.vditor[mode].element as HTMLElement;
    for (const [block, bar] of bars) if (!block.isConnected || !surface?.contains(block)) { bar.remove(); bars.delete(block); }
    for (const [block, resize] of resizers) {
      if (!surface?.contains(block) || !block.contains(resize.graph) || !resize.source.classList.contains('language-markmap')) {
        resize.handle.remove();
        resizers.delete(block);
      }
    }
    if (!surface) return;
    const { layer, origin } = viewportLayer(surface.parentElement!, layers, 'vm-code-layer');
    for (const block of surface.querySelectorAll<HTMLElement>('[data-type="code-block"]')) {
      const source = sourceOf(block); if (!source) continue;
      if (!block.classList.contains('vm-code-block')) block.classList.add('vm-code-block');
      const bar = bars.get(block) || createBar(block, layer);
      const rect = block.getBoundingClientRect();
      bar.style.transform = `translate(${rect.left - origin.left + 8}px,${rect.top - origin.top + 6}px)`;
      bar.style.width = `${Math.max(0, rect.width - 16)}px`;
      bar.hidden = rect.bottom < origin.top || rect.top > origin.bottom;
      const language = languageOf(source), select = bar.querySelector<HTMLSelectElement>('.vm-code-language')!;
      const graph = language === 'markmap' && block.querySelector<HTMLElement>(':scope > :is(.vditor-ir__preview,.vditor-wysiwyg__preview) > div.language-markmap:has(> svg)');
      if (graph) {
        let resize = resizers.get(block);
        if (!resize || resize.graph !== graph || resize.source !== source) {
          resize?.handle.remove();
          resize = createMarkmapResize(graph, source, options.submit);
          resizers.set(block, resize);
          layer.append(resize.handle);
        }
        const bounds = graph.getBoundingClientRect();
        const bottom = bounds.bottom - origin.top;
        resize.handle.style.transform = `translate(${bounds.left - origin.left + bounds.width / 2 - 24}px,${bottom}px)`;
        resize.handle.hidden = !bounds.height || bottom < 0 || bottom > origin.height - 12;
      }
      const all = [...new Set([...languages, ...((window as any).hljs?.listLanguages() || []), language])];
      const choices = all.map(value => `<option value="${esc(value)}">${esc(value || '纯文本')}</option>`).join('');
      if (select.dataset.choices !== choices) { select.innerHTML = choices; select.dataset.choices = choices; }
      select.value = language;
    }
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(refresh); } }
  const observer = new MutationObserver(schedule);
  for (const mode of ['ir', 'wysiwyg']) {
    const surface = editor.vditor[mode].element;
    observer.observe(surface, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'data-render'] });
    surface.addEventListener('scroll', schedule, { passive: true });
    surface.parentElement.addEventListener('scroll', schedule, { passive: true });
    new ResizeObserver(schedule).observe(surface);
  }
  window.addEventListener('resize', schedule);
  schedule();
  return { refresh: schedule };
}
