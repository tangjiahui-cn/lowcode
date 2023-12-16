import { Component, cType } from '@/core';
import Attributes from './Attributes';
import Template from './Template';

export default {
  cId: 'table',
  cType: cType.Table,
  cName: '列表',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  exposeEvents: [{ eventName: '查询列表', eventType: 'query' }],
} as Component;
