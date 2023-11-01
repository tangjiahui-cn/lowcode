import {Input} from "antd";
import {TemplateProps} from "../../data";
import {useEffect, useRef} from "react";

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

  useEffect(() => {
    props?.getDomFn?.(() => ref.current?.resizableTextArea?.textArea);
  }, [])

  return (
    <Input.TextArea
      ref={ref}
      style={props?.style}
      placeholder={'请输入'}
      {...props?.events}
    >
      {props?.attributes?.value}
    </Input.TextArea>
  )
}
