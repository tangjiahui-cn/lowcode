import JSONEditor from '../../../components-sys/JSONEditor';
import { useEffect, useState } from 'react';
import { currentJson, currentPanels, globalEvent, JsonNode } from '../../../data';
import { EVENT } from '../../../enum';

// TODO: 后续考虑使用中介者模式拆分数据交换和响应式更新，确保数据流单向流动
export default function () {
  const [json, setJson] = useState<JsonNode[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setJson(currentJson.getJson());
    });

    function updateJSON() {
      setJson([...currentJson.getJson()]);
    }

    globalEvent.on(EVENT.JSON_EDITOR, updateJSON);
    return () => globalEvent.remove(EVENT.JSON_EDITOR, updateJSON);
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <JSONEditor
        value={json}
        onChange={(json) => {
          currentPanels.editor?.refreshJson([...json]);
        }}
      />
    </div>
  );
}
