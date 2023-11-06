import type { RegisterComponent } from '../../data';
import Template from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum/component';
import { triggerEvents, exposeEvents } from './events';

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
  exposeEvents,
  triggerEvents,
} as RegisterComponent;
