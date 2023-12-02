import { Space } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AddOptionDialog from '../AddOptionDialog';
import { useState } from 'react';
import { css } from 'class-css';
import classNames from 'classnames';

const disabledStyle = css({
  color: 'gray',
  cursor: 'not-allowed',
  '&:hover': {
    color: 'gray',
    cursor: 'not-allowed',
  },
});

export interface Option {
  label: string;
  value: string;
}

interface IProps {
  isTop?: boolean;
  isBottom?: boolean;
  option?: Option;
  options?: Option[]; // 用于校验value唯一性
  onChange?: (option: Option) => void;
  onDelete?: () => void;
  onMoveTop?: () => void;
  onMoveDown?: () => void;
}
export default function (props: IProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
          background: 'whitesmoke',
        },
      })}
    >
      <div style={{ flex: 1, display: 'flex', gap: 8 }} onClick={() => setVisible(true)}>
        {props?.option?.label}
        <span style={{ color: '#bdbdbd' }}>({props?.option?.value})</span>
      </div>
      <Space onClick={(e) => e.stopPropagation()}>
        <a
          onClick={props?.isTop ? undefined : props?.onMoveTop}
          className={classNames({
            [disabledStyle]: props?.isTop,
          })}
        >
          <ArrowUpOutlined />
        </a>
        <a
          onClick={props?.isBottom ? undefined : props?.onMoveDown}
          className={classNames({
            [disabledStyle]: props?.isBottom,
          })}
        >
          <ArrowDownOutlined />
        </a>
        <a onClick={props?.onDelete}>
          <DeleteOutlined />
        </a>
        <a onClick={() => setVisible(true)}>
          <SettingOutlined />
        </a>
      </Space>

      <AddOptionDialog
        isEdit
        options={props.options}
        visible={visible}
        option={props?.option}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={(option) => {
          setVisible(false);
          props?.onChange?.(option);
        }}
      />
    </div>
  );
}
