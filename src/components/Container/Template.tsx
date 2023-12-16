import { useEffect, useRef } from 'react';
import DropHereEmpty from '@/common/DropHereEmpty';
import { engine, TemplateProps } from '@/core';

export interface Attributes {
  // 容器布局属性
  childrenStyle?: {
    /** 布局 **/
    display?: 'flex';
    gap?: number;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    alignContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'stretch';
  };
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        position: 'relative',
        ...engine.styleProcessor.getStyle(props?.styleData),
        ...props?.attributes?.childrenStyle,
      }}
      {...props?.events}
    >
      {props?.children?.length ? props?.children : <DropHereEmpty />}
    </div>
  );
}
