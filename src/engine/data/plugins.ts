/**
 * 管理注册的插件
 *
 * At 2023/12/19
 * By TangJiaHui
 */
import { Plugin, PluginRender } from '..';

// 插件管理
export class PluginClass {
  // 最后一个注册的插件
  private lastRegister: Plugin | undefined;
  // 插件管理
  private data = new Map<string, Plugin>();
  // 获取一个插件
  get(id: string): Plugin | undefined {
    return this.data.get(id);
  }
  // 获取全部插件
  getAll(): Plugin[] {
    return [...(this.data.values() || [])];
  }
  // 判断插件是否存在
  isExist(id: string): boolean {
    return !!this.get(id);
  }
  // 注册一个插件
  register(plugin: Plugin) {
    if (this.isExist(plugin.id)) {
      throw new Error(`plugin "${plugin.name}" has been registered, which id is "${plugin.id}"`);
    }
    this.data.set(plugin.id, plugin);
    this.lastRegister = plugin;
  }
  // 批量注册插件
  registerSome(plugins: Plugin[]) {
    plugins.forEach((plugin: Plugin) => {
      this.register(plugin);
    });
  }
  // 获取渲染面板
  getRender(id: string): PluginRender | undefined {
    return this.get(id)?.render;
  }
  // 返回最后一个注册的插件
  getLastRegister(): Plugin | undefined {
    return this.lastRegister;
  }
}
