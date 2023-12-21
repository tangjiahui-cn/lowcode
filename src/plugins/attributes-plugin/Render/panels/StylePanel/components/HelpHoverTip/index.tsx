import React from 'react';
import { Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { TooltipPlacement } from 'antd/lib/tooltip';

/**
 * 鼠标移入显示提示文字
 */
interface IProps {
  placement?: TooltipPlacement;
  content?: string | React.ReactNode;
  style?: React.CSSProperties;
  popoverStyle?: React.CSSProperties;
  children?: any;
}
export default function HelpHoverTip(props: IProps) {
  const { popoverStyle = {}, style = {}, placement = 'top' } = props;

  return (
    <Popover placement={placement} title={null} content={props?.content} style={popoverStyle}>
      {props?.children || (
        <QuestionCircleOutlined style={{ color: '#bfbfbf', cursor: 'pointer', ...style }} />
      )}
    </Popover>
  );
}
