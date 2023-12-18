/**
 * 鼠标经过、选中显示浮层
 *
 * At 2023/12/15
 * By TangJiaHui
 */
import { engine, Operate } from '..';

let data: Operate[] = [];
export const wrapBox = {
  add(box: Operate) {
    data.push(box);
  },
  remove(box?: Operate) {
    if (!box) return;
    data = data.filter((x) => x !== box);
  },
  getAll(): Operate[] {
    return data;
  },
  clear() {
    engine.instance.clearSelected();
    data?.forEach((x) => x?.hide?.());
    data = [];
  },
  resizeAll() {
    data?.forEach((x) => {
      x?.resize?.();
    });
  },
};
