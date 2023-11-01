/**
 * 自定义组件
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import IPage from './IPage';
import IButton from './IButton';
import ITextArea from './ITextArea';
import IContainer from './IContainer';
import {currentComponents} from "../data";

export function registerComponents () {
  currentComponents.add(IPage);
  currentComponents.add(IButton);
  currentComponents.add(ITextArea);
  currentComponents.add(IContainer);
}
