import {Attributes, levelList} from "./Template";
import {Input, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {AttributesProps} from "../../data";

/**
 * 按钮私有属性面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */

const labelStyle = {flex: '0 0 80px'}
export default function (props: AttributesProps<Attributes>) {
  const [attributes, setAttributes] = useState<Attributes>(props.attributes);

  function handleChange (attributes: Attributes) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  useEffect(() => {
    setAttributes(props?.attributes)
  }, [props?.attributes])

  return (
    <Space style={{width: '100%'}} direction={'vertical'}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={labelStyle}>标题：</div>
        <Input
          style={{flex: 1}}
          value={attributes?.title}
          onChange={e => {
            handleChange({
              ...(attributes || {}),
              title: e.target.value
            })
          }}
        />
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={labelStyle}>标题级别：</div>
        <Select
          style={{flex: 1}}
          value={attributes.titleLevel}
          options={levelList.map(level => ({label: level, value: level}))}
          onChange={titleLevel => {
            handleChange({
              ...(attributes || {}),
              titleLevel
            })
          }}
        />
      </div>
    </Space>
  )
}
