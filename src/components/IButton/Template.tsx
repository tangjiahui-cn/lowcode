import {Button} from "antd";
import {ButtonType} from "antd/es/button";
import {TemplateProps} from "../../data";
import {useEffect, useRef} from "react";

export interface IButtonAttributes {
  type: ButtonType;
  value: string;
}

/**
 * 按钮
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function (props: TemplateProps<IButtonAttributes, HTMLButtonElement>) {
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
