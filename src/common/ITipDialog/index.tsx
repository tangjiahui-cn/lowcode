import React from 'react';
import { TipDialogPool } from './TipDialogPool';

export interface TipDialogPoolOpenProps {
  // 标题前的图标（false则不显示图标）
  icon?: React.ReactNode;
  // 标题前图表的样式
  iconStyle?: React.CSSProperties;
  // 标题
  title?: React.ReactNode;
  // 提示内容
  content?: React.ReactNode;
  // 确定按钮文字
  okText?: React.ReactNode;
  // 取消按钮文字
  cancelText?: React.ReactNode;
  // 确定回调按钮（调用close函数关闭弹窗）
  onOk?: (close: () => void) => void;
}

export interface TipDialogPoolProps {
  open: (props: TipDialogPoolOpenProps) => void;
}

const TipDialog = new TipDialogPool();
export default TipDialog as TipDialogPoolProps;
