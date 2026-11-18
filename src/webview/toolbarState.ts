export function installToolbarState(toolbar: HTMLElement, native: HTMLElement, overlay: HTMLElement) {
  const formats = ["headings", "bold", "italic", "strike", "link", "list", "ordered-list", "check", "table", "quote", "code"];
  const menus: Record<string, string> = {
    headings: ".heading-picker",
    export: "#perform-export",
    search: "#search-bar",
    settings: "#settings-menu",
    textColor: '#palette-menu[data-palette="color"]',
    backgroundColor: '#palette-menu[data-palette="background-color"]'
  };
  let scheduled = false;
  const set = (button: Element | null, attribute: string, value: boolean) => {
    if (button && button.getAttribute(attribute) !== String(value)) button.setAttribute(attribute, String(value));
  };
  function update() {
    scheduled = false;
    for (const action of formats) {
      set(
        toolbar.querySelector(`[data-action="${action}"]`),
        "aria-pressed",
        !!native.querySelector(`[data-type="${action}"].vditor-menu--current`)
      );
    }
    for (const [action, selector] of Object.entries(menus)) {
      set(toolbar.querySelector(`[data-action="${action}"]`), "aria-expanded", !!document.querySelector(selector));
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  const observer = new MutationObserver(schedule);
  observer.observe(native, { subtree: true, attributes: true, attributeFilter: ["class"] });
  observer.observe(overlay, { childList: true, subtree: true });
  observer.observe(document.body, { childList: true });
  observer.observe(toolbar.parentElement!, { childList: true });
  schedule();
  return { refresh: schedule };
}
