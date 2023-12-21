import { Component, cType } from '@/core';
import Template, { AttributesType } from './Template';
import Attributes from './Attributes';

export default {
  cId: 'title',
  cName: '标题',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    type: 'h1',
    value: '一个标题',
  },
  cType: cType.Base,
  exposeEvents: [{ eventType: 'setValue', eventName: '修改值' }],
} as Component<AttributesType>;
