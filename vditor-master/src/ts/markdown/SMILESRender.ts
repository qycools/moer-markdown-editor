import {Constants} from "../constants";
import {addScript} from "../util/addScript";
import {SMILESRenderAdapter} from "./adapterRender";
import {genUUID} from "../util/function";

declare class SmiDrawer {
    constructor(moleculeOptions: IObject, reactionOptions: IObject);

    public draw: (code: string, id: string, theme?: string) => void;
}

export const SMILESRender = (element: (HTMLElement | Document) = document, cdn = Constants.CDN, theme: string) => {
    const SMILESElements = SMILESRenderAdapter.getElements(element);
    if (SMILESElements.length > 0) {
        addScript(`${cdn}/dist/js/smiles-drawer/smiles-drawer.min.js?v=2.1.7`, "vditorSmilesScript").then(() => {
            let sd = new SmiDrawer({}, {});
            SMILESElements.forEach((item: HTMLDivElement) => {
                if (item.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                    item.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                }
                if (item.tagName === "PRE" && item.querySelector("code.language-smiles")) {
                    return;
                }
                const code = SMILESRenderAdapter.getCode(item).trim();
                if (item.getAttribute("data-processed") === "true" || code.trim() === "") {
                    return;
                }
                const id = "smiles" + genUUID()
                const target = document.createElement("div");
                target.className = "language-smiles";
                target.innerHTML = `<svg id="${id}"></svg>`;
                if (item.tagName === "CODE" && item.parentElement.tagName === "PRE") {
                    item.parentElement.replaceWith(target);
                } else {
                    item.replaceWith(target);
                }
                sd.draw(code, '#' + id, theme === "dark" ? "dark" : undefined)
                target.setAttribute("data-processed", "true");
            });
        });
    }
};
