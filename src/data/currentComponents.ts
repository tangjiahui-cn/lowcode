/**
 * 当前注册的组件库
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import * as React from "react";
import {CType} from "../enum/component";

export type Base = {
  x: string;
  y: string;
  w: string;
  h: string;
}

// 组件私有属性
export type AttributesProps<T> = {
  attributes: T;
  onChange: (attributes: T) => void;
}

// 模板组件属性
export type TemplateProps<Attributes, E = any> = {
  getDomFn: (fn: () => (E | null)) => void;
  // 属性
  attributes?: Attributes;
  // 样式
  style?: React.CSSProperties;
  // 事件
  events?: {
    onPointerDown?: React.PointerEventHandler<E>;
    onPointerEnter?: React.PointerEventHandler<E>;
    onPointerLeave?: React.PointerEventHandler<E>;
    onDragOver?: React.DragEventHandler<E>;
    onDrop?: React.DragEventHandler<E>;
    onScroll?: React.UIEventHandler<E>
  },
  // 子元素
  children?: React.ReactNode[];
}

// 模板组件类型
export type TemplateType = React.FunctionComponent<TemplateProps<any>>

// 自定义组件类型
export type RegisterComponent = {
  cId: string;  // 组件类型id
  name?: string; // 组件名称
  icon?: string; // 组件占位图标
  isPage?: boolean; // 是否是页面组件（根组件唯一）
  isContainer?: boolean;  // 是否是容器类组件（可以嵌套children）
  template: TemplateType; // 组件模板
  attributeTemplate?: any; // 组件私有属性模板
  defaultStyle?: React.CSSProperties; // 默认样式属性
  defaultAttributes?: any; // 默认私有属性
  cType: CType; // 组件类型（代办同一类组件，用于分类）

  /**** 将要抛弃的属性 ****/
  defaultBase?: Base; // 默认基础属性
}

interface CurrentComponents {
  // 添加一个组件
  add: (component: RegisterComponent) => void;
  // 移出一个组件
  remove: (cId: string) => void;
  // 获取所拥有的所有组件
  getAllComponents: (cType?: string) => RegisterComponent[];
  // 获取一个指定的组件
  getComponent: (cId?: string) => (RegisterComponent | undefined);
}

const components: Map<string, RegisterComponent> = new Map();
export const currentComponents: CurrentComponents = {
  add (component: RegisterComponent) {
    components.set(component.cId, component);
  },
  remove (cId: string) {
    components.delete(cId);
  },
  getAllComponents (cType?: string) : RegisterComponent[] {
    const componentList: RegisterComponent[] = [...components.values()];
    return cType
      ? componentList.filter(x => x.cType === cType)
      : componentList
  },
  getComponent (cId?: string) : RegisterComponent | undefined {
    return cId ? components.get(cId) : undefined
  }
}
