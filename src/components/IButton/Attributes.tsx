import {IButtonAttributes} from "./Template";
import {Input, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {AttributesProps} from "../../data";

const buttonTypeOptions = ['primary', 'default', 'dashed', 'text']
  .map(type => ({label: type, value: type}))

/**
 * 按钮私有属性面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function (props: AttributesProps<IButtonAttributes>) {
  const [attributes, setAttributes] = useState<IButtonAttributes>(props.attributes);

  function handleChange (attributes: IButtonAttributes) {
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
              ...(attributes || {}),
              value: e.target.value
            })
          }}
        />
      </Space>
      <Space>
        类型：
        <Select
          options={buttonTypeOptions}
          value={attributes?.type}
          onChange={(type) => {
            handleChange({
              ...attributes,
              type
            })
          }}
        />
      </Space>
    </Space>
  )
}
