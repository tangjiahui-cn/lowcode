/**
 * 获取所有面板
 *
 * At 2023/12/11
 * By TangJiaHui
 */

const data: {
  editor: HTMLElement | undefined;
} = {
  editor: undefined,
};

export const panel = {
  setEditorDom(dom?: HTMLElement | null) {
    if (dom) {
      data.editor = dom;
    }
  },
  getEditorDom(): HTMLElement | undefined {
    return data.editor;
  },
};
