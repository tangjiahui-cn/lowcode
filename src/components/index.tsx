/**
 * 自定义组件
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import IPage from './IPage';
import ISelect from './ISelect';
import IButton from './IButton';
import ITextArea from './ITextArea';
import IContainer from './IContainer';
import ITable from './ITable';
import IText from './IText';
import { engine } from '../core';

export function registerComponents() {
  engine.component.add(IPage);
  engine.component.add(IButton);
  engine.component.add(ISelect);
  engine.component.add(ITextArea);
  engine.component.add(IContainer);
  engine.component.add(ITable);
  engine.component.add(IText);
}
