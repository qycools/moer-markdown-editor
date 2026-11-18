declare module '@local/vditor' {
  const Vditor: any;
  export default Vditor;
}
declare module '@local/mode' {
  export function setEditMode(vditor: any, mode: string, event: Event | string): void;
}
declare module '*.svg' { const svg: string; export default svg; }
declare module '@local/code' { export function processCodeRender(element: HTMLElement, vditor: any): void; }
declare module '@local/blockTools' { export function highlightToolbarWYSIWYG(vditor: any): void; export function genImagePopover(event: Event, vditor: any): void; }
interface Window {
  acquireVsCodeApi?: () => { postMessage(message: unknown): void; getState(): any; setState(state: unknown): void };
  VM_BOOT: any;
  VM_APP: any;
  VM_RENDER: any;
  Vditor: any;
}
