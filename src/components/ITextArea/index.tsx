import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";
import {CType} from "../../enum/component";

export default {
  cId: 'i-textarea',
  name: '文本输入框',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  cType: CType.BASE
} as RegisterComponent;



