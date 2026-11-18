const SUPPORTED = /^<span\s+style\s*=\s*["']([^"']+)["']\s*>$/i;

export function colorStyle(tag: string): string | undefined {
  const match = tag.replace(/\u200b/g, "").trim().match(SUPPORTED);
  if (!match) return undefined;
  const declarations = match[1].split(";").map((s) => s.trim()).filter(Boolean);
  const result: string[] = [];
  for (const declaration of declarations) {
    const size = declaration.match(/^font-size\s*:\s*(\d+(?:\.\d+)?(?:px|pt|em|rem|%))$/i);
    if (size && CSS.supports("font-size", size[1])) {
      result.push(`font-size:${size[1]}`);
      continue;
    }
    const pair = declaration.match(/^(color|background-color)\s*:\s*(#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i);
    if (!pair || !CSS.supports(pair[1], pair[2])) return undefined;
    result.push(`${pair[1]}:${pair[2]}`);
  }
  return result.length ? result.join(";") : undefined;
}

export function editTextStyles(target: Element, changes: Record<string, string | null>, lute: any, mode: string): Element {
  if (mode === "ir") {
    const surface = target.closest("[contenteditable=true]")!;
    let block = target;
    while (block.parentElement !== surface) block = block.parentElement!;
    const index = [...block.querySelectorAll("[data-vm-color]")].indexOf(target);
    const holder = document.createElement("div");
    holder.innerHTML = lute.Md2VditorDOM(lute.VditorIRDOM2Md(block.outerHTML));
    const selected = holder.querySelectorAll("[data-vm-color]")[index];
    if (!selected) throw new Error("文字格式已变化，请重新点击后修改。");
    editTextStyles(selected, changes, lute, "wysiwyg");
    const replacement = document.createElement("div");
    replacement.innerHTML = lute.Md2VditorIRDOM(lute.VditorDOM2Md(holder.innerHTML));
    const caret = replacement.firstElementChild!;
    block.replaceWith(...replacement.childNodes);
    return caret;
  }
  let highest = target;
  for (let parent = target.parentElement; parent && !parent.matches("[data-block]"); parent = parent.parentElement) {
    if (parent.matches("[data-vm-color]")) highest = parent;
  }
  const index = [highest, ...highest.querySelectorAll("[data-vm-color]")].indexOf(target);
  const copy = highest.cloneNode(true) as Element;
  const selected = [copy, ...copy.querySelectorAll("[data-vm-color]")][index] as HTMLElement;
  copy.querySelectorAll(".vm-color-token").forEach((token) => token.remove());
  const range = document.createRange();
  let before = document.createDocumentFragment();
  let after = document.createDocumentFragment();
  if (highest !== target) {
    range.selectNodeContents(copy);
    range.setEndBefore(selected);
    before = range.cloneContents();
    range.selectNodeContents(copy);
    range.setStartAfter(selected);
    after = range.cloneContents();
  }
  const style = document.createElement("span").style;
  const ancestry: HTMLElement[] = [];
  for (let node: HTMLElement | null = selected; node; node = node.parentElement) {
    ancestry.unshift(node);
    if (node === copy) break;
  }
  for (const node of ancestry) {
    if (node.hasAttribute("data-vm-color")) {
      for (const property of ["color", "background-color", "font-size"]) {
        if (node.style.getPropertyValue(property)) style.setProperty(property, node.style.getPropertyValue(property));
      }
    }
  }
  let middle = selected.cloneNode(true) as HTMLElement;
  middle.removeAttribute("style");
  middle.removeAttribute("data-vm-color");
  for (let node = selected.parentElement; node && node !== copy; node = node.parentElement) {
    const wrapper = node.cloneNode(false) as HTMLElement;
    if (wrapper.hasAttribute("data-vm-color")) {
      wrapper.removeAttribute("style");
      wrapper.removeAttribute("data-vm-color");
    }
    wrapper.append(middle);
    middle = wrapper;
  }
  for (const [property, value] of Object.entries(changes)) {
    value === null ? style.removeProperty(property) : style.setProperty(property, value);
    for (const span of middle.querySelectorAll<HTMLElement>("[data-vm-color]")) span.style.removeProperty(property);
  }
  const container = document.createElement("div");
  const part = (contents: DocumentFragment) => {
    if (!contents.textContent?.replace(/\u200b/g, "").trim()) return;
    const wrapper = copy.cloneNode(false) as Element;
    wrapper.append(contents);
    container.append(wrapper);
  };
  if (highest !== target) part(before);
  if (style.length) {
    const wrapper = document.createElement("span");
    wrapper.dataset.vmColor = "1";
    wrapper.setAttribute("style", style.cssText);
    wrapper.append(middle);
    container.append(wrapper);
  } else container.append(middle);
  if (highest !== target) part(after);
  for (const span of [...container.querySelectorAll<HTMLElement>("[data-vm-color]")].reverse()) {
    if (!span.style.length) {
      span.replaceWith(...span.childNodes);
      continue;
    }
    const template = document.createElement("div");
    template.innerHTML =
      mode === "ir"
        ? lute.Md2VditorIRDOM(`<span style="${span.style.cssText}">x</span>`)
        : lute.Md2VditorDOM(`<span style="${span.style.cssText}">x</span>`);
    const decorated = template.querySelector("[data-vm-color]")!;
    span.prepend(decorated.firstChild!.cloneNode(true));
    span.append(decorated.lastChild!.cloneNode(true));
  }
  highest.replaceWith(...container.childNodes);
  return middle;
}

export function undecorate(html: string): string {
  const root = document.createElement("div");
  root.innerHTML = html;
  for (const span of [...root.querySelectorAll("[data-vm-color]")].reverse()) span.replaceWith(...span.childNodes);
  for (const token of root.querySelectorAll(".vm-color-token")) token.classList.remove("vm-color-token");
  return root.innerHTML;
}

export function decorate(html: string): string {
  const root = document.createElement("div");
  root.innerHTML = html;
  for (const block of root.querySelectorAll("p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote")) {
    const stack: { token: Element; style: string | undefined }[] = [];
    for (const token of [...block.querySelectorAll('[data-type="html-inline"]')]) {
      if (token.closest("p,h1,h2,h3,h4,h5,h6,li,td,th,blockquote") !== block || token.closest("[data-vm-color]")) continue;
      const text = (token.textContent || "").replace(/\u200b/g, "").trim();
      if (/^<span\b/i.test(text)) stack.push({ token, style: colorStyle(text) });
      else if (/^<\/span\s*>$/i.test(text)) {
        const start = stack.pop();
        if (!start?.style || start.token.parentNode !== token.parentNode) continue;
        const span = document.createElement("span");
        span.dataset.vmColor = "1";
        span.setAttribute("style", start.style);
        start.token.before(span);
        let node: ChildNode | null = start.token;
        while (node) {
          const next: ChildNode | null = node.nextSibling;
          span.append(node);
          if (node === token) break;
          node = next;
        }
        start.token.classList.add("vm-color-token");
        token.classList.add("vm-color-token");
      }
    }
  }
  return root.innerHTML;
}

export function installColorAdapter(lute: any) {
  const produced = ["Md2VditorDOM", "Md2VditorIRDOM", "HTML2VditorDOM", "HTML2VditorIRDOM", "SpinVditorDOM", "SpinVditorIRDOM"];
  const consumed = ["SpinVditorDOM", "SpinVditorIRDOM", "VditorDOM2Md", "VditorIRDOM2Md", "VditorDOM2HTML", "VditorIRDOM2HTML"];
  for (const name of new Set([...produced, ...consumed])) {
    if (typeof lute[name] !== "function") continue;
    const original = lute[name].bind(lute);
    lute[name] = (value: string, ...rest: any[]) => {
      const output = original(consumed.includes(name) ? undecorate(value) : value, ...rest);
      return produced.includes(name) ? decorate(output) : output;
    };
  }
}
