import { escapeHTML } from "../shared";
import { icon } from "./icons";
import { viewportLayer } from "./viewportLayer";

declare function processCodeRender(preview: Element, vditor: any): void;

const languages = [
  "",
  "plaintext",
  "javascript",
  "typescript",
  "json",
  "json5",
  "html",
  "css",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "bash",
  "powershell",
  "sql",
  "yaml",
  "xml",
  "markdown",
  "vue",
  "jsx",
  "tsx",
  "kotlin",
  "swift",
  "ruby",
  "php",
  "diff",
  "dockerfile",
  "mermaid",
  "graphviz",
  "echarts",
  "flowchart",
  "wavedrom",
  "markmap",
  "mindmap",
  "plantuml",
  "abc",
  "smiles"
];

export function installCodeBlocks(editor: any, options: any) {
  const bars = new Map<Element, HTMLDivElement>();
  const layers = new Map<Element, HTMLDivElement>();
  let scheduled = false;
  const sourceOf = (block: Element) => block.querySelector("pre > code");
  const languageOf = (source: Element) => source.className.match(/(?:^|\s)language-([^\s]+)/)?.[1] || "";
  const render = (block: Element) => {
    const preview = block.querySelector(".vditor-ir__preview,.vditor-wysiwyg__preview");
    const source = sourceOf(block);
    if (preview && source) {
      preview.innerHTML = source.outerHTML;
      processCodeRender(preview, editor.vditor);
    }
    options.submit();
    schedule();
  };
  function createBar(block: Element, layer: HTMLDivElement) {
    const bar = document.createElement("div");
    bar.className = "vm-code-toolbar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "代码块操作");
    bar.innerHTML = `<select class="vm-code-language" aria-label="代码语言"></select><span class="vm-code-actions"><button type="button" class="vm-code-theme" aria-label="代码块主题" aria-haspopup="menu" title="代码块主题（所有代码块）">${icon("theme")}</button>${[
      ["trash", "删除代码块"],
      ["copy", "复制代码"],
      ["paste", "粘贴代码"]
    ]
      .map(([id, label]) => `<button type="button" data-code-action="${id}" aria-label="${label}" title="${label}">${icon(id)}</button>`)
      .join("")}</span>`;
    bar.addEventListener("pointerdown", (event) => {
      if ((event.target as Element).closest("button")) event.preventDefault();
    });
    (bar.querySelector(".vm-code-language") as HTMLSelectElement).onchange = (event) => {
      const language = (event.target as HTMLSelectElement).value;
      const source = sourceOf(block)!;
      source.className = language ? `language-${language}` : "";
      const info = block.querySelector('[data-type="code-block-info"]');
      if (info) info.textContent = "\u200B" + language;
      render(block);
    };
    (bar.querySelector(".vm-code-theme") as HTMLButtonElement).onclick = (event) =>
      options.openThemeMenu(event.currentTarget);
    bar.addEventListener("click", async (event) => {
      const action = (event.target as Element).closest<HTMLElement>("[data-code-action]")?.dataset.codeAction;
      if (!action) return;
      const source = sourceOf(block)!;
      try {
        if (action === "copy") {
          await options.rpc("clipboardWrite", { text: source.textContent || "" });
          options.toast("代码已复制");
        } else if (action === "paste") {
          const selection = window.getSelection();
          const selected =
            selection?.rangeCount && source.contains(selection.getRangeAt(0).commonAncestorContainer)
              ? selection.getRangeAt(0).cloneRange()
              : undefined;
          const text = await options.rpc("clipboardRead");
          if (!text || !source.isConnected) return;
          const validSelection = selected?.startContainer.isConnected && source.contains(selected.commonAncestorContainer);
          const range = validSelection ? selected! : document.createRange();
          if (!validSelection) {
            range.selectNodeContents(source);
            range.collapse(false);
          }
          range.deleteContents();
          const node = document.createTextNode(String(text).replace(/\r\n?/g, "\n"));
          range.insertNode(node);
          range.setStartAfter(node);
          range.collapse(true);
          source.parentElement!.style.display = "block";
          block.classList.add("vditor-ir__node--expand");
          const surface = editor.vditor[editor.vditor.currentMode].element;
          surface.focus({ preventScroll: true });
          selection?.removeAllRanges();
          selection?.addRange(range);
          render(block);
        } else if (action === "trash") {
          const surface = block.closest("[contenteditable=true]") as HTMLElement;
          const next = block.nextElementSibling;
          const previous = block.previousElementSibling;
          block.remove();
          if (!surface.children.length) surface.innerHTML = '<p data-block="0">\n</p>';
          surface.focus({ preventScroll: true });
          const range = document.createRange();
          range.selectNodeContents(next || previous || surface.firstElementChild!);
          range.collapse(!!next);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          options.submit();
          schedule();
        }
      } catch (error: any) {
        options.toast(error.message, true);
      }
    });
    layer.append(bar);
    bars.set(block, bar);
    return bar;
  }
  function refresh() {
    scheduled = false;
    const mode = editor.vditor.currentMode;
    const surface = mode === "sv" ? null : editor.vditor[mode].element;
    for (const [block, bar] of bars) {
      if (!block.isConnected || !surface?.contains(block)) {
        bar.remove();
        bars.delete(block);
      }
    }
    if (!surface) return;
    const { layer, origin } = viewportLayer(surface.parentElement, layers, "vm-code-layer");
    for (const block of surface.querySelectorAll('[data-type="code-block"]')) {
      const source = sourceOf(block);
      if (!source) continue;
      if (!block.classList.contains("vm-code-block")) block.classList.add("vm-code-block");
      const bar = bars.get(block) || createBar(block, layer);
      const rect = block.getBoundingClientRect();
      bar.style.transform = `translate(${rect.left - origin.left + 8}px,${rect.top - origin.top + 6}px)`;
      bar.style.width = `${Math.max(0, rect.width - 16)}px`;
      bar.hidden = rect.bottom < origin.top || rect.top > origin.bottom;
      const language = languageOf(source);
      const selectEl = bar.querySelector(".vm-code-language") as HTMLSelectElement;
      const all = [...new Set([...languages, ...((window as any).hljs?.listLanguages() || []), language])];
      const choices = all
        .map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value || "纯文本")}</option>`)
        .join("");
      if (selectEl.dataset.choices !== choices) {
        selectEl.innerHTML = choices;
        selectEl.dataset.choices = choices;
      }
      selectEl.value = language;
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(refresh);
    }
  }
  const observer = new MutationObserver(schedule);
  for (const mode of ["ir", "wysiwyg"]) {
    const surface = editor.vditor[mode].element;
    observer.observe(surface, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "style", "data-render"]
    });
    surface.addEventListener("scroll", schedule, { passive: true });
    surface.parentElement.addEventListener("scroll", schedule, { passive: true });
    new ResizeObserver(schedule).observe(surface);
  }
  window.addEventListener("resize", schedule);
  schedule();
  return { refresh: schedule };
}
