import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import { currentInstances, getEvent, globalEvent, TemplateProps } from '../../data';
import { useEffect, useRef } from 'react';
import { globalEventSystem } from '../../data/globalEventSystem';
import { ExposeEvents, TriggerEvents } from './events';
import { EVENT } from '../../enum';

export interface Attributes {
  type?: ButtonType;
  value?: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLButtonElement>) {
  const domRef = useRef<HTMLButtonElement>(null);

  // 暴露事件
  function exposeEvents() {
    // 修改 value 值
    globalEventSystem.on(props?.id, 'setValue' as ExposeEvents, (payload: any) => {
      const newAttributes: Attributes = {
        ...props?.attributes,
        value: payload,
      };
      currentInstances?.getIns(props?.id)?.handleSetAttributes?.(newAttributes);
      globalEvent.notify(EVENT.SET_ATTRIBUTES, newAttributes);
    });
  }

  useEffect(() => {
    exposeEvents();
    props?.getDomFn?.(() => domRef.current);
  }, []);

  return (
    <Button
      ref={domRef}
      style={props?.style}
      type={props?.attributes?.type}
      {...getEvent(props?.events, {
        onClick(e) {
          // 触发事件
          globalEventSystem.notify(props?.id, 'click' as TriggerEvents, e);
        },
      })}
    >
      {props?.attributes?.value}
    </Button>
  );
}
