import type { RegisterComponent } from '../../core';
import Template, { Attributes as AttributesType } from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum';

export default {
  cId: 'i-container',
  name: '容器',
  isContainer: true,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    titleLevel: 'h1',
  },
  cType: CType.LAYOUT,
} as RegisterComponent<AttributesType>;
