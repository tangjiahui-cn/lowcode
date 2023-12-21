import { Plugin } from '@/engine';
import Render from './Render';

export default {
  id: 'attributes-plugin',
  name: '属性配置面板',
  render: Render,
} as Plugin;
