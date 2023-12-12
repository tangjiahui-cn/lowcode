import { engine, EVENT, JsonNode } from '..';

export const project = {
  // 选中页面（设置JsonNode[]）
  setPage(page: JsonNode[]) {
    engine.event.notify(EVENT.setPage, page);
  },
};
