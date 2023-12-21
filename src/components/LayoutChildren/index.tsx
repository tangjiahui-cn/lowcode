import { Component, cType, engine, getEvent, TemplateProps } from '@/core';
import { useEffect, useRef } from 'react';
import IEmpty from '@/common/IEmpty';

interface AttributesType {}

export default {
  cId: 'layoutChildren',
  cType: cType.Layout,
  cName: 'Layout-children',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  isLayoutChildren: true,
} as Component<AttributesType>;

function Template(props: TemplateProps<AttributesType, HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => ref.current);
  }, []);

  return (
    <div
      ref={ref}
      {...getEvent(props?.events)}
      style={{
        height: '100%',
        width: '400px',
        display: 'inline-block',
        verticalAlign: 'middle',
        background: 'whitesmoke',
        overflow: 'hidden',
        ...engine.styleProcessor.getStyle(props?.styleData),
      }}
    >
      {props?.children || (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px dashed #e8e8e8',
            fontSize: 18,
            color: '#a4a4a4',
          }}
        >
          子元素 - 占位
        </div>
      )}
    </div>
  );
}

function Attributes() {
  return <IEmpty />;
}
