import path from 'node:path';
import { stat, readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomBytes } from 'node:crypto';
import { chromium, type Browser, type Page } from 'playwright-core';
import { parseHTML } from 'linkedom';
import { AlignmentType, Bookmark, BorderStyle, Document, ExternalHyperlink, Footer, HeadingLevel, ImageRun, InternalHyperlink, LevelFormat, Packer, PageNumber, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, type IRunOptions } from 'docx';
import { APP_NAME, escapeHTML, type ExportOptions, type Settings, type ThemeDefinition } from './shared';
import { browserCandidates } from './browser';

export type ExportInput = { root: string; markdown: string; sourcePath: string; outputPath: string; options: ExportOptions; settings: Settings; dark: boolean; appearance?: { page?: ThemeDefinition; code?: ThemeDefinition }; signal?: AbortSignal; progress?: (text: string) => void };
export async function findBrowser(configured = ''): Promise<string> {
  for (const candidate of browserCandidates(configured)) { try { if ((await stat(candidate)).isFile()) return candidate; } catch { /* Try the next installed browser. */ } }
  throw new Error(configured ? '指定的浏览器不存在，请检查“设置 → 导出浏览器”。' : '没有找到 Edge 或 Chrome，请安装浏览器或在设置中指定可执行文件路径。');
}
export async function exportDocument(input: ExportInput) {
  const { root, options, signal } = input;
  signal?.throwIfAborted();
  input.progress?.('正在启动本机浏览器…');
  let browser: Browser | undefined;
  const onAbort = () => { void browser?.close(); };
  signal?.addEventListener('abort', onAbort, { once: true });
  try {
    browser = await chromium.launch({ executablePath: await findBrowser(input.settings.browserPath), headless: true, args: ['--allow-file-access-from-files'], timeout: 30000 });
    signal?.throwIfAborted();
    const page = await browser.newPage({ viewport: { width: options.paperSize === 'A3' ? 1123 : options.paperSize === 'Letter' ? 816 : 794, height: 1123 }, deviceScaleFactor: 2 });
    page.setDefaultTimeout(35000);
    await page.goto(pathToFileURL(path.join(root, 'dist/renderer.html')).href);
    await page.waitForFunction(() => !!window.VM_RENDER);
    input.progress?.('正在渲染公式、图表和图片…');
    const baseURL = pathToFileURL(path.dirname(input.sourcePath) + path.sep).href;
    const rendered = await page.evaluate(async payload => window.VM_RENDER(payload), { markdown: input.markdown, baseURL, options, settings: input.settings, dark: input.dark, appearance: input.appearance });
    await inlineImages(page);
    signal?.throwIfAborted();
    let data: Buffer;
    if (options.format === 'pdf') {
      input.progress?.('正在生成 PDF 和书签…');
      data = await page.pdf({ format: options.paperSize, margin: { top: `${options.topMargin}px`, right: '25px', bottom: options.beautify ? '45px' : '25px', left: '25px' }, printBackground: true, outline: options.toc, tagged: true, displayHeaderFooter: options.beautify, headerTemplate: '<span></span>', footerTemplate: options.beautify ? '<div style="font-size:9px;width:100%;text-align:center;color:#888"><span class="pageNumber"></span> / <span class="totalPages"></span></div>' : '<span></span>' });
    } else if (options.format === 'html') {
      input.progress?.('正在嵌入 HTML 样式和字体…');
      const stylesheets = await page.evaluate(() => [...document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>('link[rel=stylesheet],style')].map(e => ({ href: e instanceof HTMLLinkElement ? e.href : '', text: e instanceof HTMLStyleElement ? e.textContent || '' : '' })));
      let css = '';
      for (const sheet of stylesheets) css += sheet.href.startsWith('file:') ? await embedCSS(fileURLToPath(sheet.href)) : sheet.text;
      const html = await page.locator('#content').evaluate(e => e.outerHTML);
      const bodyStyle = await page.locator('body').getAttribute('style') || '';
      data = Buffer.from(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'; font-src data:; media-src https: http:;"><title>${escapeHTML(path.basename(input.sourcePath).replace(/\.(md|markdown)$/i, ''))}</title><style>${css.replace(/<\/style/gi, '<\\/style')}</style></head><body class="${options.beautify ? 'beautify' : ''}" style="${escapeHTML(bodyStyle)}">${html}</body></html>`, 'utf8');
    } else {
      input.progress?.('正在生成可编辑 Word 文档…');
      await rasterizeForWord(page);
      const html = await page.locator('#content').innerHTML();
      data = await wordDocument(html, options, input.settings, options.theme ? rendered : undefined);
    }
    signal?.throwIfAborted();
    const temp = `${input.outputPath}.${randomBytes(5).toString('hex')}.tmp`;
    try { await writeFile(temp, data); signal?.throwIfAborted(); await rename(temp, input.outputPath); }
    catch (error) { await unlink(temp).catch(() => {}); throw error; }
    return { path: input.outputPath, bytes: data.length };
  } catch (error) {
    if (signal?.aborted) throw new Error('导出已取消。');
    throw error;
  } finally { signal?.removeEventListener('abort', onAbort); await browser?.close(); }
}
const mime = (filename: string) => ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' }[path.extname(filename).toLowerCase()] || 'application/octet-stream');
async function embedCSS(filename: string): Promise<string> {
  const css = await readFile(filename, 'utf8');
  const matches = [...css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)];
  const replacements = await Promise.all(matches.map(async match => {
    if (/^(data:|https?:|#)/.test(match[1])) return [match[0], match[0]];
    const asset = fileURLToPath(new URL(match[1], pathToFileURL(filename)));
    const data = await readFile(asset);
    return [match[0], `url("data:${mime(asset)};base64,${data.toString('base64')}")`];
  }));
  let result = css; for (const [from, to] of replacements) result = result.replace(from, to);
  return result;
}
async function inlineImages(page: Page) {
  const images = page.locator('#content img');
  for (let i = 0; i < await images.count(); i++) {
    const image = images.nth(i), src = await image.getAttribute('src');
    if (!src || src.startsWith('data:')) continue;
    const resolved = await image.evaluate(e => (e as HTMLImageElement).src);
    let data: Buffer, type: string;
    if (resolved.startsWith('file:')) { data = await readFile(fileURLToPath(resolved)); type = mime(fileURLToPath(resolved)); }
    else {
      const response = await page.request.get(resolved, { timeout: 15000 });
      if (!response.ok()) throw new Error(`无法读取图片：${resolved} (${response.status()})`);
      data = await response.body(); type = response.headers()['content-type']?.split(';')[0] || 'image/png';
    }
    if (data.length > 20 * 1024 * 1024) throw new Error('导出图片超过 20MB。');
    await image.evaluate((e, url) => { const img = e as HTMLImageElement; img.width = img.clientWidth || img.naturalWidth; img.height = img.clientHeight || img.naturalHeight; img.src = url; }, `data:${type};base64,${data.toString('base64')}`);
  }
  const objects = page.locator('#content object[data]');
  for (let i = 0; i < await objects.count(); i++) {
    const object = objects.nth(i), src = await object.getAttribute('data');
    if (!src || !src.startsWith('https://www.plantuml.com/')) throw new Error('不支持导出此嵌入对象。');
    const response = await page.request.get(src, { timeout: 15000 });
    if (!response.ok()) throw new Error('PlantUML 图表下载失败。');
    const buffer = await response.body();
    await object.evaluate((e, data) => { const image = document.createElement('img'); image.src = data; image.alt = 'PlantUML 图表'; e.replaceWith(image); }, `data:image/svg+xml;base64,${buffer.toString('base64')}`);
  }
  await page.evaluate(async () => { await Promise.all([...document.querySelectorAll<HTMLImageElement>('#content img')].map(img => img.decode())); });
}
async function rasterizeForWord(page: Page) {
  const selector = '.language-math,.language-mermaid,.language-echarts,.language-mindmap,.language-markmap,.language-flowchart,.language-graphviz,.language-wavedrom,.language-abc,.language-smiles,object';
  const elements = page.locator(`#content :is(${selector})`);
  const count = await elements.count();
  for (let i = count - 1; i >= 0; i--) {
    const element = elements.nth(i);
    const bounds = await element.boundingBox(); if (!bounds || bounds.width === 0 || bounds.height === 0) continue;
    const bytes = await element.screenshot({ type: 'png', animations: 'disabled' });
    await element.evaluate((e, payload) => {
      const image = document.createElement('img'); image.src = payload.src; image.width = payload.width; image.height = payload.height;
      image.alt = e.classList.contains('language-math') ? '公式' : '图表';
      image.dataset.wordRaster = '1';
      if (e.parentElement?.tagName === 'PRE') e.parentElement.replaceWith(image); else e.replaceWith(image);
    }, { src: `data:image/png;base64,${bytes.toString('base64')}`, width: Math.ceil(bounds.width), height: Math.ceil(bounds.height) });
  }
  for (const image of await page.locator('#content img').all()) {
    const src = await image.getAttribute('src');
    if (src?.startsWith('data:image/svg+xml') || src?.startsWith('data:image/webp')) {
      const bounds = await image.boundingBox(); if (!bounds) continue;
      const data = await image.screenshot({ type: 'png' });
      await image.evaluate((e, payload) => { const img = e as HTMLImageElement; img.src = payload.src; img.width = payload.width; img.height = payload.height; }, { src: `data:image/png;base64,${data.toString('base64')}`, width: Math.ceil(bounds.width), height: Math.ceil(bounds.height) });
    }
  }
}
function hexColor(value: string | undefined): string | undefined {
  if (!value) return;
  const short = value.match(/^#([\da-f]{3})$/i); if (short) return [...short[1]].map(x => x + x).join('').toUpperCase();
  const hex = value.match(/^#([\da-f]{6})/i); if (hex) return hex[1].toUpperCase();
  const rgb = value.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/); if (rgb) return rgb.slice(1).map(x => Number(x).toString(16).padStart(2, '0')).join('').toUpperCase();
  return undefined;
}
export async function wordDocument(html: string, options: ExportOptions, settings: Settings, theme?: { bg: string; fg: string }): Promise<Buffer> {
  const { document } = parseHTML(`<html><body>${html}</body></html>`);
  const maxWidth = options.paperSize === 'A3' ? 1040 : options.paperSize === 'Letter' ? 766 : 744;
  const defaultBodyFont = process.platform === 'darwin' ? 'PingFang SC' : 'Microsoft YaHei';
  const defaultCodeFont = process.platform === 'darwin' ? 'Menlo' : 'Consolas';
  const run = (node: any, style: IRunOptions = {}): any[] => {
    if (node.nodeType === 3) return node.textContent ? [new TextRun({ ...style, text: node.textContent })] : [];
    if (node.nodeType !== 1) return [];
    const tag = node.tagName.toLowerCase(); if (['script', 'style', 'nav'].includes(tag)) return [];
    const next: { -readonly [K in keyof IRunOptions]: IRunOptions[K] } = { ...style };
    if (['strong', 'b'].includes(tag)) next.bold = true;
    if (['em', 'i'].includes(tag)) next.italics = true;
    if (['del', 's', 'strike'].includes(tag)) next.strike = true;
    if (tag === 'code') { next.font = settings.codeFontFamily || defaultCodeFont; next.shading = { fill: 'F2F3F5' }; }
    if (tag === 'sup') next.superScript = true;
    if (tag === 'sub') next.subScript = true;
    if (tag === 'mark') next.shading = { fill: 'FFF176' };
    const color = hexColor(node.style?.color), background = hexColor(node.style?.backgroundColor);
    if (color) next.color = color;
    if (background) next.shading = { fill: background };
    const fontSize = node.style?.fontSize?.match(/^(\d+(?:\.\d+)?)(px|pt)$/);
    if (fontSize) next.size = Math.round(Number(fontSize[1]) * (fontSize[2] === 'px' ? 1.5 : 2));
    if (tag === 'br') return [new TextRun({ ...next, break: 1 })];
    if (tag === 'input') return [new TextRun({ ...next, text: node.hasAttribute('checked') ? '☑ ' : '☐ ' })];
    if (tag === 'img') {
      const src = node.getAttribute('src') || '', match = src.match(/^data:image\/(png|jpe?g|gif|bmp);base64,(.+)$/s);
      if (!match) return [new TextRun({ text: `[${node.getAttribute('alt') || '图片'}]`, italics: true })];
      const width = Math.max(1, Number(node.getAttribute('width')) || 400), height = Math.max(1, Number(node.getAttribute('height')) || 250);
      const scale = Math.min(1, maxWidth / width, 900 / height);
      return [new ImageRun({ type: match[1].startsWith('jp') ? 'jpg' : match[1] as 'png' | 'gif' | 'bmp', data: Buffer.from(match[2], 'base64'), transformation: { width: Math.round(width * scale), height: Math.round(height * scale) }, altText: { title: node.getAttribute('alt') || '图片', description: '', name: 'Image' } })];
    }
    const children = [...node.childNodes].flatMap(child => run(child, next));
    if (tag === 'a') {
      const href = node.getAttribute('href') || '';
      if (href.startsWith('#')) return [new InternalHyperlink({ anchor: href.slice(1), children })];
      if (/^(https?:|mailto:)/i.test(href)) return [new ExternalHyperlink({ link: href, children })];
    }
    return children;
  };
  let listInstance = 0;
  const blocks = (parent: any, level = 0): (Paragraph | Table)[] => {
    const result: (Paragraph | Table)[] = [];
    for (const node of [...parent.childNodes] as any[]) {
      if (node.nodeType === 3) { if (node.textContent.trim()) result.push(new Paragraph({ children: run(node) })); continue; }
      if (node.nodeType !== 1) continue;
      const tag = node.tagName.toLowerCase();
      if (tag === 'nav') continue;
      if (/^h[1-6]$/.test(tag)) {
        const children = run(node); const id = node.getAttribute('id');
        result.push(new Paragraph({ heading: `Heading${tag[1]}` as typeof HeadingLevel.HEADING_1, children: id ? [new Bookmark({ id, children })] : children }));
      } else if (tag === 'table') {
        const border = { style: BorderStyle.SINGLE, size: 4, color: 'D0D7DE' };
        result.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [...node.querySelectorAll('tr')].map((tr: any) => new TableRow({ tableHeader: !!tr.querySelector('th'), children: [...tr.children].map((td: any) => new TableCell({ children: blocks(td).length ? blocks(td) : [new Paragraph({ children: run(td, td.tagName === 'TH' ? { bold: true } : {}) })], borders: { top: border, bottom: border, left: border, right: border }, shading: td.tagName === 'TH' ? { fill: 'EFF2F5' } : undefined })) })) }));
      } else if (tag === 'ul' || tag === 'ol') {
        const instance = ++listInstance;
        for (const li of [...node.children] as any[]) {
          const inline = [...li.childNodes].filter((n: any) => !['UL', 'OL'].includes(n.tagName));
          result.push(new Paragraph({ children: inline.flatMap((child: any) => run(child)), numbering: { reference: tag === 'ol' ? 'numbered' : 'bullets', level: Math.min(level, 8), instance } }));
          for (const nested of [...li.children].filter((n: any) => ['UL', 'OL'].includes(n.tagName))) { const container = document.createElement('div'); container.append(nested.cloneNode(true)); result.push(...blocks(container, level + 1)); }
        }
      } else if (tag === 'pre') {
        for (const line of (node.textContent || '').split('\n')) result.push(new Paragraph({ children: [new TextRun({ text: line || ' ', font: settings.codeFontFamily || defaultCodeFont, size: Math.round(options.fontSize * 1.4) })], shading: { fill: 'F2F3F5' }, spacing: { after: 0 } }));
      } else if (tag === 'blockquote') {
        result.push(new Paragraph({ children: run(node), indent: { left: 360 }, border: { left: { style: BorderStyle.SINGLE, size: 16, color: '9DB8BE', space: 10 } } }));
      } else if (tag === 'hr') result.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D0D7DE' } } }));
      else if (['div', 'section', 'article'].includes(tag) && node.querySelector('p,h1,h2,h3,h4,h5,h6,table,ul,ol,pre')) result.push(...blocks(node, level));
      else result.push(new Paragraph({ children: run(node) }));
    }
    return result;
  };
  const children: (Paragraph | Table)[] = [];
  const headings = [...document.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]')];
  if (options.toc && headings.length) {
    children.push(new Paragraph({ text: '目录', heading: HeadingLevel.TITLE }));
    for (const h of headings) children.push(new Paragraph({ children: [new InternalHyperlink({ anchor: h.id, children: [new TextRun({ text: h.textContent || '', color: '007C91' })] })], indent: { left: (Number(h.tagName[1]) - 1) * 240 } }));
    children.push(new Paragraph({ text: '' }));
  }
  children.push(...blocks(document.body));
  const pageSizes = { A4: [11906, 16838], A3: [16838, 23811], Letter: [12240, 15840] };
  const [width, height] = pageSizes[options.paperSize];
  const doc = new Document({
    creator: APP_NAME, title: 'Markdown Document', background: theme ? { color: hexColor(theme.bg) } : undefined,
    styles: { default: { document: { run: { font: options.font || settings.fontFamily || defaultBodyFont, size: Math.round(options.fontSize * 1.5), color: theme ? hexColor(theme.fg) : undefined }, paragraph: { spacing: { after: 120, line: Math.round(settings.lineHeight * 240) } } } } },
    numbering: { config: ['bullets', 'numbered'].map(reference => ({ reference, levels: Array.from({ length: 9 }, (_, level) => ({ level, format: reference === 'bullets' ? LevelFormat.BULLET : LevelFormat.DECIMAL, text: reference === 'bullets' ? '•' : `%${level + 1}.`, alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360 * (level + 1), hanging: 240 } } } })) })) },
    sections: [{ properties: { page: { size: { width, height }, margin: { top: Math.round(options.topMargin * 15), right: 375, bottom: 375, left: 375 } } }, footers: options.beautify ? { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES] })] })] }) } : undefined, children }],
  });
  return Packer.toBuffer(doc);
}
