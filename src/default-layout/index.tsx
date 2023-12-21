import BaseLayout from './BasicLayout';
import { Plugin, RenderPluginProps } from '@/engine';

export default {
  id: 'base-layout',
  name: '基础布局',
  render(props: RenderPluginProps) {
    return <BaseLayout runtime={props?.runtime} />;
  },
} as Plugin;
