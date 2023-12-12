/**
 * Editor - api
 *
 * At 2023/12/12
 * By TangJiaHui
 */
import { engine, EVENT, JsonNode } from '..';

export const editor = {
  // 实例滚动
  instanceScroll() {
    engine.event.notify(EVENT.instanceScroll);
  },
  // 选中jsonNode
  selectJsonNode(jsonNode: JsonNode) {
    engine.event.notify(EVENT.selectJsonNode, jsonNode);
  },
};
