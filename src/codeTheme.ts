import * as vscode from "vscode";
import { readFileSync } from "node:fs";
import path from "node:path";
import JSON5 from "json5";
import { DOMParser } from "linkedom";

const scopes: Record<string, string[]> = {
  keyword: ["keyword", "storage.type"],
  string: ["string"],
  number: ["constant.numeric"],
  comment: ["comment"],
  function: ["entity.name.function"],
  type: ["entity.name.type", "support.type"],
  variable: ["variable", "variable.other.readwrite"],
  literal: ["constant.language"],
  property: ["support.type.property-name.json", "support.type.property-name", "variable.other.property"]
};

const cache = new Map<string, { colors: Record<string, string>; tokenColors: any[] }>();
const validColor = (color: unknown): color is string => typeof color === "string" && /^#[\da-f]{3,8}$/i.test(color);

export function clearThemeCache() {
  cache.clear();
}

function plist(node: any): any {
  if (node.tagName === "dict") {
    const children = [...node.children];
    const result: Record<string, any> = {};
    for (let i = 0; i + 1 < children.length; i += 2) {
      result[children[i].textContent || ""] = plist(children[i + 1]);
    }
    return result;
  }
  if (node.tagName === "array") return [...node.children].map(plist);
  return node.textContent || "";
}

function loadTheme(filename: string, visited = new Set<string>()): { colors: Record<string, string>; tokenColors: any[] } {
  if (visited.has(filename) || visited.size > 16) return { colors: {}, tokenColors: [] };
  if (cache.has(filename)) return cache.get(filename)!;
  visited.add(filename);
  const content = readFileSync(filename, "utf8");
  if (content.trimStart().startsWith("<")) {
    const document = new DOMParser().parseFromString(content, "text/xml");
    const node = document.querySelector("plist>dict");
    if (!node) throw new Error("Invalid TextMate theme");
    const rules = plist(node).settings || [];
    const base = rules.find((rule: any) => !rule.scope)?.settings || {};
    const result = {
      colors: { "editor.background": base.background, "editor.foreground": base.foreground },
      tokenColors: rules
    };
    cache.set(filename, result);
    return result;
  }
  const data = JSON5.parse(content);
  const parent = data.include
    ? loadTheme(path.resolve(path.dirname(filename), data.include), visited)
    : { colors: {}, tokenColors: [] };
  const ownTokens =
    typeof data.tokenColors === "string"
      ? loadTheme(path.resolve(path.dirname(filename), data.tokenColors), visited).tokenColors
      : data.tokenColors || [];
  const result = {
    colors: { ...parent.colors, ...data.colors },
    tokenColors: [...parent.tokenColors, ...ownTokens]
  };
  cache.set(filename, result);
  return result;
}

function customizations(section: string, names: string[]) {
  const parts = section.split(".");
  const custom = vscode.workspace.getConfiguration(parts[0]).get<Record<string, any>>(parts.slice(1).join("."), {});
  const result: Record<string, any> = { ...custom, textMateRules: [...(custom.textMateRules || [])] };
  for (const [selector, value] of Object.entries(custom)) {
    const selectors = [...selector.matchAll(/\[([^\]]+)\]/g)].map((match) => match[1]);
    if (
      selectors.some((pattern) =>
        names.some((name) =>
          new RegExp(
            "^" + pattern.split("*").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$"
          ).test(name)
        )
      )
    ) {
      const rules = result.textMateRules;
      Object.assign(result, value);
      result.textMateRules = [...rules, ...(value?.textMateRules || [])];
    }
  }
  return result;
}

function palette(tokens: any[], custom: Record<string, any>, dark: boolean) {
  const result: Record<string, string> = {};
  const fallbacks = dark
    ? ["#569cd6", "#ce9178", "#b5cea8", "#6a9955", "#dcdcaa", "#4ec9b0", "#9cdcfe", "#569cd6", "#9cdcfe"]
    : ["#0000ff", "#a31515", "#098658", "#008000", "#795e26", "#267f99", "#001080", "#0000ff", "#0451a5"];
  for (const [key, targets] of Object.entries(scopes)) {
    result[key] = fallbacks[Object.keys(scopes).indexOf(key)];
    let best = -1;
    for (const rule of tokens) {
      if (!/^#[\da-f]{3,8}$/i.test(rule.settings?.foreground || "")) continue;
      for (const scope of Array.isArray(rule.scope) ? rule.scope : String(rule.scope || "").split(",")) {
        const normalized = scope.trim();
        if (!normalized) continue;
        for (const target of targets) {
          if (target === normalized || target.startsWith(normalized + ".")) {
            if (normalized.length >= best) {
              result[key] = rule.settings.foreground;
              best = normalized.length;
            }
          }
        }
      }
    }
    if (/^#[\da-f]{3,8}$/i.test(custom[key + "s"] || "")) result[key] = custom[key + "s"];
  }
  return result;
}

function label(extension: vscode.Extension<any>, value: string): string {
  if (!/^%.*%$/.test(value)) return value;
  const key = value.slice(1, -1);
  for (const filename of [`package.nls.${vscode.env.language.toLowerCase()}.json`, "package.nls.json"]) {
    try {
      const text = JSON5.parse(readFileSync(path.join(extension.extensionPath, filename), "utf8"))[key];
      if (text) return typeof text === "string" ? text : text.message;
    } catch {
    }
  }
  return key;
}

export function themeCatalog() {
  const themes: any[] = [];
  const name = vscode.workspace.getConfiguration("workbench").get<string>("colorTheme", "");
  let activeTheme = "";
  for (const extension of vscode.extensions.all) {
    for (const contribution of extension.packageJSON.contributes?.themes || []) {
      if (!contribution.path || !["vs", "vs-dark", "hc-black", "hc-light"].includes(contribution.uiTheme)) continue;
      try {
        const kind = ({ vs: "light", "vs-dark": "dark", "hc-black": "hc-dark", "hc-light": "hc-light" } as Record<string, string>)[
          contribution.uiTheme
        ];
        const isDark = kind === "dark" || kind === "hc-dark";
        const display = label(extension, contribution.label || contribution.id || path.basename(contribution.path));
        const data = loadTheme(path.resolve(extension.extensionPath, contribution.path));
        const colors = {
          ...data.colors,
          ...customizations("workbench.colorCustomizations", [contribution.id, display].filter(Boolean))
        };
        const color = (keys: string[], fallback: string) => keys.map((key) => colors[key]).find(validColor) || fallback;
        const theme = {
          id: `${extension.id}/${contribution.id || contribution.path}`,
          label: display,
          kind,
          colors: {
            bg: color(["editor.background"], isDark ? "#1f1f1f" : "#ffffff"),
            fg: color(["editor.foreground"], isDark ? "#cccccc" : "#24292f"),
            panel: color(["sideBar.background", "editor.background"], isDark ? "#181818" : "#f3f3f3"),
            border: color(["widget.border", "editorWidget.border", "panel.border"], isDark ? "#454545" : "#d0d7de"),
            muted: color(["descriptionForeground"], isDark ? "#9d9d9d" : "#717171"),
            accent: color(["focusBorder", "textLink.foreground"], "#0078d4"),
            codeBg: color(["textCodeBlock.background", "editor.background"], isDark ? "#2b2b2b" : "#f6f8fa")
          },
          tokens: {} as Record<string, string>
        };
        const custom = customizations("editor.tokenColorCustomizations", [contribution.id, display].filter(Boolean));
        theme.tokens = palette([...data.tokenColors, ...custom.textMateRules], custom, isDark);
        themes.push(theme);
        if (contribution.id === name || display === name) activeTheme = theme.id;
      } catch {
      }
    }
  }
  themes.sort((a, b) => a.label.localeCompare(b.label, vscode.env.language));
  return { themes, activeTheme };
}
