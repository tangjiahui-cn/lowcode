import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";

export default {
  cId: 'i-container',
  name: '容器',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultBase: {},
  defaultAttributes: {},
  cType: 'layout'
} as RegisterComponent;



