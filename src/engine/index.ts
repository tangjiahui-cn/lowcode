/**
 * 低代码引擎（微内核架构）
 *
 * At 2023.12.19
 * By TangJiaHui
 * Tips 各插件只能与内核交互，相互之间禁止交互。
 */
import { Component, Plugin } from './declarations';
import { Runtime } from './runtime';
import { createRoot } from 'react-dom/client';

export { Runtime } from './runtime';
export * from './declarations';
export * from './data';
export * from './enum';
export * from './jsx';
export * from './behavior';
export * from './hooks-common';
export * from './style-processor';
export * from './utils';
export * from './hooks';

const runtime = new Runtime();
class Engine {
  // 运行时
  private runtime = runtime;

  // 使用一个组件
  useComponent(component: Component) {
    this.runtime.components.register(component);
  }

  // 使用多个组件
  useComponents(components: Component[]) {
    this.runtime.components.registerSome(components);
  }

  // 使用插件
  usePlugin(plugin: Plugin) {
    this.runtime.plugins.register(plugin);
  }

  // 使用布局（对插件的dom进行布局）
  useLayout(layout: Plugin) {
    this.runtime.layouts.register(layout);
  }

  // 渲染到dom
  render(dom: HTMLElement) {
    if (!dom) {
      throw new Error('render dom target is not exist.');
    }

    // 挂载到挂载点
    const layout = this.runtime.layouts.getLastRegister()?.render?.({ runtime: this.runtime });
    const mountDom = document.createElement('div');
    const app = createRoot(mountDom);
    app.render(layout);
    dom.appendChild(mountDom);
  }
}
const engine = new Engine();
export { engine, runtime };
