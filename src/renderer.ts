import Vditor from '@local/vditor';
import type { ExportOptions, Settings, ThemeDefinition } from './shared';
import './webview/tables.css';

const cdn = new URL('../media/vditor', location.href).href;
const diagramSelector = '.language-mermaid,.language-echarts,.language-mindmap,.language-markmap,.language-flowchart,.language-graphviz,.language-wavedrom,.language-abc,.language-smiles';
const delayFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
window.VM_RENDER = async ({ markdown, baseURL, options, settings, dark, appearance }: { markdown: string; baseURL: string; options: ExportOptions; settings: Settings; dark: boolean; appearance?: { page?: ThemeDefinition; code?: ThemeDefinition } }) => {
  const article = document.getElementById('content')!;
  const pageTheme = options.theme ? appearance?.page : undefined, codeTheme = options.theme ? appearance?.code : undefined;
  const isDark = options.theme && (pageTheme ? ['dark', 'hc-dark'].includes(pageTheme.kind) : dark);
  await Vditor.preview(article, markdown, {
    cdn, lang: 'zh_CN', mode: isDark ? 'dark' : 'light', anchor: 0,
    markdown: { sanitize: true, toc: true, mark: true, linkBase: baseURL },
    math: { engine: 'KaTeX' }, theme: { current: isDark ? 'dark' : 'light', path: `${cdn}/dist/css/content-theme` },
    hljs: { enable: true, style: isDark ? 'github-dark' : 'github', lineNumber: false },
    transform: (html: string) => {
      const template = document.createElement('template');
      template.innerHTML = html;
      for (const image of template.content.querySelectorAll<HTMLImageElement>('img[src]')) {
        const source = image.getAttribute('src');
        if (source && !/^[a-z][a-z\d+.-]*:/i.test(source)) image.setAttribute('src', new URL(source, baseURL).href);
        const height = image.getAttribute('height');
        if (height && /^\d+$/.test(height) && !image.style.height) {
          image.style.height = height + 'px';
          image.style.objectFit ||= 'contain';
        }
      }
      return template.innerHTML;
    },
  });
  const bg = pageTheme?.colors.bg || (isDark ? '#20292c' : '#ffffff');
  const fg = pageTheme?.colors.fg || (isDark ? '#e4e4e4' : '#24292f');
  article.style.setProperty('--bg', bg); article.style.setProperty('--fg', fg); article.style.setProperty('--accent', pageTheme?.colors.accent || '#8b949e');
  if (codeTheme) {
    const rules = ['#content pre>code{background:' + codeTheme.colors.codeBg + '!important;color:' + codeTheme.colors.fg + '!important}'];
    const selectors: Record<string, string> = { keyword: '.hljs-keyword', string: '.hljs-string', number: '.hljs-number', comment: '.hljs-comment', function: '.hljs-title.function_', type: '.hljs-type,.hljs-built_in', variable: '.hljs-variable,.hljs-params', literal: '.hljs-literal', property: '.hljs-attr,.hljs-property' };
    for (const [key, selector] of Object.entries(selectors)) if (/^#[\da-f]{3,8}$/i.test(codeTheme.tokens[key] || '')) rules.push(selector.split(',').map(s => '#content ' + s).join(',') + '{color:' + codeTheme.tokens[key] + '!important}');
    const style = document.createElement('style'); style.textContent = rules.join(''); document.head.append(style);
  }
  document.body.style.background = bg; document.body.style.color = fg;
  article.style.color = fg; article.style.background = bg;
  article.style.fontFamily = options.font || settings.fontFamily || 'system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
  article.style.fontSize = `${options.fontSize}px`; article.style.lineHeight = String(settings.lineHeight);
  article.style.setProperty('--code-font', settings.codeFontFamily || 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace');
  document.body.classList.toggle('beautify', options.beautify);
  const page = document.getElementById('page-style')!;
  page.textContent = `@page{size:${options.paperSize};margin:${options.topMargin}px 25px 25px}`;
  const deadline = performance.now() + 30000;
  let stableSince = performance.now(), previous = '';
  while (performance.now() < deadline) {
    const errors = [...article.querySelectorAll('.vditor-reset--error')].map(e => e.textContent?.slice(0, 200));
    if (errors.length) throw new Error(`公式或图表渲染失败：${errors.join('；')}`);
    const mathReady = [...article.querySelectorAll('.language-math')].every(e => e.hasAttribute('data-math'));
    const graphsReady = [...article.querySelectorAll(diagramSelector)].every(e => e.querySelector('svg,canvas'));
    const imagesReady = [...article.querySelectorAll('img')].every(e => e.complete);
    const scriptsReady = [...document.scripts].every(e => !e.src || e.id || e.src.endsWith('/renderer.js'));
    const signature = article.innerHTML;
    if (signature !== previous) { stableSince = performance.now(); previous = signature; }
    if (mathReady && graphsReady && imagesReady && scriptsReady && performance.now() - stableSince > 500) break;
    await delayFrame();
  }
  if (performance.now() >= deadline) {
    const unfinished = [...article.querySelectorAll(diagramSelector)].filter(e => !e.querySelector('svg,canvas')).map(e => e.className);
    throw new Error(`渲染超时。请检查公式、图表和远程资源。${unfinished.length ? `未完成：${[...new Set(unfinished)].join('、')}` : ''}`);
  }
  await document.fonts.ready;
  const broken = [...article.querySelectorAll('img')].find(e => !e.naturalWidth);
  if (broken) throw new Error(`图片加载失败：${broken.getAttribute('src')}`);
  for (const canvas of article.querySelectorAll('canvas')) {
    const image = document.createElement('img'); image.src = canvas.toDataURL('image/png'); image.width = canvas.clientWidth; image.height = canvas.clientHeight; image.alt = '图表'; canvas.replaceWith(image);
  }
  const headings = [...article.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h, i) => { h.id = `heading-${i + 1}`; return { id: h.id, text: h.textContent || '', level: Number(h.tagName.slice(1)) }; });
  if (options.toc && headings.length) {
    const nav = document.createElement('nav'); nav.className = 'export-toc'; const title = document.createElement('h2'); title.textContent = '目录'; nav.append(title);
    for (const h of headings) { const a = document.createElement('a'); a.href = `#${h.id}`; a.textContent = h.text; a.style.marginLeft = `${(h.level - 1) * 16}px`; nav.append(a); }
    article.prepend(nav);
  }
  article.querySelectorAll('.vditor-copy,.vditor-anchor,.vditor-speech').forEach(e => e.remove());
  return { headings, bg, fg };
};
