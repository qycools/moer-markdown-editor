import {Constants} from "../constants";
import {addScript} from "../util/addScript";
import {graphvizRenderAdapter} from "./adapterRender";

declare class Viz {
    public renderSVGElement: (code: string) => Promise<any>;

    constructor();
}

export const graphvizRender = (element: HTMLElement, cdn = Constants.CDN) => {
    const graphvizElements = graphvizRenderAdapter.getElements(element);

    if (graphvizElements.length === 0) {
        return;
    }
    addScript(`${cdn}/dist/js/graphviz/viz.js`, "vditorGraphVizScript").then(() =>
        addScript(`${cdn}/dist/js/graphviz/full.render.js`, "vditorGraphVizFullScript")
    ).then(() => {
        graphvizElements.forEach((e: HTMLDivElement) => {
            const code = graphvizRenderAdapter.getCode(e);
            if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                return;
            }

            if (e.getAttribute("data-processed") === "true" || code.trim() === "") {
                return;
            }

            try {
                new Viz()
                    .renderSVGElement(code).then((result: HTMLElement) => {
                        e.innerHTML = result.outerHTML;
                    }).catch((error) => {
                        e.innerHTML = `graphviz render error: <br>${error}`;
                        e.className = "vditor-reset--error";
                    });
            } catch (e) {
                console.error("graphviz error", e);
            }

            e.setAttribute("data-processed", "true");
        });
    });
};
