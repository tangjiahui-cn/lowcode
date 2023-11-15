import { useEffect, useRef, useState } from 'react';
import { currentJson, JsonNode, currentPanels } from '../../data';
import RenderJsonNode from './RenderJsonNode';
import { checkJson } from '../../utils/createInitJson';

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
    setJson(currentJson.setJson(json));
  }

  function initCurrentPanels() {
    currentPanels.editor.setJson = setJson;
    currentPanels.editor.domRef = dom;
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
        background: 'white',
        position: 'relative',
      }}
    >
      {json.map((jsonNode: JsonNode) => {
        return <RenderJsonNode key={jsonNode.id} jsonNode={jsonNode} />;
      })}
    </div>
  );
}
