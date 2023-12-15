/**
 * Editor 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description: 用来编辑可视化页面
 */
import { engine, EVENT, JsonNode, Page, useListenPage } from '@/core';
import { useEffect, useRef, useState } from 'react';
import RenderJsonNode from './components/RenderJsonNode';
import LayoutWrapper from './components/LayoutWrapper';

export default function () {
  const domRef = useRef<HTMLDivElement>(null);
  const [jsonNodes, setJsonNodes] = useState<JsonNode[]>([]);
  const [layoutVisible, setLayoutVisible] = useState(false);

  useListenPage(function (page: JsonNode[]) {
    engine.wrapBox.clear();
    engine.jsonNode.init(page);
    setLayoutVisible(!!(engine.project.getCurrent() as Page)?.bindLayoutVisible);
    setJsonNodes(page);
  });

  useEffect(() => {
    engine.panel.setEditorDom(domRef.current);

    // 编辑器mount发布通知
    engine.event.notify(EVENT.editorMount);

    // 监听布局显示/隐藏
    engine.event.on(EVENT.currentLayoutVisible, setLayoutVisible);
    return () => {
      engine.event.remove(EVENT.currentLayoutVisible, setLayoutVisible);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 24,
      }}
    >
      <LayoutWrapper showLayout={layoutVisible}>
        {/* 渲染容器 */}
        <div
          ref={domRef}
          style={{
            position: 'relative',
            minWidth: 200,
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* 渲染json */}
          {jsonNodes.map((jsonNode: JsonNode) => {
            return <RenderJsonNode key={jsonNode.id} jsonNode={jsonNode} />;
          })}
        </div>
      </LayoutWrapper>
    </div>
  );
}
