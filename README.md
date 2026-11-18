# 墨尔 markdown editor

作者：**qycools**。面向桌面版 VS Code 的 Markdown 可视化编辑器。

本项目是在 [Vanessa219/vditor](https://github.com/Vanessa219/vditor) 开源代码基础上修改、扩展并适配 VS Code 的项目，使用 Vditor 4.0.1 源码。Vditor 采用 MIT 许可，原作者版权与许可声明保留于 `vditor-master/LICENSE`，并随安装包提供于 `media/vditor/LICENSE`。

- 即时渲染、所见即所得、分屏预览三种编辑模式。
- 大纲导航、文字配色、代码高亮、数学公式与多种图表。
- 页面与代码块可独立选择已安装的 VS Code 颜色主题。
- 导出 PDF、HTML 和可编辑的 Word 文档。

## 使用条件

需要桌面版 VS Code 1.95.0 或更新版本。PDF、HTML 和 DOCX 导出需要本机安装 Edge 或 Chrome；macOS 还支持检测 Chromium 和 Brave，可配置 `.app` 应用包路径或 `~/Applications` 路径。

Windows 已进行回归验证；本版合并 macOS 适配，尚未在 macOS 实机完成本次验收。网页版、Linux、WSL 和远程扩展宿主尚未纳入本版验收范围。不受信任的工作区中可阅读和编辑，但禁用本机浏览器导出及图片写入。

## 安装

从 [GitHub Releases](https://github.com/qycools/moer-markdown-editor/releases/latest) 下载 `moye-markdown-版本号.vsix`，无需下载 Source code 压缩包。

在 VS Code 扩展视图的“…”菜单中选择“从 VSIX 安装”，打开下载的 `.vsix`，然后按提示重新加载窗口。

从旧版 Vditor Markdown 升级时，请先卸载 `local-tools.vditor-markdown`，避免两版同时注册编辑器。原有 `vditorMarkdown.*` 配置、自定义快捷键和编辑器关联继续沿用。

也可以在本项目目录执行：

```powershell
code --install-extension .\artifacts\moye-markdown-0.1.9.vsix
```

安装后默认接管 `.md` 和 `.markdown`。如果文件已有其他默认编辑器，右键标签页，选择“重新打开方式 → 墨尔 markdown editor”，即可选择本插件并设为默认。

更新时，从 Releases 下载新版 VSIX，再次“从 VSIX 安装”即可。仅通过 GitHub 分发时，需要手动安装后续更新；无需先卸载同一标识的旧版。

0.1.8 起使用名称“墨尔 markdown editor”。扩展标识继续使用 `qycools.moye-markdown`，现有配置、快捷键及编辑器关联可继续沿用。

## 编辑

![编辑界面](screenshots/editor.png)

工具栏使用 16px Codicons，整体居中并固定在顶部，依次提供：大纲、源码、保存、标题、粗体、斜体、删除线、链接、字体颜色、背景颜色、导出、主题、明暗、无序列表、有序列表、任务列表、表格、引用、代码块、撤销、重做、搜索、快捷键和设置。链接文字及工具栏的悬停、按下、选中状态使用当前 VS Code 主题的对应配色；窗口较窄时可横向滚动工具栏。

- 默认使用即时渲染；在设置中切换所见即所得或分屏预览。
- 源码按钮打开同一份 Markdown 文档。保存、自动保存、撤销和重做均接入 VS Code 文档模型。
- 大纲显示在编辑区左侧，点击标题跳转；右侧整条边均可拖动调整宽度，聚焦边缘后也可用左右方向键调整。再次点击大纲按钮可隐藏。
- 正文与大纲分别滚动，标题旁不显示 H1–H6 标记，标题下不附加装饰横线。
- 即时渲染与所见即所得模式中，段落、图片及列表项前显示六点菜单，统一排列在正文左侧，不随列表缩进移动。菜单提供转换、删除、复制、剪切、缩进、移动和在下方添加。转换支持标题、文本、列表、任务、代码、引用、高亮块、分栏和折叠块；分栏与折叠块使用 HTML 保存。图片旁不显示类型标记，旧版段落浮动按钮和底部文件信息栏已移除。
- 即时渲染和所见即所得模式的代码块左上角可选语言，右上角可选主题、删除、复制和粘贴。粘贴插入代码内的当前选区，未选中时追加到末尾。主题是所有代码块共用的显示设置，默认跟随 VS Code 的背景、前景和常见语法颜色，不修改 Markdown。
- 选中正文文字后，下方自动显示两排配色：方框设置背景色，带颜色线条的 A 设置字体色。工具栏的字体色与背景色按钮用于管理各自的常用配色，支持 1–8 色、修改、删除、拖动排序和恢复默认；配色保存到 VS Code 设置，不改变文档。
- 点击已有颜色或字号标记的文字，可修改字体色、背景色及字号，点击“保存”应用。橡皮擦同时清除该标记范围的字体色与背景色，保留粗体、字号等其他格式。颜色和字号以 `<span style="…">` 保存在 Markdown 中，需要支持内联 HTML 的阅读器才能显示。
- 表格宽度随页面调整，长文字自动换行；正文沿用页面背景，表头轻微着色，边框随页面主题变化。
- 支持粘贴、拖入图片，也可从“设置 → 更多功能 → 插入图片”选择文件。图片保存在 Markdown 旁的 `assets` 文件夹，文件使用相对路径；插图前需要保存 Markdown。
- 设置以工具栏下拉菜单显示，可调整 UI 和正文字号、字体、粗体显示颜色、页面宽度、行高、打字机模式、代码块字体/高度、图片尺寸。显示设置不会改写 Markdown。
- 页面宽度支持 100%、A4、A5、B5、Letter、768px、960px 和自定义 240–6000px。固定页面比可用区域窄时居中显示；比可用区域宽时保留宽度，并提供底部横向滚动条。100% 随可用区域调整。
- 支持数学公式、Mermaid、ECharts、Graphviz、WaveDrom、脑图、五线谱、代码高亮、表格及脚注。ECharts/WaveDrom 使用 JSON 或 JSON5 数据配置，不执行图表中的 JavaScript 函数。

## 主题和快捷键

界面与代码块主题均从 VS Code 当前可用的已安装颜色主题读取，按亮色、暗色和高对比度分组，在按钮下方直接下拉选择。两者可分别设置；Auto 跟随当前 VS Code 主题，主题扩展变化后列表会更新。选择只影响本插件，显示设置不会写入 Markdown。明暗按钮在已安装的亮色与暗色主题之间切换。

支持 JSON/JSONC 的主题继承与 TextMate `.tmTheme` 资源。代码高亮映射常见 TextMate 颜色，不包含语言服务提供的完整语义高亮。旧版内置配色名称会按 Auto 显示，可重新选择已安装主题。

| 操作 | 默认快捷键 |
| --- | --- |
| 保存 | Ctrl+S |
| 撤销 / 重做 | Ctrl+Z / Ctrl+Y |
| 粗体 / 斜体 | Ctrl+B / Ctrl+I |
| 删除线 | Alt+Shift+5 |
| 链接 | Ctrl+K |
| 文内搜索 | Ctrl+F |
| 打开源码 | Ctrl+Alt+M |
| 导出 | Ctrl+Alt+E |

点击键盘按钮或“设置 → 快捷键配置”，进入 VS Code 原生快捷键界面。全部 24 项工具栏操作都可重新绑定；默认绑定仅在本插件编辑区生效。

macOS 使用 Cmd 替代上表中的 Ctrl；重做为 Cmd+Shift+Z 或 Cmd+Y，删除线为 Option+Shift+5，源码与导出分别为 Cmd+Option+M 和 Cmd+Option+E。字体选项增加苹方、华文宋体、华文楷体、SF Mono、Menlo 与 Monaco。

## 导出

导出弹窗支持 PDF、HTML、DOCX，以及顶部边距、目录、美化排版、应用主题、纸张、字体、字号和导出目录。默认目录 `${fileDir}` 表示当前 Markdown 所在文件夹；导出时通过原生保存对话框确认文件名。

- PDF 支持可点击目录、标题书签、纸张与边距；美化导出可附加页码。
- HTML 嵌入样式、字体、本地图片和渲染结果，可直接打开。音视频等远程媒体仍需网络。
- DOCX 中的正文、标题、列表、链接、表格可编辑，文字颜色保留；公式和复杂图表转换为图片。目录链接可点击，标题可在 Word 导航窗格查看。
- 三种格式均调用本机 Edge 或 Chrome 完成渲染；不需要安装 Pandoc 或 Word。自动检测失败时，在“设置 → 导出浏览器”填写浏览器可执行文件路径。
- 导出包含当前尚未保存的编辑。资源缺失、渲染失败或取消时不会留下声称成功的文件。

编辑器自身的渲染资源随插件打包；PlantUML 沿用联网渲染，远程图片和媒体需要可用网络。

## 文件与网络

编辑内容保存在当前 Markdown 文件；插入图片时会向文档旁的 `assets` 文件夹写入文件，导出时向选择的路径写入结果。文字颜色、字号、分栏与折叠块使用内联 HTML 保存，其他 Markdown 阅读器的显示效果取决于其 HTML 支持。

PlantUML 图表内容会发送至其联网渲染服务；含敏感内容时请避免使用该功能。远程图片、媒体和链接资源会访问各自的服务器。公式及其他随包提供的渲染资源可在本机使用。

## 开发与验证

```powershell
npm ci
npm run typecheck
npm run build
npm test
npm run test:integration
npm run package
```

`npm test` 使用本机浏览器验证编辑界面和三种导出；`npm run test:integration` 在独立配置的 VS Code 实例中验证真实 Webview 输入、保存、撤销/重做、源码跳转及外部修改同步。测试产物位于 `.test-results`，不包含在安装包内。

依赖版本由 `package-lock.json` 固定。源码、修改后的 Vditor 源码、构建脚本和测试文件随仓库提供；安装包统一使用 `npm run package` 生成。开源许可见 `LICENSE` 和 `THIRD_PARTY_NOTICES.md`。

macOS 适配来自 [Emeric53 的 PR #1](https://github.com/qycools/moer-markdown-editor/pull/1)，本版将其整合进完整的源码构建与测试工程。平台路径测试可在 Windows 执行，结果不代表 macOS 实机验收。
