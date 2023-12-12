import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import BasicLayout from './layout/BasicLayout';
import Editor from './panels/Editor';
import Header from './panels/Header';
import Components from './panels/Components';
import Attributes from './panels/Attributes';
import Project from './panels/Project';
import { registerComponents } from '@/components';
import { createPage, engine } from '@/core';

/**
 * 支持功能：
 * - 项目管理器（支持路由、布局管理）
 * - 编辑器 (on、notify、节点更新/全量更新)
 * - 组件库 (notify)
 * - 属性面板 (on、notify)
 * - 组件树编辑器 (on、notify)
 * - JSON 编辑器 （on、notify）
 *
 * 抽象API：
 * - on: 监听事件
 * - notify: 发送事件
 * - 节点更新：更新一个节点
 * - 全量更新：更新所有节点
 *
 *
 * 插件设计：
 * - name: 插件名称
 * - apiName: 引擎注册使用插件api名称
 * - api: 注册插件发送到引擎的事件名称(例如:插件暴露了'保存'操作，这里导出 'export' ）
 * - template: 插件渲染模板
 * (插件内部 on: 监听引擎接口)
 * (插件内部 notify: 触发引擎接口)
 */

function App() {
  return (
    <BasicLayout
      panels={{
        Editor,
        Header,
        Components,
        Attributes,
        Project,
      }}
    />
  );
}

registerComponents();

setTimeout(() => {
  engine.api.project.setPage([
    {
      ...createPage()?.[0],
      // children: [
      //   createJsonNode({ cId: 'table' }),
      //   createJsonNode({ cId: 'table' }),
      //   createJsonNode({ cId: 'table' }),
      // ],
    },
  ]);
  // engine.api.project.setPage(createPage());
}, 300);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
