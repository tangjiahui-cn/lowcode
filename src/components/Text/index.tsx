import { Component, cType } from '@/core';
import Template, { AttributesType } from './Template';
import Attributes from './Attributes';

export default {
  cId: 'text',
  cName: '文字',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    value: '一段文字',
  },
  cType: cType.Base,
  exposeEvents: [{ eventType: 'setValue', eventName: '修改值' }],
} as Component<AttributesType>;
