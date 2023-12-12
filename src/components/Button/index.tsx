import { Button } from 'antd';
import { Component, cType, TemplateProps } from '@/core';
import { useEffect, useRef } from 'react';

export default {
  cId: 'button',
  cType: cType.Base,
  name: '按钮',
  icon: undefined,
  template: Template,
  attributesTemplate: Attributes,
} as Component;

function Template(props: TemplateProps<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => ref.current);
  }, []);

  return (
    <Button ref={ref} {...props?.events}>
      按钮
    </Button>
  );
}

function Attributes() {
  return <div>属性设置</div>;
}
