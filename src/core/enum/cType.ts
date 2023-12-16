/**
 * 组件类型分类
 *
 * At 2023/12/11
 * By TangJiaHui
 */

export enum cType {
  System, // 系统组件（不参与展示）
  Base, // 原子组件
  Container, // 容器组件
  Table, // 列表组件
  LayoutChildren, // 布局占位符组件
}
