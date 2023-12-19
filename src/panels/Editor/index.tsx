/**
 * Editor 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description: 用来编辑可视化页面
 */
import { engine, JsonNode, Layout, notify, Page, useHook } from '@/core';
import { useEffect, useRef, useState } from 'react';
import RenderJsonNode from './components/RenderJsonNode';
import LayoutWrapper from './components/LayoutWrapper';

export default function () {
  const domRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<Page | Layout>();
  const [jsonNodes, setJsonNodes] = useState<JsonNode[]>([]);
  const [layoutVisible, setLayoutVisible] = useState(false);

  useHook('set-jsonNodes', (page) => {
    engine.wrapBox.clear();
    engine.jsonNode.init(page);
    setLayoutVisible(!!(engine.project.getCurrent() as Page)?.bindLayoutVisible);
    setJsonNodes(page);
    setCurrent(engine.project.getCurrent());
    // 发布全局通知：选中JsonNode
    notify('select-json-node', undefined);
  });

  useHook('change-layout-visible', setLayoutVisible);

  useEffect(() => {
    engine.panel.setEditorDom(domRef.current);
    notify('editor-mount');
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
      <LayoutWrapper showLayout={layoutVisible} current={current}>
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
