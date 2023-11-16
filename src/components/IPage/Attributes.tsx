import { Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AttributesProps } from '../../core';
import { Attributes } from './Template';

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
      <Space>
        标题：
        <Input
          value={attributes?.title}
          onChange={(e) => {
            handleChange({
              ...(attributes || {}),
              title: e.target.value,
            });
          }}
        />
      </Space>
    </Space>
  );
}
