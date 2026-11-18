---
title: Vditor 功能验收
tags: [Markdown, 中文]
---

# 一份可以编辑的 Markdown

这是中文与 English 混排的正文，包含 **粗体**、*斜体*、~~删除线~~、[链接](https://example.com) 和 `行内代码`。

<span style="color: #e53935">红色文字</span>，<span style="background-color: #fff176">黄色背景</span>，以及 <span style="color: #1971c2; background-color: #e5dbff">**带颜色的粗体**</span>。

## 列表与表格

- 无序列表
  - 嵌套项目
- 第二项

1. 有序列表
2. 第二项

- [x] 已完成任务
- [ ] 待完成任务

| 名称 | 数值 | 说明 |
| :--- | ---: | :---: |
| 中文项目 | 42 | 可编辑 |
| English | 3.14 | Table |

> 引用中的文字，支持 **强调**。

## 代码与公式

```typescript
function greet(name: string) {
  return `你好，${name}`;
}
```

行内公式 $E = mc^2$。

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

## 流程图

```mermaid
graph LR
  A[编辑 Markdown] --> B[保存文件]
  B --> C[导出文档]
```

## 本地图片与脚注

![本地示意图](sample.svg)

文末保留脚注[^note]。

[^note]: 这是中文脚注。
