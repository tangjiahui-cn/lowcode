import { Tabs } from 'antd';
import AttributesPanel from './AttributesPanel';
import StylePanel from './StylePanel';
import EventPanel from './EventPanel';
import { useState } from 'react';

const options = [
  { label: '属性', value: '1' },
  { label: '样式', value: '2' },
  { label: '事件', value: '3' },
];

export default function () {
  const [activeKey, setActiveKey] = useState<string>('1');

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs style={{ padding: '0 16px' }} activeKey={activeKey} onChange={setActiveKey}>
        {options.map((option) => {
          return <Tabs.TabPane key={option.value} tab={option.label} />;
        })}
      </Tabs>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeKey === '1' && <AttributesPanel />}
        {activeKey === '2' && <StylePanel />}
        {activeKey === '3' && <EventPanel />}
      </div>
    </div>
  );
}
