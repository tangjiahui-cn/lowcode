import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";
import {CType} from "../../enum/component";

export default {
  cId: 'i-text',
  name: '文字',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    value: '一段文字'
  },
  cType: CType.BASE
} as RegisterComponent;



