import { global } from './global';
import { project } from './project';
import { component } from './component';
import { editor } from './editor';

// api - 处理逻辑
export const api = {
  global, // 全局配置Api
  project, // 项目面板Api
  component, // 组件面板Api
  editor, // 编辑器面板Api
};
