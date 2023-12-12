import { Tabs } from 'antd';
import AttributesPanel from './panels/AttributesPanel';
import StylePanel from './panels/StylePanel';
import EventPanel from './panels/EventPanel';
import { useState } from 'react';
import { Component, engine, Instance, JsonNode, useListenSelectJsonNode } from '@/core';
import ParentBreadcrumb from './components/ParentBreadcrumb';

const options = [
  { label: '属性', value: '1' },
  { label: '样式', value: '2' },
  { label: '事件', value: '3' },
];

export default function () {
  const [jsonNode, setJsonNode] = useState<JsonNode>();
  const [component, setComponent] = useState<Component>();
  const [instance, setInstance] = useState<Instance>();
  const [activeKey, setActiveKey] = useState<string>('1');

  useListenSelectJsonNode((jsonNode: JsonNode) => {
    setJsonNode(jsonNode);
    setComponent(engine.component.get(jsonNode.cId));
    setInstance(engine.instance.get(jsonNode.id));
  });

  return jsonNode ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0 16px 16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ParentBreadcrumb jsonNode={jsonNode} />
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {options.map((option) => {
          return <Tabs.TabPane key={option.value} tab={option.label} />;
        })}
      </Tabs>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeKey === '1' && (
          <AttributesPanel
            jsonNode={jsonNode}
            component={component}
            onChange={(attributes) => {
              jsonNode.attributes = attributes;
              instance?.scopeUpdateJsonNode?.(jsonNode);
            }}
          />
        )}
        {activeKey === '2' && (
          <StylePanel
            jsonNode={jsonNode}
            onChange={(styleData) => {
              jsonNode.styleData = styleData;
              instance?.scopeUpdateJsonNode?.(jsonNode);
            }}
          />
        )}
        {activeKey === '3' && <EventPanel />}
      </div>
    </div>
  ) : (
    <div>请选择一个组件</div>
  );
}
