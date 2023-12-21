/**
 * 渲染插件的面板
 *
 * At 2023/12/19
 * By TangJiaHui
 */

import { PluginRender, Runtime } from '..';

export type RenderPluginProps = {
  pluginId: string;
  runtime: Runtime;
};

export function RenderPlugin(props: RenderPluginProps) {
  const Comp: PluginRender | undefined = props?.runtime.plugins.getRender(props?.pluginId);
  return Comp ? <Comp runtime={props?.runtime} /> : undefined;
}
