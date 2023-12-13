import {Component, cType, engine, TemplateProps} from '@/core';
import { useEffect, useRef } from 'react';

export default {
  cId: 'page',
  cType: cType.System,
  cName: '页面',
  icon: undefined,
  template: Template,
  attributesTemplate: Attributes,

  isPage: true,
  isChildren: true,
} as Component;

function Template(props: TemplateProps<any>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => ref.current);
  }, []);

  return (
    <div
      ref={ref}
      {...props?.events}
      style={{
        background: 'white',
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        ...engine.styleProcessor.getStyle(props?.styleData)
      }}
    >
      {props?.children}
    </div>
  );
}

function Attributes() {
  return <div>属性设置</div>;
}
