import { Component, cType, TemplateProps } from '@/core';
import { Table } from 'antd';
import { useEffect, useRef } from 'react';

export default {
  cId: 'table',
  cType: cType.Table,
  cName: '列表',
  icon: undefined,
  template: Template,
  attributesTemplate: Attributes,
} as Component;

function Template(props: TemplateProps<any>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => ref.current);
  }, []);

  return (
    <div ref={ref} {...(props?.events as any)}>
      <Table columns={[{ title: '姓名' }, { title: '性别' }, { title: '年龄' }]} />
    </div>
  );
}

function Attributes() {
  return <div>属性设置</div>;
}
