import {Constants} from "../constants";
import {addScript} from "../util/addScript";
import {markmapRenderAdapter} from "./adapterRender";
import {markmapFitEvent, markmapSource, setMarkmapHeight} from "./markmapSize";

declare const window: any;
const enabled: Record<string, boolean> = {};

const transform = (transformer: any,content: string)=>{
    const result = transformer.transform(content);
    const keys = Object.keys(result.features).filter((key) => !enabled[key]);
    keys.forEach((key) => {
        enabled[key] = true;
    });
    const { styles, scripts } = transformer.getAssets(keys);
    const { markmap } = window;
    if (styles) markmap.loadCSS(styles);
    if (scripts) markmap.loadJS(scripts);
    return result;
}

const init = (el: HTMLElement, code: string, signal?: AbortSignal) => {
    const {Transformer, Markmap, deriveOptions} = window.markmap;
    const transformer = new Transformer();
    const source = markmapSource(code);
    setMarkmapHeight(el, source.height);
    el.innerHTML = '<svg style="display:block;width:100%;height:var(--vm-markmap-height)"></svg>';
    const svg = el.firstChild as SVGElement;
    const mm = Markmap.create(svg, null);
    let viewport = svg.getBoundingClientRect();
    // Relative SVG lengths are unavailable to D3 after Vditor replaces a preview.
    mm.zoom.extent(() => {
        const current = svg.getBoundingClientRect();
        if (current.width && current.height) {
            viewport = current;
        }
        return [[0, 0], [viewport.width || 1, viewport.height || 1]];
    });
    svg.addEventListener(markmapFitEvent, () => {
        mm.svg.interrupt();
        void mm.fit();
    });
    signal?.addEventListener("abort", () => {
        mm.svg.interrupt();
        mm.svg.selectAll("*").interrupt();
        mm.destroy();
    }, {once: true});
    const {root, frontmatter} = transform(transformer, source.code);
    const markmapOptions = frontmatter?.markmap;
    const frontmatterOptions = deriveOptions(markmapOptions);
    mm.setData(root, frontmatterOptions);
    return mm.fit();
};


export const markmapRender = (element: (HTMLElement | Document) = document, cdn = Constants.CDN, signal?: AbortSignal) => {
    const markmapElements = markmapRenderAdapter.getElements(element);
    if (markmapElements.length === 0) {
        return;
    }
    return addScript(`${cdn}/dist/js/markmap/markmap.min.js`, "vditorMarkerScript").then(() => {
        if (signal?.aborted) {
            return;
        }
        return Promise.all([...markmapElements].map((item) => {
            const code = markmapRenderAdapter.getCode(item);
            if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
                return;
            }
            const render = document.createElement("div")
            render.className = "language-markmap"
            item.parentNode.appendChild(render)
            const ready = init(render, code, signal);

            if(item.parentNode.childNodes[0].nodeName == "CODE"){
                item.parentNode.removeChild(item.parentNode.childNodes[0])
            }
            return ready;
        }));
    });
};
