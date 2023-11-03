import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";
import {CType} from "../../enum/component";

export default {
  cId: 'i-container',
  name: '容器',
  isContainer: true,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    titleLevel: 'h1'
  },
  defaultStyle: {
    position: 'relative',
    padding: 16
  },
  cType: CType.LAYOUT
} as RegisterComponent;



