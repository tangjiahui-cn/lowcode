import ICustomSelect from '@/common/ICustomSelect';
import React, { useEffect, useState } from 'react';
import RenderInput from './RenderInput';

export type InputValueTypeName = 'string' | 'number' | 'boolean' | 'object';

/**
 * 变量输入组件
 *
 * At 2023/12/1
 * By TangJiaHui
 */

interface IProps {
  style?: React.CSSProperties;
  value?: any; // 传入值
  onChange?: (value: any) => void;
}

export default function VariableInput(props: IProps) {
  const [value, setValue] = useState<any>(undefined);
  const [type, setType] = useState<InputValueTypeName>('string');
  const isObject = type === 'object';

  function getValueType(value: unknown): InputValueTypeName {
    if (Number.isFinite(value)) return 'number';
    if (typeof value === 'object' && value) return 'object';
    return 'string';
  }

  useEffect(() => {
    setType(getValueType(props?.value));
    setValue(props?.value);
  }, [props?.value]);

  return (
    <div
      style={{ display: 'flex', alignItems: isObject ? 'flex-start' : 'center', ...props?.style }}
    >
      <RenderInput
        style={{ flex: 1 }}
        type={type}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
      <ICustomSelect
        value={type}
        style={{ width: 90 }}
        onChange={(type: any) => {
          const value = type === 'object' ? {} : undefined;
          setValue(value);
          setType(type);
          props?.onChange?.(value);
        }}
        requestFn={async () => [
          { label: '数字', value: 'number' },
          { label: '字符串', value: 'string' },
          { label: '布尔值', value: 'boolean' },
          { label: '对象', value: 'object' },
        ]}
      />
    </div>
  );
}
