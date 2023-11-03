/**
 * 自定义组件
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import {currentComponents} from "../data";
import IPage from './IPage';
import IButton from './IButton';
import ITextArea from './ITextArea';
import IContainer from './IContainer';
import ITable from './ITable';

export function registerComponents () {
  currentComponents.add(IPage);
  currentComponents.add(IButton);
  currentComponents.add(ITextArea);
  currentComponents.add(IContainer);
  currentComponents.add(ITable);
}
