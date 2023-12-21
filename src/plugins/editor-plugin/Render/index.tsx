/**
 * Editor 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description: 用来编辑可视化页面
 */
import { JsonNode, createPage, startFlow, useFlow, runtime } from '@/engine';
import { useEffect, useRef, useState } from 'react';
import RenderJsonNode from './components/RenderJsonNode';

export default function () {
  const domRef = useRef<HTMLDivElement>(null);
  const [jsonNodes, setJsonNodes] = useState<JsonNode[]>([]);

  useFlow('jsonNode-set', (payload) => {
    const page: JsonNode[] = payload?.data || [];
    setJsonNodes(page);
    runtime.jsonNodes.setPage(page);
  });

  useEffect(() => {
    startFlow('jsonNode-set', {
      data: createPage(),
    });
  }, []);

  // useHook('set-jsonNodes', (page) => {
  //   engine.wrapBox.clear();
  //   engine.jsonNode.init(page);
  //   setLayoutVisible(!!(engine.project.getCurrent() as Page)?.bindLayoutVisible);
  //   setJsonNodes(page);
  //   setCurrent(engine.project.getCurrent());
  //   // 发布全局通知：选中JsonNode
  //   notify('select-json-node', undefined);
  // });

  // useHook('change-layout-visible', setLayoutVisible);

  // useEffect(() => {
  //   engine.panel.setEditorDom(domRef.current);
  //   notify('editor-mount');
  // }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 24,
      }}
    >
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
    </div>
  );
}
