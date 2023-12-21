/**
 * 组件格式
 *
 * At 2023/12/19
 * By TangJiaHui
 */
import React from 'react';
import { Runtime } from '..';
export type PluginRenderProps = { runtime: Runtime };
export type PluginRender = React.FunctionComponent<PluginRenderProps>;

export interface Plugin {
  id: string; // 唯一id
  name: string; // 名称描述
  render?: PluginRender; // 渲染面板
}
