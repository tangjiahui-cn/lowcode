import { Component, cType } from '@/core';
import Template from './Template';
import Attributes from './Attributes';

export default {
  cId: 'container',
  cType: cType.Container,
  cName: '容器',
  icon: undefined,
  isChildren: true,
  template: Template,
  attributeTemplate: Attributes,
} as Component;
