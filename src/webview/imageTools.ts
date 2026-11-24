import { inlineToken, templateFor } from './contentMarkup';

const clipboardMimeAliases: Record<string, string> = { 'image/x-png': 'image/png', 'image/x-ms-bmp': 'image/bmp', 'image/jpg': 'image/jpeg' };

export function clipboardImages(clipboard: DataTransfer | null) {
  if (!clipboard) return [];
  const imageFiles = (files: (File | null)[]) => files.flatMap(file => {
    if (!file) return [];
    const type = clipboardMimeAliases[file.type] || file.type;
    return !type.startsWith('image/') ? [] : [type === file.type ? file : new File([file], file.name, { type })];
  });
  const files = imageFiles([...clipboard.files]);
  if (files.length) return files;
  const items = imageFiles([...clipboard.items].filter(item => item.kind === 'file').map(item => item.getAsFile()));
  if (items.length) return items;
  const html = clipboard.getData?.('text/html');
  if (!html) return [];
  const fragment = templateFor(html).content;
  if (fragment.textContent?.trim()) return [];
  return [...fragment.querySelectorAll('img[src]')].flatMap(image => {
    const data = /^data:(image\/(png|jpeg|gif|webp|bmp));base64,([\w+/=]+)$/i.exec(image.getAttribute('src') || '');
    if (!data || data[3].length > 28 * 1024 * 1024) return [];
    try { return [new File([Uint8Array.from(atob(data[3]), character => character.charCodeAt(0))], `clipboard.${data[2]}`, { type: data[1].toLowerCase() })]; }
    catch { return []; }
  });
}

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
  for (const name of ['src', 'alt', 'title', 'width', 'height', 'style', 'srcset', 'sizes']) {
    if (name === 'srcset' && image.dataset.vmLocalImage) continue;
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

type ImageChange = { width: number; height: number } | { align: 'left' | 'center' | 'right' };
export type CommitImageEdit = (node: HTMLElement, replacement: string, update: () => void) => boolean;

export function changeImage(image: HTMLImageElement, change: ImageChange, editor: any, commit: CommitImageEdit) {
  const target = imageTarget(image);
  if (!target || !target.node.isConnected) return;
  const { node, source, html } = target;
  if ('width' in change) {
    source.width = change.width; source.height = change.height;
    source.style.removeProperty('width');
    source.style.height = 'auto';
  } else {
    source.style.display = 'block';
    for (const property of ['float', 'margin-inline', 'margin-inline-start', 'margin-inline-end']) source.style.removeProperty(property);
    source.style.marginLeft = change.align === 'left' ? '0' : 'auto';
    source.style.marginRight = change.align === 'right' ? '0' : 'auto';
  }
  if (html) {
    const markup = html.markup.innerHTML;
    if (commit(html.block, markup, () => {
      html.code.textContent = markup;
      for (const name of ['width', 'height', 'style']) {
        if (source.hasAttribute(name)) image.setAttribute(name, source.getAttribute(name)!);
        else image.removeAttribute(name);
      }
    })) return image;
    return;
  }
  const markup = sizedMarkup(source);
  const replacement = inlineToken(editor.vditor.lute, editor.vditor.currentMode, markup);
  const updated = replacement?.querySelector('img');
  if (!replacement || !updated) return;
  if (commit(node, markup, () => node.replaceWith(replacement))) return updated;
}

export function imageReference(image: HTMLImageElement, editor: any) {
  const target = imageTarget(image);
  if (!target) return;
  if (target.html || target.inline || image.dataset.type === 'link-ref' ||
    target.node.querySelector(':scope > .vditor-ir__marker--link')?.textContent?.startsWith('[')) return sizedMarkup(target.source);
  const { lute, currentMode } = editor.vditor;
  return (currentMode === 'ir' ? lute.VditorIRDOM2Md : lute.VditorDOM2Md)(target.node.outerHTML).trim();
}

export function removeImage(image: HTMLImageElement, commit: CommitImageEdit) {
  const target = imageTarget(image);
  if (!target?.node.isConnected) return;
  const range = document.createRange(); range.setStartBefore(target.node); range.collapse(true);
  if (target.html) {
    target.source.remove();
    const { html } = target;
    const markup = html.markup.innerHTML;
    if (commit(html.block, markup, () => {
      html.code.textContent = markup;
      if (!markup.trim()) html.block.remove();
      else image.remove();
    })) return range;
  } else if (commit(target.node, '', () => target.node.remove())) {
    return range;
  }
}
