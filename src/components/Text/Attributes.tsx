import { AttributesType } from './Template';
import { Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AttributesProps } from '@/core';

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
    </Space>
  );
}
