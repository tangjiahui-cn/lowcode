/**
 * 自定义组件
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import { engine } from '@/core';
import Page from './Page';
import Button from './Button';
import Menu from './Menu';
import Container from './Container';
import Table from './Table';
import LayoutChildren from './LayoutChildren';

export function registerComponents() {
  engine.component.register(Page);
  engine.component.register(Button);
  engine.component.register(Menu);
  engine.component.register(LayoutChildren);
  engine.component.register(Container);
  engine.component.register(Table);
}
