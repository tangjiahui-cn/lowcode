import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";

export default {
  cId: 'i-button',
  name: '按钮',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    value: '按钮'
  },
  cType: 'base',
} as RegisterComponent;



