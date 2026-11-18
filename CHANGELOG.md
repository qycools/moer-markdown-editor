# 更新记录

## 0.1.8 (macOS 适配)

- 新增 macOS 桌面版 VS Code 适配：
  - 补充 `Cmd+S`、`Cmd+Z`、`Cmd+Shift+Z` / `Cmd+Y`、`Cmd+B`、`Cmd+I`、`Option+Shift+5`、`Cmd+K`、`Cmd+F`、`Cmd+Option+M`、`Cmd+Option+E` 等 macOS 原生快捷键映射。
  - 支持 macOS 自动检测 `/Applications` 与 `~/Applications` 中的 Chrome / Edge / Chromium / Brave，支持填写 `.app` 应用包路径及 `~` 家目录展开。
  - 修复 macOS 原生编辑菜单 / `beforeinput` 撤销重做与 VS Code 文档状态不同步的问题，并增强剪贴板图片条目粘贴兼容性。
  - 优化编辑界面、渲染导出与 DOCX 导出的 macOS 字体栈及中文字体选项（苹方、黑体、华文宋体、华文楷体、SF Mono、Menlo、Monaco）。

## 0.1.8

全新仓库首次发布。

- 即时渲染、所见即所得和分屏预览。
- 大纲导航、段落操作、文字配色及独立代码主题。
- 数学公式、图表以及 PDF、HTML、DOCX 导出。

适用范围为 Windows 与 macOS 本地桌面版 VS Code；导出需要本机 Edge 或 Chrome。
