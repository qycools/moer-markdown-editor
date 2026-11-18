import assert from "node:assert/strict";
import fs from "node:fs/promises";
import Module from "node:module";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

// Mock vscode module before loading dist/extension.js
const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "vscode") return {};
  return origLoad.apply(this, arguments);
};

const { findBrowser, exportDocument } = require(path.join(root, "dist/extension.js"));
const { chromium } = require(path.join(root, "node_modules/playwright-core"));

const resultsDir = path.join(root, ".test-results");
await fs.rm(resultsDir, { recursive: true, force: true });
await fs.mkdir(resultsDir, { recursive: true });

// 1. Test browser discovery
const detectedBrowser = await findBrowser();
assert.ok(detectedBrowser, "findBrowser() should locate an installed browser");
const detectedStat = await fs.stat(detectedBrowser);
assert.ok(detectedStat.isFile(), `Detected browser should be a file: ${detectedBrowser}`);
console.log("Browser detected:", detectedBrowser);

if (process.platform === "darwin") {
  try {
    await fs.access("/Applications/Google Chrome.app");
    const resolvedApp = await findBrowser("/Applications/Google Chrome.app");
    assert.ok(
      resolvedApp.endsWith("/Contents/MacOS/Google Chrome"),
      `Expected .app resolution to executable, got: ${resolvedApp}`
    );
    console.log("macOS .app bundle resolved:", resolvedApp);
  } catch {
  }
}

await assert.rejects(() => findBrowser("/nonexistent/browser/executable"), /指定的浏览器不存在/);

// 2. Test PDF, HTML, DOCX export
const sourceMd = path.join(resultsDir, "sample.md");
const sampleMarkdown = [
  "# 测试文档",
  "",
  "正文测试 **粗体** 与 <span style=\"color: #26a7df\">蓝色文字</span>。",
  "",
  "## 公式与表格",
  "",
  "行内公式：$E = mc^2$",
  "",
  "| 列 A | 列 B |",
  "| --- | --- |",
  "| 1 | 2 |",
  "",
  "## 图表",
  "",
  "```mermaid",
  "graph TD",
  "  A[开始] --> B[结束]",
  "```",
  ""
].join("\n");
await fs.writeFile(sourceMd, sampleMarkdown, "utf8");

const baseExportOptions = {
  topMargin: 25,
  toc: true,
  beautify: true,
  theme: false,
  paperSize: "A4",
  font: "",
  fontSize: 13,
  directory: resultsDir
};
const settings = {
  lineHeight: 1.7,
  fontFamily: "",
  codeFontFamily: "",
  browserPath: detectedBrowser
};

const pdfPath = path.join(resultsDir, "sample.pdf");
const pdfRes = await exportDocument({
  root,
  markdown: sampleMarkdown,
  sourcePath: sourceMd,
  outputPath: pdfPath,
  options: { ...baseExportOptions, format: "pdf" },
  settings,
  dark: false,
  appearance: {}
});
const pdfBytes = await fs.readFile(pdfPath);
assert.equal(pdfBytes.subarray(0, 5).toString("utf8"), "%PDF-", "PDF output must start with %PDF-");
assert.ok(pdfRes.bytes > 1000, "PDF output should not be empty");
console.log("PDF export passed:", pdfRes.bytes, "bytes");

const htmlPath = path.join(resultsDir, "sample.html");
const htmlRes = await exportDocument({
  root,
  markdown: sampleMarkdown,
  sourcePath: sourceMd,
  outputPath: htmlPath,
  options: { ...baseExportOptions, format: "html" },
  settings,
  dark: false,
  appearance: {}
});
const htmlText = await fs.readFile(htmlPath, "utf8");
assert.ok(htmlText.startsWith("<!doctype html>"), "HTML output must start with <!doctype html>");
assert.ok(htmlText.includes("测试文档"), "HTML output must include heading content");
console.log("HTML export passed:", htmlRes.bytes, "bytes");

const docxPath = path.join(resultsDir, "sample.docx");
const docxRes = await exportDocument({
  root,
  markdown: sampleMarkdown,
  sourcePath: sourceMd,
  outputPath: docxPath,
  options: { ...baseExportOptions, format: "docx" },
  settings,
  dark: false,
  appearance: {}
});
const docxBytes = await fs.readFile(docxPath);
assert.equal(docxBytes.subarray(0, 2).toString("utf8"), "PK", "DOCX output must be a zip archive (PK)");
assert.ok(docxRes.bytes > 2000, "DOCX output should not be empty");
console.log("DOCX export passed:", docxRes.bytes, "bytes");

// 3. Test Webview UI in headless browser
const harnessHtml = path.join(resultsDir, "webview-test.html");
const boot = {
  cdn: pathToFileURL(path.join(root, "media/vditor")).href,
  base: pathToFileURL(resultsDir + path.sep).href,
  settings: {
    mode: "ir",
    theme: "auto",
    uiFontSize: 13,
    editorFontSize: 13,
    fontFamily: "",
    boldColor: "",
    pageWidth: "100%",
    lineHeight: 1.7,
    typewriterMode: false,
    codeFontFamily: "",
    codeMaxHeight: "none",
    codeTheme: "auto",
    imageMaxWidth: 100,
    imageMaxHeight: 70,
    outline: true,
    outlineWidth: 216,
    browserPath: ""
  },
  dark: false,
  themes: [],
  activeTheme: "",
  codePalette: {},
  filename: "sample.md"
};

await fs.writeFile(
  harnessHtml,
  `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><link href="${
    pathToFileURL(path.join(root, "dist/webview.css")).href
  }" rel="stylesheet"><script>window.__posted = []; window.acquireVsCodeApi = () => ({ postMessage: (m) => window.__posted.push(m), getState: () => ({}), setState: () => {} }); window.VM_BOOT=${JSON.stringify(
    boot
  )};</script></head><body><div id="app"><div id="editor"></div><footer id="status" aria-live="polite" hidden></footer></div><div id="overlay"></div><script src="${
    pathToFileURL(path.join(root, "dist/webview.js")).href
  }"></script></body></html>`,
  "utf8"
);

const browser = await chromium.launch({
  executablePath: detectedBrowser,
  headless: true,
  args: ["--allow-file-access-from-files"]
});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto(pathToFileURL(harnessHtml).href);
  await page.waitForFunction(() => !!window.VM_APP?.ready);

  await page.evaluate(() => {
    window.postMessage({ type: "document", text: "# 标题一\n\n测试内容", version: 1, initial: true }, "*");
  });
  await page.waitForFunction(() => document.querySelectorAll("#outline button[data-heading]").length === 1);

  // Verify settings UI includes macOS fonts
  await page.click('[data-action="settings"]');
  const hasPingFang = await page.locator('#settings-menu option[value="PingFang SC"]').count();
  assert.ok(hasPingFang >= 1, "Settings font dropdown should include PingFang SC");
  await page.click("#settings-done");

  // Verify beforeinput historyUndo routes to VS Code undo message
  await page.evaluate(() => {
    window.__posted.length = 0;
    const surface = window.VM_APP.editor.vditor.ir.element;
    surface.focus();
    const ev = new InputEvent("beforeinput", { bubbles: true, cancelable: true, inputType: "historyUndo" });
    surface.dispatchEvent(ev);
  });
  const postedUndo = await page.evaluate(() => window.__posted.some((m) => m.type === "undo"));
  assert.ok(postedUndo, "beforeinput historyUndo should post undo command to VS Code");

  assert.deepEqual(errors, [], `Webview page errors encountered: ${errors.join("; ")}`);
  console.log("Webview browser test passed.");
} finally {
  await browser.close();
}

console.log("All tests passed.");
