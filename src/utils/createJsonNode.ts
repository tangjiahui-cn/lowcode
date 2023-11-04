import { JsonNode, RegisterComponent } from '../data';
import { v4 as uuid } from 'uuid';

export function createJsonNode(component: RegisterComponent): JsonNode {
  return {
    id: uuid(),
    cId: component.cId,
    cType: component.cType,
    name: component?.name,
    attributes: component?.defaultAttributes,
    isContainer: component?.isContainer,
    isPage: component?.isPage,
  };
}
