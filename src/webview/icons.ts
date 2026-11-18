declare const list_tree_default: string;
declare const vscode_default: string;
declare const save_default: string;
declare const text_size_default: string;
declare const bold_default: string;
declare const italic_default: string;
declare const strikethrough_default: string;
declare const link_default: string;
declare const symbol_color_default: string;
declare const paintcan_default: string;
declare const export_default: string;
declare const color_mode_default: string;
declare const lightbulb_default: string;
declare const list_unordered_default: string;
declare const list_ordered_default: string;
declare const checklist_default: string;
declare const table_default: string;
declare const quote_default: string;
declare const code_default: string;
declare const discard_default: string;
declare const redo_default: string;
declare const search_default: string;
declare const record_keys_default: string;
declare const settings_gear_default: string;
declare const copy_default: string;
declare const clippy_default: string;
declare const trash_default: string;
declare const gripper_default: string;
declare const screen_cut_default: string;
declare const indent_default: string;
declare const add_default: string;
declare const sync_default: string;
declare const split_horizontal_default: string;
declare const fold_default: string;

const eraser =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 5 5a2 2 0 0 1 0 3L11 21H6l-4-4a2 2 0 0 1 0-3L13 3a2 2 0 0 1 3 0Z"/><path d="m7 9 8 8M10 21h11"/></svg>';

const icons: Record<string, string> = {
  outline: list_tree_default,
  source: vscode_default,
  save: save_default,
  headings: text_size_default,
  bold: bold_default,
  italic: italic_default,
  strike: strikethrough_default,
  link: link_default,
  textColor: symbol_color_default,
  backgroundColor: paintcan_default,
  export: export_default,
  theme: color_mode_default,
  brightness: lightbulb_default,
  list: list_unordered_default,
  "ordered-list": list_ordered_default,
  check: checklist_default,
  table: table_default,
  quote: quote_default,
  code: code_default,
  undo: discard_default,
  redo: redo_default,
  search: search_default,
  shortcuts: record_keys_default,
  settings: settings_gear_default,
  copy: copy_default,
  paste: clippy_default,
  trash: trash_default,
  grip: gripper_default,
  cut: screen_cut_default,
  indent: indent_default,
  add: add_default,
  convert: sync_default,
  columns: split_horizontal_default,
  fold: fold_default,
  eraser
};

export const icon = (id: string) =>
  (icons[id] || settings_gear_default).replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
