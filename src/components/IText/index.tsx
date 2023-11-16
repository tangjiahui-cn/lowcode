import type { RegisterComponent } from '../../core';
import Template from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum';

export default {
  cId: 'i-text',
  name: '文字',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    value: '一段文字',
  },
  cType: CType.BASE,
  exposeEvents: [{ eventType: 'setValue', eventName: '修改值' }],
} as RegisterComponent;
