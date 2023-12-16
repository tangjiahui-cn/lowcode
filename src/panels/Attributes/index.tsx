import { Tabs } from 'antd';
import AttributesPanel from './panels/AttributesPanel';
import StylePanel from './panels/StylePanel';
import EventPanel from './panels/EventPanel';
import { useState } from 'react';
import { Component, engine, Instance, JsonNode, useListenSelectJsonNode } from '@/core';
import ParentBreadcrumb from './components/ParentBreadcrumb';
import { emptyClass } from './style';

const options = [
  { label: '属性', key: '1' },
  { label: '样式', key: '2' },
  { label: '事件', key: '3' },
];

export default function () {
  const [jsonNode, setJsonNode] = useState<JsonNode>();
  const [component, setComponent] = useState<Component>();
  const [instance, setInstance] = useState<Instance>();
  const [activeKey, setActiveKey] = useState<string>('1');

  useListenSelectJsonNode((jsonNode: JsonNode) => {
    setJsonNode(jsonNode);
    setComponent(engine.component.get(jsonNode?.cId));
    setInstance(engine.instance.get(jsonNode?.id));
    setActiveKey('1');
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
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={options} />
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
        {activeKey === '3' && (
          <EventPanel
            jsonNode={jsonNode}
            onChangeEvents={(events) => {
              jsonNode.events = events;
              instance?.scopeUpdateJsonNode?.(jsonNode);
            }}
            component={component}
          />
        )}
      </div>
    </div>
  ) : (
    <div className={emptyClass}>请选择一个组件</div>
  );
}
