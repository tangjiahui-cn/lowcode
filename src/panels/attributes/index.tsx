import { useState } from 'react';
import {
  currentComponents,
  currentInstances,
  ExposeEvent,
  globalEvent,
  Instance,
  JsonNode,
  RegisterComponent,
  TriggerEvent,
} from '../../data';
import { EVENT } from '../../enum';
import { Tabs } from 'antd';
import { attributesEmptyStyle, attributesStyle } from './style';
import { useRegisterGlobalEvent } from '../../hooks/useRegisterGlobalEvent';
import EventPanel from './EventPanel';

const tabOptions = [
  { label: '属性', value: '1' },
  { label: '样式', value: '2' },
  { label: '事件', value: '3' },
];

/**
 * 属性面板
 *
 * At 2023/10/31
 * By TangJiaHui
 */
export default function Attributes() {
  const [activeKey, setActiveKey] = useState<string>('3');
  // 组件模板（模板）
  const [component, setComponent] = useState<RegisterComponent | undefined>();
  // 当前jsonNode（保存状态）
  const [jsonNode, setJsonNode] = useState<JsonNode | undefined>();
  // 当前实例 (执行动作)
  const [instance, setInstance] = useState<Instance | undefined>();

  function handleSelect(payload: JsonNode) {
    setJsonNode(payload);
    setComponent(currentComponents.getComponent(payload?.cId));
    setInstance(currentInstances.getIns(payload?.id));
  }

  function handleAttributes(attributes: any) {
    instance?.handleSetAttributes?.(attributes);
    globalEvent.notify(EVENT.SET_ATTRIBUTES, attributes);
  }

  function handleExposeEvents(exposeEvents: ExposeEvent[]) {
    instance?.handleSetExposeAttributes?.(exposeEvents);
  }

  function handleTriggerEvents(triggerEvents: TriggerEvent[]) {
    instance?.handleSetTriggerAttributes?.(triggerEvents);
  }

  useRegisterGlobalEvent(EVENT.SELECTED_COMPONENT, handleSelect);

  return component ? (
    <div className={attributesStyle}>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {tabOptions.map((option) => {
          return <Tabs.TabPane tab={option.label} key={option.value} />;
        })}
      </Tabs>
      {activeKey === '1' && component?.attributeTemplate && (
        <component.attributeTemplate
          attributes={jsonNode?.attributes}
          onChange={handleAttributes}
        />
      )}
      {activeKey === '3' && (
        <EventPanel
          jsonNode={jsonNode}
          component={component}
          onExposeEvents={handleExposeEvents}
          onTriggerEvents={handleTriggerEvents}
        />
      )}
    </div>
  ) : (
    <div className={attributesEmptyStyle}>请选择一个组件</div>
  );
}
