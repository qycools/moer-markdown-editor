import { Constants } from "../constants";
import { addScript } from "../util/addScript";
import { genUUID } from "../util/function";
import { mermaidRenderAdapter } from "./adapterRender";

declare const mermaid: {
    initialize(options: object): void;
    render(id: string, text: string): Promise<{ svg: string }>;
};

const requests = new WeakMap<Element, { source: string; dark: boolean }>();
let rendering = Promise.resolve();

function palette(dark: boolean) {
    const colors = dark
        ? { background: "#192927", primaryColor: "#23423F", primaryTextColor: "#ECFAF6", primaryBorderColor: "#6DABA0",
            secondaryColor: "#283E53", tertiaryColor: "#433928", lineColor: "#A6CFC5", edgeLabelBackground: "#283D39" }
        : { background: "#FAF7EE", primaryColor: "#E0F0EB", primaryTextColor: "#193C39", primaryBorderColor: "#53847A",
            secondaryColor: "#E4EEF7", tertiaryColor: "#F6EAD3", lineColor: "#40695F", edgeLabelBackground: "#F4F7F1" };
    return { ...colors, darkMode: dark, textColor: colors.primaryTextColor,
        secondaryTextColor: colors.primaryTextColor, tertiaryTextColor: colors.primaryTextColor,
        clusterBkg: colors.tertiaryColor, clusterBorder: colors.primaryBorderColor };
}

export const mermaidRender = (element: HTMLElement | Document = document, cdn = Constants.CDN, theme: string, renderedOnly = false) => {
    const dark = theme === "dark";
    for (const item of mermaidRenderAdapter.getElements(element)) {
        const previous = requests.get(item);
        if (previous?.dark === dark || (!previous && (renderedOnly || item.getAttribute("data-processed") === "true"))) continue;
        const source = previous?.source ?? mermaidRenderAdapter.getCode(item);
        if (!source?.trim()) continue;
        const request = { source, dark };
        requests.set(item, request);
        rendering = rendering.then(async () => {
            const current = () => item.isConnected && requests.get(item) === request;
            if (!current()) return;
            const id = "mermaid" + genUUID();
            try {
                await addScript(`${cdn}/dist/js/mermaid/mermaid.min.js?v=11.17.2`, "vditorMermaidScript");
                if (!current()) return;
                mermaid.initialize({
                    securityLevel: "strict",
                    startOnLoad: false,
                    theme: "base",
                    themeVariables: palette(dark),
                    fontFamily: 'system-ui, "Microsoft YaHei", sans-serif',
                    flowchart: { htmlLabels: true, useMaxWidth: true },
                    sequence: { useMaxWidth: true, diagramMarginX: 8, diagramMarginY: 8, boxMargin: 8, showSequenceNumbers: true },
                    gantt: { leftPadding: 75, rightPadding: 20 },
                });
                const { svg } = await mermaid.render(id, source);
                if (!current()) return;
                item.innerHTML = svg;
                item.classList.remove("vditor-reset--error");
                item.setAttribute("data-processed", "true");
            } catch (error) {
                const failed = document.getElementById(id);
                if (failed?.parentElement?.id === "d" + id) failed.parentElement.remove();
                else failed?.remove();
                if (!current()) return;
                item.textContent = error instanceof Error ? error.message : String(error);
                item.classList.add("vditor-reset--error");
            }
        });
    }
};
