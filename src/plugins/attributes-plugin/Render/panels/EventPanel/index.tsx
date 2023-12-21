import { Empty, Space } from 'antd';
import { useEffect, useState } from 'react';
import AddEventDialog from './components/AddEventDialog';
import BindEventButton from './components/BindEventButton';
import { getUuid, JsonNode, Component, RegisterEvent } from '@/core';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { eventContainerStyle, textStyle, itemStyle } from './style';
import Dynamic from '@/common/Dynamic';

/**
 * 事件处理面板
 *
 * At 2023/11/30
 * By TangJiaHui
 */
interface IProps {
  jsonNode?: JsonNode;
  component?: Component;
  onChangeEvents?: (events: RegisterEvent[]) => void;
}
export default function (props: IProps) {
  const [events, setEvents] = useState<RegisterEvent[]>([]);

  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState<RegisterEvent>();

  function emitChange(events: RegisterEvent[], isSet: boolean = true) {
    if (isSet) setEvents(events);
    props?.onChangeEvents?.(events);
  }

  function handleAdd(eventType: string) {
    if (!props?.jsonNode) {
      throw new Error('jsonNode is null.');
    }
    const newRegisterEvent: RegisterEvent = {
      id: props?.jsonNode?.id,
      eId: getUuid(),
      eventType,
    };
    setIsEdit(false);
    setCurrentItem(newRegisterEvent);
    setVisible(true);
  }

  function handleDelete(event: RegisterEvent) {
    emitChange(events.filter((x) => x.eId !== event.eId));
  }

  function handleEdit(event: RegisterEvent) {
    setIsEdit(true);
    setCurrentItem(event);
    setVisible(true);
  }

  useEffect(() => {
    setEvents(props?.jsonNode?.events || []);
  }, [props?.jsonNode]);

  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      <Space style={{ width: '100%' }} direction={'vertical'}>
        <BindEventButton
          eventTypes={events.map((x) => x?.eventType)}
          componentId={props?.component?.cId}
          onSelect={handleAdd}
        >
          + 组件绑定事件
        </BindEventButton>
        <div className={eventContainerStyle}>
          <div
            style={{
              padding: '4px 12px',
              borderBottom: '1px solid #e8e8e8',
              background: '#efefef',
            }}
          >
            绑定事件：
          </div>
          {events?.length ? (
            events?.map((event) => {
              return (
                <div
                  key={event?.eId}
                  className={itemStyle}
                  onClick={(e) => {
                    handleEdit(event);
                    e.stopPropagation();
                  }}
                >
                  <div className={textStyle}>{event.eventType}</div>
                  <Space>
                    <a
                      onClick={(e) => {
                        handleDelete(event);
                        e.stopPropagation();
                      }}
                    >
                      <Dynamic type={'scale'}>
                        <DeleteOutlined />
                      </Dynamic>
                    </a>
                    <a
                      onClick={(e) => {
                        handleEdit(event);
                        e.stopPropagation();
                      }}
                    >
                      <Dynamic type={'rotate'}>
                        <SettingOutlined />
                      </Dynamic>
                    </a>
                  </Space>
                </div>
              );
            })
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </Space>

      <AddEventDialog
        event={currentItem}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={(targetEvent: RegisterEvent) => {
          setVisible(false);
          if (isEdit) {
            Object.assign(events.find((x) => x.eId === currentItem?.eId) || {}, targetEvent);
            emitChange(events, false);
          } else {
            emitChange([...events, targetEvent]);
          }
        }}
      />
    </Space>
  );
}
