import { engine } from '..';
import { message } from 'antd';

export const global = {
  clear() {
    // 清空保存数据
    engine.project.clearCurrentContent();
    // 清空编辑器
    const current = engine.project.getCurrent();
    current && engine.api.project.setPage(current.json);
  },
  save() {
    engine.project.saveProject().then(() => {
      message.success('保存成功');
    });
  },
  preview() {
    // 预览
  },
};
