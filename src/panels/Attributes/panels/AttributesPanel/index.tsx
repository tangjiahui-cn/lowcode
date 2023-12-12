/**
 * 实例属性面板
 *
 * At 2023/12/12
 * By TangJiaHui
 */
import { Component, JsonNode } from '@/core';
import { useEffect, useState } from 'react';

interface IProps {
  jsonNode: JsonNode;
  component?: Component;
  onChange?: (attributes?: any) => void;
}

export default function (props: IProps) {
  const [attributes, setAttributes] = useState<any>(props.jsonNode?.attributes);

  function handleChange(attributes: any) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  useEffect(() => {
    // 重置attributes
    setAttributes(props?.jsonNode?.attributes);
  }, [props?.jsonNode]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {props?.component?.attributeTemplate && (
        <props.component.attributeTemplate attributes={attributes} onChange={handleChange} />
      )}
    </div>
  );
}
