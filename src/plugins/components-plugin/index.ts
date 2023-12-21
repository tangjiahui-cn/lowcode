import { Plugin } from '@/engine';
import Render from './Render';

export default {
  id: 'components-plugin',
  name: '组件库',
  render: Render,
} as Plugin;
