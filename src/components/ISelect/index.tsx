import type { RegisterComponent } from '../../core';
import Template, { Attributes as AttributesType } from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum';

export default {
  cId: 'i-select',
  name: '下拉框',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  styleData: {
    layout: {
      width: 200,
    },
  },
  defaultAttributes: {
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
  },
  cType: CType.BASE,
  exposeEvents: [{ eventName: '修改选中值', eventType: 'setValue' }],
  triggerEvents: [{ eventName: '值变更事件', eventType: 'change' }],
} as RegisterComponent<AttributesType>;
