import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stripTypeScriptTypes } from "node:module";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const write = (rel, content) => {
  const out = path.join(root, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content, "utf8");
};

function resolveSpec(spec, moduleMap) {
  if (moduleMap[spec]) return { kind: "expr", expr: moduleMap[spec] };
  if (spec === "json5") return { kind: "expr", expr: "require_lib()" };
  if (spec === "linkedom") return { kind: "expr", expr: "__linkedom" };
  if (spec === "docx") return { kind: "expr", expr: "__docx" };
  return { kind: "require", spec };
}

function compileTsModule(relPath, moduleMap = {}, prelude = "") {
  const raw = read(relPath);
  let js = stripTypeScriptTypes(raw, { mode: "strip" });
  const exportsList = [];

  // Replace import declarations (single- or multi-line)
  js = js.replace(
    /^\s*import\s+(?:\*\s+as\s+([A-Za-z0-9_$]+)|([A-Za-z0-9_$]+)|\{([\s\S]*?)\})\s+from\s+["']([^"']+)["'];?/gm,
    (_, starName, defaultName, namedList, spec) => {
      const resolved = resolveSpec(spec, moduleMap);
      const rhs = resolved.kind === "expr" ? resolved.expr : `require(${JSON.stringify(resolved.spec)})`;
      if (starName) return `const ${starName} = ${rhs};`;
      if (defaultName) return `const ${defaultName} = ${rhs};`;
      const bindings = namedList
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((item) => {
          const m = item.match(/^([A-Za-z0-9_$]+)\s+as\s+([A-Za-z0-9_$]+)$/);
          return m ? `${m[1]}: ${m[2]}` : item;
        })
        .join(", ");
      return `const { ${bindings} } = ${rhs};`;
    }
  );

  // Replace export declarations
  js = js.replace(/^export\s+async\s+function\s+([A-Za-z0-9_$]+)/gm, (_, name) => {
    exportsList.push(name);
    return `async function ${name}`;
  });
  js = js.replace(/^export\s+function\s+([A-Za-z0-9_$]+)/gm, (_, name) => {
    exportsList.push(name);
    return `function ${name}`;
  });
  js = js.replace(/^export\s+(const|let|var)\s+([A-Za-z0-9_$]+)/gm, (_, kind, name) => {
    exportsList.push(name);
    return `${kind} ${name}`;
  });

  const ret = exportsList.length ? `\nreturn { ${exportsList.join(", ")} };` : "";
  const pre = prelude ? `${prelude}\n` : "";
  return `// ${relPath}\n(() => {\n${pre}${js}${ret}\n})()`;
}

// 1. Build dist/extension.js
const extMap = {
  "./shared": "__shared",
  "./export": "__exportMod",
  "./codeTheme": "__codeTheme"
};
const extensionBundle = [
  read("vendor/extension-head.js"),
  read("vendor/extension-libs.js"),
  `var __linkedom = { parseHTML, DOMParser };`,
  `var __docx = { AlignmentType, Bookmark, BorderStyle, Document: File, ExternalHyperlink, Footer, HeadingLevel, ImageRun, InternalHyperlink, LevelFormat, Packer, PageNumber, Paragraph, Table, TableCell, TableRow, TextRun, WidthType };`,
  `var __shared = ${compileTsModule("src/shared.ts", extMap)};`,
  `var __exportMod = ${compileTsModule("src/export.ts", extMap)};`,
  `var __codeTheme = ${compileTsModule("src/codeTheme.ts", extMap)};`,
  `var __extension = ${compileTsModule("src/extension.ts", extMap)};`,
  `var extension_exports = {};`,
  `__export(extension_exports, { activate: () => __extension.activate, deactivate: () => __extension.deactivate, findBrowser: () => __exportMod.findBrowser, exportDocument: () => __exportMod.exportDocument });`,
  `module.exports = __toCommonJS(extension_exports);`,
  read("vendor/extension-licenses.js")
].join("\n");
write("dist/extension.js", extensionBundle);

// 2. Build dist/webview.js
const webMap = {
  "../shared": "__shared",
  "./colors": "__colors",
  "./icons": "__icons",
  "./viewportLayer": "__viewportLayer",
  "./codeBlocks": "__codeBlocks",
  "./themes": "__themes",
  "./selectionColors": "__selectionColors",
  "./outlineResize": "__outlineResize",
  "./blocks": "__blocks",
  "./structures": "__structures",
  "./colorMenus": "__colorMenus",
  "./toolbarState": "__toolbarState"
};
const webviewBundle = [
  read("vendor/vditor-webview-prefix.js"),
  read("vendor/codicons.js"),
  `  const __shared = ${compileTsModule("src/shared.ts", webMap)};`,
  `  const __colors = ${compileTsModule("src/webview/colors.ts", webMap)};`,
  `  const __icons = ${compileTsModule("src/webview/icons.ts", webMap)};`,
  `  const __viewportLayer = ${compileTsModule("src/webview/viewportLayer.ts", webMap)};`,
  `  const __codeBlocks = ${compileTsModule("src/webview/codeBlocks.ts", webMap)};`,
  `  const __themes = ${compileTsModule("src/webview/themes.ts", webMap)};`,
  `  const __selectionColors = ${compileTsModule("src/webview/selectionColors.ts", webMap)};`,
  `  const __outlineResize = ${compileTsModule("src/webview/outlineResize.ts", webMap)};`,
  `  const __blocks = ${compileTsModule("src/webview/blocks.ts", webMap)};`,
  `  const __structures = ${compileTsModule("src/webview/structures.ts", webMap)};`,
  `  const __colorMenus = ${compileTsModule("src/webview/colorMenus.ts", webMap)};`,
  `  const __toolbarState = ${compileTsModule("src/webview/toolbarState.ts", webMap)};`,
  `  ${compileTsModule("src/webview/main.ts", webMap, "const Vditor = src_default;")};`,
  `})();`
].join("\n");
write("dist/webview.js", webviewBundle);

// 3. Build dist/renderer.js
const rendererBundle = [
  read("vendor/vditor-renderer-prefix.js"),
  `  ${compileTsModule("src/renderer.ts", {}, "const Vditor = src_default;")};`,
  `})();`
].join("\n");
write("dist/renderer.js", rendererBundle);

// 4. Build CSS and HTML
write(
  "dist/webview.css",
  [
    read("vendor/vditor.css"),
    "/* src/webview/style.css */",
    read("src/webview/style.css"),
    "/* src/webview/tables.css */",
    read("src/webview/tables.css")
  ].join("\n")
);
write(
  "dist/renderer.css",
  [read("vendor/vditor.css"), "/* src/webview/tables.css */", read("src/webview/tables.css")].join("\n")
);
write("dist/renderer.html", read("src/renderer.html"));

console.log("Build completed successfully.");
