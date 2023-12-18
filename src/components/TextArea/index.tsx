import Template from './Template';
import Attributes from './Attributes';
import { cType, Component } from '@/core';

export default {
  cId: 'textArea',
  cName: '文本输入框',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  cType: cType.Base,
  exposeEvents: [{ eventType: 'setValue', eventName: '修改value值' }],
  triggerEvents: [{ eventType: 'change', eventName: '值变更事件' }],
} as Component;
