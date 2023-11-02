import type {RegisterComponent} from "../../data";
import Template from "./Template";
import Attributes from "./Attributes";

export default {
  cId: 'i-page',
  name: '页面',
  icon: undefined,
  isContainer: true,
  template: Template,
  attributeTemplate: Attributes,
  defaultStyle: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  },
  cType: 'sys',
} as RegisterComponent;



