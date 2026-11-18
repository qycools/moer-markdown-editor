export const markmapHeight = { min: 160, max: 2400, default: 360 };
export const markmapFitEvent = "moye-markmap-fit";

const marker = /^<!-- moye-markmap-height: (\d+) -->[ \t]*\r?(?:\n|$)/m;

export function markmapSource(code: string) {
    const height = Number(code.match(marker)?.[1]);
    return {
        code: code.replace(marker, ""),
        height: height >= markmapHeight.min && height <= markmapHeight.max ? height : markmapHeight.default,
    };
}

export function withMarkmapHeight(code: string, height?: number) {
    const source = markmapSource(code).code;
    if (height === undefined) {
        return source;
    }
    return source + (source && !source.endsWith("\n") ? "\n" : "") + `<!-- moye-markmap-height: ${height} -->\n`;
}

export function setMarkmapHeight(element: HTMLElement, height: number) {
    element.style.setProperty("--vm-markmap-height", `${height}px`);
}
