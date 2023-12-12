import { Component, cType, TemplateProps } from '@/core';
import { useEffect, useRef } from 'react';

export default {
  cId: 'container',
  cType: cType.Container,
  cName: '容器',
  icon: undefined,
  isChildren: true,
  template: Template,
  attributesTemplate: Attributes,
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
        position: 'relative',
        width: '100%',
      }}
    >
      {props?.children || (
        <div
          style={{
            height: 80,
            lineHeight: '80px',
            textAlign: 'center',
            border: '2px dotted rgba(212, 212, 212)',
            background: '#e8e8e8',
            userSelect: 'none',
            color: 'rgba(0, 0, 0, 0.65)',
          }}
        >
          拖放组件到此处
        </div>
      )}
    </div>
  );
}

function Attributes() {
  return <div>属性设置</div>;
}
