import { Attributes } from './Template';
import { Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AttributesProps } from '../../core';

const buttonTypeOptions = ['primary', 'default', 'dashed', 'text'].map((type) => ({
  label: type,
  value: type,
}));

/**
 * 属性面板
 */
export default function (props: AttributesProps<Attributes>) {
  const [attributes, setAttributes] = useState<Attributes>(props.attributes);

  function handleChange(attributes: Attributes) {
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
        <Input
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
        <Select
          style={{ flex: 1 }}
          options={buttonTypeOptions}
          value={attributes?.type || 'default'}
          onChange={(type) => {
            handleChange({
              ...attributes,
              type,
            });
          }}
        />
      </div>
    </Space>
  );
}
