import { ERROR } from '../../enum';
import { engine, RegisterComponent } from '..';

export function getComponentByCId(cId: string): RegisterComponent {
  const component = engine.component?.getComponent(cId);
  if (!component?.template) {
    throw new Error(ERROR.NOT_FOUND_COMPONENT);
  }
  return component;
}
