import {TemplateProps} from "../../data";
import {useEffect, useRef} from "react";

export interface Attributes {
  title: string;
}
/**
 * 按钮
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function (props: TemplateProps<Attributes, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, [])

  return (
    <div
      ref={domRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...props?.style
      }}
      {...props?.events}
    >
      {props?.attributes?.title && <h1>{props?.attributes?.title}</h1>}
      {props?.children}
    </div>
  )
}
