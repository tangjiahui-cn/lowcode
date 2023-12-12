import { engine } from '..';

export const global = {
  clear() {
    // console.log('清空');
  },
  save() {
    // console.log('保存');
    console.log(engine.jsonNode.getPage(), engine.instance.getAll());
  },
};
