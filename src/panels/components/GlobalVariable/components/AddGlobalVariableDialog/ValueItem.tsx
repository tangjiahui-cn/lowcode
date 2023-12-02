import { GlobalVariableType, GlobalVariableValue } from '../../../../../core';
import { Checkbox, Input, InputNumber } from 'antd';
import ObjectItem from './ObjectItem';

interface IProps {
  type?: GlobalVariableType;
  value?: GlobalVariableValue;
  onChange?: (value: GlobalVariableValue) => void;
}

export default function (props: IProps) {
  if (props?.type === 'number') {
    return (
      <InputNumber
        placeholder={'请输入'}
        value={props?.value as any}
        style={{ width: '100%' }}
        onChange={(value) => props?.onChange?.(value)}
      />
    );
  }
  if (props?.type === 'string') {
    return (
      <Input
        placeholder={'请输入'}
        value={props?.value as any}
        onChange={(e) => props?.onChange?.(e.target.value)}
      />
    );
  }
  if (props?.type === 'boolean') {
    return (
      <Checkbox
        checked={props?.value as any}
        onChange={(e) => {
          props?.onChange?.(e.target.checked);
        }}
      />
    );
  }

  if (props?.type === 'object') {
    return <ObjectItem value={props?.value as any} onChange={props?.onChange} />;
  }
  return <div>undefined</div>;
}
