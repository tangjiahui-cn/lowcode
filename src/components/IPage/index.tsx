import type { RegisterComponent } from '../../core';
import Template from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum';

export default {
  cId: 'i-page',
  name: '页面',
  icon: undefined,
  isPage: true,
  isContainer: true,
  template: Template,
  attributeTemplate: Attributes,
  styleData: {
    layout: {
      padding: 16,
    },
  },
  cType: CType.SYS,
} as RegisterComponent;
