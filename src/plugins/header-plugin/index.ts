import { Plugin } from '@/engine';
import Render from './Render';

export default {
  id: 'header-plugin',
  name: '头部配置项面板',
  render: Render,
} as Plugin;
