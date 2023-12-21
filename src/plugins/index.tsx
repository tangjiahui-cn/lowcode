/**
 * 插件与内核交互：
 * （1）交互内容：
 *  - jsonNode：实例数据
 *  - instance：实例
 *  - Component：组件
 *
 * （2）交互逻辑
 * - notify：广播
 * - hook: 拦截
 */

export { default as ComponentsPlugin } from './components-plugin';
export { default as HeaderPlugin } from './header-plugin';
export { default as EditorPlugin } from './editor-plugin';
export { default as AttributesPlugin } from './attributes-plugin';
