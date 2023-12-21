import { AttributesType } from './Template';
import { Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AttributesProps } from '@/core';
import ICustomSelect from '@/common/ICustomSelect';

/**
 * 属性面板
 */
export default function (props: AttributesProps<AttributesType>) {
  const [attributes, setAttributes] = useState<AttributesType>(props.attributes);

  function handleChange(attributes: AttributesType) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  useEffect(() => {
    setAttributes(props?.attributes);
  }, [props?.attributes]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        文字：
        <Input.TextArea
          style={{ flex: 1 }}
          value={attributes?.value}
          onChange={(e) => {
            handleChange({
              ...(attributes || {}),
              value: e.target.value,
            });
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        类型：
        <ICustomSelect
          style={{ flex: 1 }}
          requestFn={async () => [
            { label: 'h1', value: 'h1' },
            { label: 'h2', value: 'h2' },
            { label: 'h3', value: 'h3' },
            { label: 'h4', value: 'h4' },
            { label: 'h5', value: 'h5' },
            { label: 'h6', value: 'h6' },
          ]}
          value={attributes?.type}
          onChange={(type: any) => {
            handleChange({
              ...(attributes || {}),
              type,
            });
          }}
        />
      </div>
    </Space>
  );
}
