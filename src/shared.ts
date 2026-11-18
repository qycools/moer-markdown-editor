export const VIEW_TYPE = 'vditorMarkdown.editor';
export const PREFIX = 'vditorMarkdown';
export const APP_NAME = '墨尔 markdown editor';
export const EXTENSION_ID = 'qycools.moye-markdown';
export const actions = [
  ['outline', '大纲'], ['source', '在 VS Code 中编辑'], ['save', '保存'],
  ['headings', '标题'], ['bold', '粗体'], ['italic', '斜体'], ['strike', '删除线'], ['link', '链接'],
  ['textColor', '设置字体配色'], ['backgroundColor', '设置背景配色'], ['export', '导出'],
  ['theme', '选择主题'], ['brightness', '切换明暗主题'],
  ['list', '无序列表'], ['ordered-list', '有序列表'], ['check', '任务列表'], ['table', '表格'],
  ['quote', '引用'], ['code', '代码块'], ['undo', '撤销'], ['redo', '重做'],
  ['search', '搜索'], ['shortcuts', '快捷键配置'], ['settings', '设置'],
] as const;
export type Action = typeof actions[number][0];
export const defaultColors = ['#ffd400', '#ff6268', '#62ad2e', '#26a7df', '#a68be3', '#e46ae8', '#f49a35', '#aaaaaa'];
export type ColorProperty = 'color' | 'background-color';
export function validPalette(value: unknown): value is string[] {
  return Array.isArray(value) && value.length >= 1 && value.length <= 8 && value.every(color => typeof color === 'string' && /^#[\da-f]{6}$/i.test(color));
}
export const defaults = {
  mode: 'ir', theme: 'auto', colorMode: 'auto', uiFontSize: 13, editorFontSize: 13,
  fontFamily: '', boldColor: '', pageWidth: '100%', lineHeight: 1.7, typewriterMode: false,
  codeFontFamily: '', codeMaxHeight: 'none', codeTheme: 'auto', imageMaxWidth: 100, imageMaxHeight: 70,
  outline: true, outlineWidth: 216, browserPath: '',
  textColors: [...defaultColors], backgroundColors: [...defaultColors],
};
export const pageWidths = [['100%', '100%'], ['210mm', 'A4 (210mm)'], ['148mm', 'A5 (148mm)'], ['176mm', 'B5 (176mm)'], ['8.5in', 'Letter (8.5in)'], ['768px', '768px'], ['960px', '960px']] as const;
export function pageWidthPixels(value: string): number | undefined {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(px|mm|in)$/);
  return match ? Number(match[1]) * ({ px: 1, mm: 96 / 25.4, in: 96 }[match[2] as 'px' | 'mm' | 'in']) : undefined;
}
export function validPageWidth(value: unknown): value is string {
  if (value === '100%') return true;
  const pixels = typeof value === 'string' ? pageWidthPixels(value) : undefined;
  return pixels !== undefined && pixels >= 240 && pixels <= 6000;
}
export type Settings = typeof defaults;
export type ThemeDefinition = {
  id: string; label: string; kind: 'light' | 'dark' | 'hc-light' | 'hc-dark';
  colors: Record<'bg' | 'fg' | 'panel' | 'border' | 'muted' | 'accent' | 'codeBg', string>;
  tokens: Record<string, string>;
};
export type ThemeCatalog = { themes: ThemeDefinition[]; activeTheme: string };
export type ExportOptions = {
  format: 'pdf' | 'html' | 'docx'; topMargin: number; toc: boolean; beautify: boolean;
  theme: boolean; paperSize: 'A4' | 'A3' | 'Letter'; font: string; fontSize: number; directory: string;
};
export const exportDefaults: ExportOptions = {
  format: 'pdf', topMargin: 25, toc: true, beautify: false, theme: false,
  paperSize: 'A4', font: '', fontSize: 13, directory: '${fileDir}',
};
export function minimalEdit(before: string, after: string) {
  let start = 0;
  while (start < before.length && start < after.length && before[start] === after[start]) start++;
  if (start === before.length && start === after.length) return undefined;
  if (start > 0 && /[\uDC00-\uDFFF]/.test(before[start] || after[start] || '')) start--;
  let endBefore = before.length, endAfter = after.length;
  while (endBefore > start && endAfter > start && before[endBefore - 1] === after[endAfter - 1]) { endBefore--; endAfter--; }
  if (/[\uDC00-\uDFFF]/.test(before[endBefore] || after[endAfter] || '')) { endBefore++; endAfter++; }
  return { start, end: endBefore, text: after.slice(start, endAfter) };
}
export function validateExport(input: unknown): ExportOptions {
  const x = input as ExportOptions;
  if (!x || !['pdf', 'html', 'docx'].includes(x.format) || !['A4', 'A3', 'Letter'].includes(x.paperSize)
    || !Number.isFinite(x.topMargin) || x.topMargin < 0 || x.topMargin > 300
    || !Number.isFinite(x.fontSize) || x.fontSize < 8 || x.fontSize > 72
    || typeof x.font !== 'string' || x.font.length > 200 || typeof x.directory !== 'string'
    || ['toc', 'beautify', 'theme'].some(k => typeof x[k as keyof ExportOptions] !== 'boolean')) {
    throw new Error('导出参数无效。请检查边距、字号和导出目录。');
  }
  return x;
}
export const escapeHTML = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
