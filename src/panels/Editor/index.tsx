/**
 * Editor 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description: 用来编辑可视化页面
 */
import { engine, JsonNode, useListenPage } from '@/core';
import { useEffect, useRef, useState } from 'react';
import RenderJsonNode from './RenderJsonNode';

export default function () {
  const domRef = useRef<HTMLDivElement>(null);
  const [jsonNodes, setJsonNodes] = useState<JsonNode[]>([]);

  useListenPage(function (page: JsonNode[]) {
    engine.jsonNode.init(page);
    setJsonNodes(page);
  });

  useEffect(() => {
    engine.panel.setEditorDom(domRef.current);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: 24,
      }}
    >
      {/* 渲染容器 */}
      <div
        ref={domRef}
        style={{
          position: 'relative',
          minWidth: 200,
          height: '100%',
          width: '100%',
          background: 'white',
          overflow: 'hidden',
        }}
      >
        {/* 渲染json */}
        {jsonNodes.map((jsonNode: JsonNode) => {
          return <RenderJsonNode key={jsonNode.id} jsonNode={jsonNode} />;
        })}
      </div>
    </div>
  );
}
