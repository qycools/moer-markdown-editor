import { inlineToken, templateFor } from './contentMarkup';

export function installLocalImageFallback(root: HTMLElement, resolve: (source: string) => Promise<string | null>) {
  const attempted = new WeakMap<HTMLImageElement, string>();
  const pending = new Map<string, Promise<string | null>>();
  root.addEventListener('error', async event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.hasAttribute('srcset')) return;
    const source = image.getAttribute('src');
    if (!source || source.startsWith('//') || /^(?!file:|[a-z]:[\\/]|[a-z]:%5c)[a-z][a-z\d+.-]*:/i.test(source) || attempted.get(image) === source) return;
    attempted.set(image, source);
    let request = pending.get(source);
    if (!request) {
      request = resolve(source).catch(() => null).finally(() => pending.delete(source));
      pending.set(source, request);
    }
    const data = await request;
    if (typeof data === 'string' && data && image.isConnected && image.getAttribute('src') === source && !image.hasAttribute('srcset')) {
      image.dataset.vmLocalImage = '1';
      image.srcset = data + ' 1x';
    }
  }, true);
}

function imageTarget(image: HTMLImageElement) {
  const node = image.closest<HTMLElement>('.vm-inline-image, [data-type="img"]') || image;
  const block = image.closest<HTMLElement>('[data-type="html-block"]');
  const inline = node.matches('.vm-inline-image') ? node.querySelector('[data-type="html-inline"]') : null;
  const preview = block?.querySelector<HTMLElement>(':scope > .vditor-ir__preview, :scope > .vditor-wysiwyg__preview');
  const code = block?.querySelector(':scope > pre:first-child > code');
  if (preview?.contains(image) && code) {
    const markup = templateFor(code.textContent || '');
    const source = markup.content.querySelectorAll('img')[[...preview.querySelectorAll('img')].indexOf(image)];
    if (!source || source.getAttribute('src') !== image.getAttribute('src')) return;
    return { node: image, source, html: { markup, code, block: block! } };
  }
  if (inline) {
    const source = templateFor(inline.textContent?.replace(/^\u200b/, '') || '').content.querySelector('img');
    if (source) return { node, source, inline: true };
  }
  const source = document.createElement('img');
  for (const name of ['src', 'alt', 'title', 'width', 'height', 'style']) {
    if (image.hasAttribute(name)) source.setAttribute(name, image.getAttribute(name)!);
  }
  const title = node.querySelector(':scope > .vditor-ir__marker--title')?.textContent?.trim();
  if (title) source.title = title.slice(1, -1);
  return { node, source };
}

function sizedMarkup(image: HTMLImageElement) {
  return image.outerHTML.replaceAll('|', '&#124;').replace(/\r?\n/g, '&#10;');
}

export function canEditImage(image: HTMLImageElement) {
  return image.hasAttribute('src') && !image.closest('[data-type="code-block"], .vditor-copy');
}

export function fillImageTools(panel: HTMLElement, image: HTMLImageElement, editor: any, options: {
  close: () => void;
  commit: (caret: Range) => void;
  copy: (text: string) => Promise<void>;
  toast: (text: string, error?: boolean) => void;
}) {
  const target = imageTarget(image);
  if (!target) {
    panel.textContent = '无法匹配 HTML 源码中的图片。';
    return;
  }
  const { node, source, html, inline } = target;
  const { lute, currentMode: mode } = editor.vditor;
  panel.innerHTML = `<form class="vm-image-form">
    <div class="vm-image-fields">
      <label>宽度 (px)<input name="width" type="number" min="1" max="100000" required></label>
      <label>高度 (px)<input name="height" type="number" min="1" max="100000" required></label>
      <label>比例 (%)<input name="scale" type="number" min="0.1" step="0.1" value="100"></label>
    </div>
    <output class="vm-image-status" hidden></output>
    <div class="vm-content-actions">
      <button type="button" data-image-action="copy" title="复制图片引用">复制</button>
      <button type="button" data-image-action="delete">删除</button>
      <button type="submit" class="primary" data-image-action="apply">应用</button>
    </div>
  </form>`;
  const form = panel.querySelector('form')!;
  const width = form.elements.namedItem('width') as HTMLInputElement;
  const height = form.elements.namedItem('height') as HTMLInputElement;
  const scale = form.elements.namedItem('scale') as HTMLInputElement;
  const status = panel.querySelector<HTMLOutputElement>('output')!;
  const dimension = (name: 'width' | 'height') => {
    const pixels = source.style[name].match(/^(\d+(?:\.\d+)?)px$/)?.[1] || source.getAttribute(name);
    return pixels && /^\d+(?:\.\d+)?$/.test(pixels) ? Math.round(Number(pixels)) : 0;
  };
  const naturalRatio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 0;
  const setWidth = dimension('width'), setHeight = dimension('height');
  const baseWidth = setWidth || (setHeight && naturalRatio ? Math.round(setHeight * naturalRatio) : image.naturalWidth);
  const baseHeight = setHeight || (setWidth && naturalRatio ? Math.round(setWidth / naturalRatio) : image.naturalHeight);
  width.value = baseWidth ? String(baseWidth) : '';
  height.value = baseHeight ? String(baseHeight) : '';
  scale.disabled = !baseWidth || !baseHeight;
  scale.title = '以打开浮窗时的尺寸为 100%';
  const updateStatus = () => {
    status.hidden = !image.complete || !!image.naturalWidth;
    status.textContent = status.hidden ? '' : `图片加载失败：${source.getAttribute('src')}`;
    status.title = status.textContent;
  };
  if (!image.naturalWidth) image.addEventListener('load', updateStatus, { once: true });
  updateStatus();
  scale.oninput = () => {
    const factor = scale.valueAsNumber / 100;
    if (!(factor > 0)) return;
    width.value = String(Math.max(1, Math.round(baseWidth * factor)));
    height.value = String(Math.max(1, Math.round(baseHeight * factor)));
  };
  width.oninput = height.oninput = () => { scale.value = ''; };
  const caret = () => { const range = document.createRange(); range.setStartBefore(node); range.collapse(true); return range; };

  form.onsubmit = event => {
    event.preventDefault();
    if (!node.isConnected || !form.reportValidity()) return;
    const range = caret();
    for (const [name, value] of [['width', width.value], ['height', height.value]]) {
      source.setAttribute(name, value);
      source.style.removeProperty(name);
    }
    if (!source.style.length) source.removeAttribute('style');
    if (html) {
      html.code.textContent = html.markup.innerHTML;
      for (const name of ['width', 'height', 'style']) {
        if (source.hasAttribute(name)) image.setAttribute(name, source.getAttribute(name)!);
        else image.removeAttribute(name);
      }
    } else {
      const replacement = inlineToken(lute, mode, sizedMarkup(source));
      if (!replacement) return;
      node.replaceWith(replacement);
    }
    options.close();
    options.commit(range);
  };
  panel.querySelector<HTMLButtonElement>('[data-image-action=copy]')!.onclick = () => {
    const toMarkdown = mode === 'ir' ? lute.VditorIRDOM2Md : lute.VditorDOM2Md;
    const text = (html || inline) ? sizedMarkup(source) : toMarkdown(node.outerHTML).trim();
    void options.copy(text).then(() => options.toast('图片引用已复制'), error => options.toast(error.message, true));
  };
  panel.querySelector<HTMLButtonElement>('[data-image-action=delete]')!.onclick = () => {
    if (!node.isConnected) return;
    const range = caret();
    if (html) {
      source.remove();
      html.code.textContent = html.markup.innerHTML;
      if (!html.markup.innerHTML.trim()) html.block.remove();
    }
    node.remove();
    options.close();
    options.commit(range);
  };
  width.focus({ preventScroll: true });
}
