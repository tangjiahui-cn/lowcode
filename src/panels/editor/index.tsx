import { useEffect, useRef, useState } from 'react';
import RenderJsonNode from './RenderJsonNode';
import { checkJson, engine, JsonNode } from '../../core';

/**
 * 编辑区域面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function Editor() {
  const dom = useRef<HTMLDivElement>(null);
  const [json, setJson] = useState<JsonNode[]>([]);
  const jsonRef = useRef(json);
  jsonRef.current = json;

  function initJson() {
    const localJsonStr: string = localStorage.getItem('json') || '[]';
    const json: JsonNode[] = checkJson(JSON.parse(localJsonStr));
    setJson(engine.json.setJson(json));
  }

  function initCurrentPanels() {
    engine.panel.editor.setJson = setJson;
    engine.panel.editor.domRef = dom;
  }

  useEffect(() => {
    initJson();
    initCurrentPanels();
  }, []);

  return (
    <div
      ref={dom}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {json.map((jsonNode: JsonNode) => {
        return <RenderJsonNode key={jsonNode.id} jsonNode={jsonNode} />;
      })}
    </div>
  );
}
