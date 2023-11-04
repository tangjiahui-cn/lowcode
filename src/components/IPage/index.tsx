import type { RegisterComponent } from '../../data';
import Template from './Template';
import Attributes from './Attributes';
import { CType } from '../../enum/component';

export default {
  cId: 'i-page',
  name: '页面',
  icon: undefined,
  isPage: true,
  isContainer: true,
  template: Template,
  attributeTemplate: Attributes,
  defaultStyle: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    padding: 16,
  },
  cType: CType.SYS,
} as RegisterComponent;
