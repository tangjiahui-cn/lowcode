import {Button} from "antd";
import {ButtonType} from "antd/es/button";
import {TemplateProps} from "../../data";
import {useEffect, useRef} from "react";

export interface Attributes {
  type: ButtonType;
  value: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLButtonElement>) {
  const domRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, [])

  return (
    <Button
      ref={domRef}
      style={props?.style}
      type={props?.attributes?.type}
      {...props?.events}
    >
      {props?.attributes?.value}
    </Button>
  )
}
