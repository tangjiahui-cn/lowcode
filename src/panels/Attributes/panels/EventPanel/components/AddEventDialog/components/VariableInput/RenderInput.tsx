import { InputValueTypeName } from '.';
import { Checkbox, Input, InputNumber } from 'antd';
import React from 'react';
import JSONEditor from '@/common/JSONEditor';

interface IProps {
  type?: InputValueTypeName;
  value?: any;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
}

export default function RenderInput(props: IProps) {
  if (props?.type === 'string') {
    return (
      <Input
        style={props?.style}
        placeholder={'请输入'}
        value={props?.value}
        onChange={(e) => props?.onChange?.(e.target.value)}
      />
    );
  }

  if (props?.type === 'number') {
    return (
      <InputNumber
        style={props?.style}
        placeholder={'请输入'}
        value={props?.value}
        onChange={(value) => props?.onChange?.(value)}
      />
    );
  }

  if (props?.type === 'boolean') {
    return (
      <Checkbox
        style={{ ...props?.style, userSelect: 'none' }}
        checked={props?.value}
        onChange={(e) => props?.onChange?.(e.target.checked)}
      >
        {props?.value ? '真值' : '假值'}
      </Checkbox>
    );
  }

  if (props?.type === 'object') {
    return (
      <div style={{ minHeight: 100, ...props?.style }}>
        <JSONEditor defaultValue={props?.value} onChange={(value) => props?.onChange?.(value)} />
      </div>
    );
  }
  return <></>;
}
