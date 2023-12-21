import type { Component } from '@/core';
import Template, { Attributes as AttributesType } from './Template';
import Attributes from './Attributes';
import { cType } from '@/core';

export default {
  cId: 'select',
  cName: '下拉框',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  styleData: {
    layout: {
      width: 200,
    },
  },
  defaultAttributes: {
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
  },
  cType: cType.Base,
  exposeEvents: [{ eventName: '修改选中值', eventType: 'setValue' }],
  triggerEvents: [{ eventName: '值变更事件', eventType: 'change' }],
} as Component<AttributesType>;
