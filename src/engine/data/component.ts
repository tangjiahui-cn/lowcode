/**
 * 当前注册的组件库
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import { Component, cType } from '..';

const DEFAULT_IMAGE = createImage(
  'https://ts1.cn.mm.bing.net/th?id=OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
);

export class ComponentClass {
  // 页面组件（只能存在一个）
  private pageComponent: Component | undefined = undefined;
  // 已注册组件
  private components: Map<string, Component> = new Map();
  // 已注册组件拖拽图标
  private images: Map<string, HTMLImageElement> = new Map();

  // 获取页面组件
  getPageComponent(): Component | undefined {
    return this.pageComponent;
  }
  // 批量注册组件
  registerSome(components: Component[]) {
    components.forEach((component) => {
      this.register(component);
    });
  }
  // 注册一个组件
  register(component: Component) {
    if (component.isPage) {
      if (this.pageComponent) {
        throw Error('page component have been exits.');
      }
      this.pageComponent = component;
    }
    this.components.set(component.cId, component);
    this.images.set(component.cId, component?.icon ? createImage(component.icon) : DEFAULT_IMAGE);
  }
  // 取消注册一个组件
  unRegister(cId: string = '') {
    if (this.pageComponent?.cId === cId) {
      this.pageComponent = undefined;
    }
    this.components.delete(cId);
    this.images.delete(cId);
  }
  // 获取所有的组件（通过cType）
  getAllByCType(cType?: cType): Component[] {
    const componentList: Component[] = [...this.components.values()];
    return cType ? componentList.filter((x) => x.cType === cType) : componentList;
  }
  // 获取所有的组件
  getAll(): Component[] {
    return this.getAllByCType();
  }
  // 获取一个组件
  get(cId: string = ''): Component | undefined {
    return this.components.get(cId);
  }
  // 获取拖拽图像
  getDragImage(cId: string = ''): HTMLImageElement {
    return this.images.get(cId) || DEFAULT_IMAGE;
  }
}

// 创建一个image标签
function createImage(url: string): HTMLImageElement {
  const img = document.createElement('img');
  img.src = url;
  return img;
}
