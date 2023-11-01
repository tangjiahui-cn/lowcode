import {Attributes} from "./Template";
import {Input, Space} from "antd";
import {useEffect, useState} from "react";

export interface IProps {
  attributes: Attributes;
  onChange: (attributes: Attributes) => void;
}

/**
 * 按钮私有属性面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function (props: IProps) {
  const [attributes, setAttributes] = useState(props?.attributes);

  function handleChange (attributes: Attributes) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  useEffect(() => {
    setAttributes(props?.attributes)
  }, [props?.attributes])

  return (
    <Space style={{width: '100%'}} direction={'vertical'}>
      <Space>
        文字：
        <Input
          value={attributes?.value}
          onChange={e => {
            handleChange({
              ...attributes,
              value: e.target.value
            })
          }}
        />
      </Space>
    </Space>
  )
}
