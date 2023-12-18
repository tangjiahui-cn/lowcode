import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css';
import BasicLayout from './layout/BasicLayout';
import Editor from './panels/Editor';
import Header from './panels/Header';
import Components from './panels/Components';
import Attributes from './panels/Attributes';
import Project from './panels/Project';
import { engine } from '@/core';
import { useEffect } from 'react';
import { registerComponents } from '@/components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Preview from './page-preview';

/**
 * 低代码平台 （用来设计中台管理系统）
 *
 * 支持功能：
 * - 项目管理器（支持路由、布局管理）
 * - 编辑器 (on、notify、节点更新/全量更新)
 * - 组件库 (notify)
 * - 属性面板 (on、notify)
 * - 组件树编辑器 (on、notify)
 * - JSON 编辑器 （on、notify）
 *
 * 支持特性：
 * （1）快速搭建业务系统
 * （2）自定义样式（布局、主题色）
 * （3）国际化
 * （4）自定义组件
 *
 * 抽象API：
 * - on: 监听事件
 * - notify: 发送事件
 * - 节点更新：更新一个节点
 * - 全量更新：更新所有节点
 *
 * 插件设计：
 * - name: 插件名称
 * - apiName: 引擎注册使用插件api名称
 * - api: 注册插件发送到引擎的事件名称(例如:插件暴露了'保存'操作，这里导出 'export' ）
 * - template: 插件渲染模板
 * (插件内部 on: 监听引擎接口)
 * (插件内部 notify: 触发引擎接口)
 *
 * 待支持组件列表：
 * 1、原子组件
 * （1）文字
 * （2）按钮
 * （3）输入框
 * （4）图标
 * （5）图片
 * （6）标题
 * （7）下拉框
 * （8）日期选择器
 *
 * 2、布局组件
 * （1）Flex布局
 * （2）自然布局
 * （3）栅格布局
 * （4）自由节点
 *
 * 3、图表组件
 * （1）基本表格
 * （2）折线图
 * （3）环形图
 *
 * 4、弹窗类
 * （1）弹窗组件
 * （2）抽屉组件
 */

// 注册组件库
registerComponents();

function App() {
  useEffect(() => {
    // create;
  }, []);

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

engine.project.fetchProject();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'preview',
    element: <Preview />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
