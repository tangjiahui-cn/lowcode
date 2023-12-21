import { Component, cType } from '@/core';
import Template, { AttributesType } from './Template';
import Attributes from './Attributes';

export default {
  cId: 'menu',
  cType: cType.Base,
  cName: '菜单',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    options: [{ key: '1', label: '首页', route: '/' }],
  },
} as Component<AttributesType>;
