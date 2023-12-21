import { Button, Dropdown, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { runtime, RegisterEventStepType } from '@/engine';

interface IProps {
  eventTypes: string[];
  componentId?: string;
  children?: React.ReactNode;
  onSelect?: (key: RegisterEventStepType) => void;
}
export default function BindEventButton(props: IProps) {
  const [items, setItems] = useState<MenuProps['items']>([]);

  useEffect(() => {
    setItems(
      runtime.components.get(props?.componentId)?.triggerEvents?.map((x) => {
        return {
          label: x.eventType,
          key: x.eventType,
          disabled: props?.eventTypes?.includes(x?.eventType),
        };
      }) || [],
    );
  }, [props?.componentId, props?.eventTypes]);

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
        onClick: ({ key }) => {
          props?.onSelect?.(key as any);
        },
      }}
    >
      <Button type={'dashed'} block>
        {props?.children}
      </Button>
    </Dropdown>
  );
}
