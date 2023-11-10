import type { RegisterComponent } from '../../data';
import Template from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum/component';

export default {
  cId: 'i-button',
  name: '按钮',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    value: '按钮',
    type: 'default',
  },
  cType: CType.BASE,
  exposeEvents: [{ eventType: 'setValue', eventName: '修改value值' }],
  triggerEvents: [{ eventType: 'click', eventName: '点击事件' }],
} as RegisterComponent;
