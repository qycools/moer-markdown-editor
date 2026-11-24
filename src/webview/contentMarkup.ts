import { decorateInlineStyles, undecorateInlineStyles } from './colors';
import { applyTableWidths } from './tableWidths';

const inlineSelector = '[data-type="html-inline"]';
export const tableWidthMarkup = '<wbr data-moye-table="auto">';

export function templateFor(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

function decorateInline(root: ParentNode) {
  for (const token of root.querySelectorAll<HTMLElement>(inlineSelector)) {
    const markup = (token.textContent || '').replace(/^\u200b/, '').trim();
    if (markup === tableWidthMarkup && token.closest('th')) {
      token.dataset.moyeTable = 'auto';
      continue;
    }
    const width = /^<wbr data-moye-col-width="(\d{1,4})">$/.exec(markup);
    if (width && token.closest('th')) { token.dataset.moyeColWidth = width[1]; continue; }
    if (!/^<img\s/i.test(markup)) continue;
    const fragment = templateFor(markup).content;
    const source = fragment.firstChild;
    if (!(source instanceof HTMLImageElement) || fragment.childNodes.length !== 1 || !source.getAttribute('src')) continue;
    const image = document.createElement('img');
    for (const name of ['src', 'alt', 'title', 'width', 'height', 'style', 'srcset', 'sizes']) {
      if (source.hasAttribute(name)) image.setAttribute(name, source.getAttribute(name)!);
    }
    const wrapper = document.createElement('span');
    wrapper.className = 'vm-inline-image';
    wrapper.contentEditable = 'false';
    token.before(wrapper);
    wrapper.append(token, image);
  }
}

export function inlineToken(lute: any, mode: string, markup: string) {
  const toDOM = mode === 'ir' ? lute.Md2VditorIRDOM : lute.Md2VditorDOM;
  const root = templateFor(toDOM('x ' + markup)).content;
  return root.querySelector('.vm-inline-image') || root.querySelector(inlineSelector);
}

export function stripImageFallbacks(root: ParentNode) {
  for (const image of root.querySelectorAll('img[data-vm-local-image]')) {
    image.removeAttribute('data-vm-local-image');
    image.removeAttribute('srcset');
  }
}

export function installContentAdapter(lute: any) {
  const produced = ['Md2VditorDOM', 'Md2VditorIRDOM', 'HTML2VditorDOM', 'HTML2VditorIRDOM', 'SpinVditorDOM', 'SpinVditorIRDOM'];
  const consumed = ['SpinVditorDOM', 'SpinVditorIRDOM', 'VditorDOM2Md', 'VditorIRDOM2Md', 'VditorDOM2HTML', 'VditorIRDOM2HTML'];
  for (const name of new Set([...produced, ...consumed, 'Md2HTML'])) {
    if (typeof lute[name] !== 'function') continue;
    const original = lute[name].bind(lute);
    lute[name] = (value: string, ...rest: any[]) => {
      let wrapStates: boolean[] | undefined;
      if (consumed.includes(name)) {
        const input = templateFor(value);
        if (value.includes('vm-inline-pending')) {
          for (const wrapper of input.content.querySelectorAll('.vm-inline-pending')) {
            const content = wrapper.matches('strong,em') ? wrapper : wrapper.querySelector('strong,em');
            const text = content?.textContent?.replaceAll('\u200b', '') || '';
            if (!text.trim()) wrapper.replaceWith(text);
            else wrapper.classList.remove('vm-inline-pending');
          }
        }
        if (value.includes('vm-code-wrap')) {
          const blocks = input.content.querySelectorAll('[data-type="code-block"]');
          if (name.startsWith('Spin')) wrapStates = [...blocks].map(block => block.classList.contains('vm-code-wrap'));
          for (const block of blocks) block.classList.remove('vm-code-wrap');
        }
        for (const wrapper of input.content.querySelectorAll('.vm-inline-image')) {
          const token = wrapper.querySelector(inlineSelector);
          if (token) wrapper.replaceWith(token);
        }
        stripImageFallbacks(input.content);
        undecorateInlineStyles(input.content);
        value = input.innerHTML;
      }
      const output = original(value, ...rest);
      if (name === 'Md2HTML' && output.includes('wbrdata-moye-')) {
        const rendered = templateFor(output);
        applyTableWidths(rendered.content);
        return rendered.innerHTML;
      }
      if (!produced.includes(name)) return output;
      const rendered = templateFor(output);
      if (wrapStates) {
        const blocks = rendered.content.querySelectorAll('[data-type="code-block"]');
        if (blocks.length === wrapStates.length) blocks.forEach((block, index) => block.classList.toggle('vm-code-wrap', wrapStates[index]));
      }
      decorateInlineStyles(rendered.content);
      decorateInline(rendered.content);
      applyTableWidths(rendered.content, (attribute, value) => inlineToken(lute, name.includes('IRDOM') ? 'ir' : 'wysiwyg', `<wbr ${attribute}="${value}">`));
      return rendered.innerHTML;
    };
  }
}
