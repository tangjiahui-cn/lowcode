import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";

export default {
  cId: 'i-textarea',
  name: '文本输入框',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    value: '请输入'
  },
  cType: 'base',
} as RegisterComponent;



