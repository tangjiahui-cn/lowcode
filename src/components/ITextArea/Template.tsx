import {Input} from "antd";
import {TemplateProps} from "../../data";
import {useEffect, useRef, useState} from "react";

export interface Attributes {
  value: string;
}

/**
 * 按钮
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function (props: TemplateProps<Attributes, HTMLTextAreaElement>) {
  const ref = useRef<any>(null);
  const [attributes, setAttributes] = useState<Attributes | undefined>(props?.attributes)

  useEffect(() => {
    setAttributes(props?.attributes)
  }, [props?.attributes])

  useEffect(() => {
    props?.getDomFn?.(() => ref.current?.resizableTextArea?.textArea);
  }, [])

  return (
    <Input.TextArea
      ref={ref}
      style={props?.style}
      placeholder={'请输入'}
      value={attributes?.value}
      onChange={e => setAttributes({
        ...attributes,
        value: e.target.value
      })}
      {...props?.events}
    >
      {attributes?.value}
    </Input.TextArea>
  )
}
