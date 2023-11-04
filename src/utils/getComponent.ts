import { currentComponents, RegisterComponent } from '../data';
import { ERROR } from '../enum';

export function getComponentByCId(cId: string): RegisterComponent {
  const component = currentComponents?.getComponent(cId);
  if (!component?.template) {
    throw new Error(ERROR.NOT_FOUND_COMPONENT);
  }
  return component;
}
