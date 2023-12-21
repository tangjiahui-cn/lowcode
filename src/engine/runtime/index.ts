/**
 * 运行时
 *
 * At 2023/12/19
 * By TangJiaHui
 */
import { ComponentClass, InstanceClass, JsonNodeClass, PluginClass } from '..';

export class Runtime {
  // 实例
  instances = new InstanceClass();
  // 注册组件
  components = new ComponentClass();
  // jsonNode
  jsonNodes = new JsonNodeClass();
  // 注册插件
  plugins = new PluginClass();
  // 注册布局
  layouts = new PluginClass();
}
