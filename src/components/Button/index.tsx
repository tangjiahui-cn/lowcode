import { Component, cType } from '@/core';
import Template, { AttributesType } from './Template';
import Attributes from './Attributes';

export default {
  cId: 'button',
  cType: cType.Base,
  cName: '按钮',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,

  defaultAttributes: {
    value: '按 钮',
  },
  exposeEvents: [{ eventType: 'setValue', eventName: '修改value值' }],
  triggerEvents: [{ eventType: 'click', eventName: '点击事件' }],
} as Component<AttributesType>;
