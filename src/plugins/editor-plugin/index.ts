import { Plugin } from '@/engine';
import Render from './Render';

export default {
  id: 'editor-plugin',
  name: '编辑器面板',
  render: Render,
} as Plugin;
