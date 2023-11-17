import { createElement, useEffect, useMemo, useRef } from 'react';
import DropHereEmpty from '../../components-sys/DropHereEmpty';
import { TemplateProps } from '../../core';

export const levelList: string[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
export interface Attributes {
  // 页面标题
  title?: string;
  // 页面标题级别
  titleLevel?: string;

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

  const TitleTag = useMemo(() => {
    return createElement(props?.attributes?.titleLevel || 'h1', {
      children: props?.attributes?.title,
    });
  }, [props?.attributes?.titleLevel, props?.attributes?.title]);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        ...props?.style,
        ...props?.attributes?.childrenStyle,
      }}
      {...props?.events}
    >
      {props?.attributes?.title && TitleTag}
      {props?.children}
      {!props?.children?.length && <DropHereEmpty />}
    </div>
  );
}
