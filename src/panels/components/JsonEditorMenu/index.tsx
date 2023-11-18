import JSONEditor from '../../../components-sys/JSONEditor';
import { useEffect, useState } from 'react';
import { EVENT } from '../../../enum';
import { engine, JsonNode } from '../../../core';

// TODO: 后续考虑使用中介者模式拆分数据交换和响应式更新，确保数据流单向流动
export default function () {
  const [json, setJson] = useState<JsonNode[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setJson(engine.json.getJson());
    });

    function updateJSON() {
      setJson([...engine.json.getJson()]);
    }

    engine.globalEvent.on(EVENT.JSON_EDITOR, updateJSON);
    return () => engine.globalEvent.remove(EVENT.JSON_EDITOR, updateJSON);
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <JSONEditor
        value={json}
        onChange={(json) => {
          engine.panel.editor?.refreshJson([...json]);
        }}
      />
    </div>
  );
}
