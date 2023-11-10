import type { RegisterComponent } from '../../data';
import Template from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum/component';

export default {
  cId: 'i-textarea',
  name: '文本输入框',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  cType: CType.BASE,
  exposeEvents: [{ eventType: 'setValue', eventName: '修改value值' }],
  triggerEvents: [{ eventType: 'change', eventName: '值变更事件' }],
} as RegisterComponent;
