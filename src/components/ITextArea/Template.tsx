import { Input } from 'antd';
import { currentInstances, getEvent, globalEvent, TemplateProps } from '../../data';
import { useEffect, useRef, useState } from 'react';
import { globalEventSystem } from '../../data/globalEventSystem';
import { ExposeEvents, TriggerEvents } from './events';
import { EVENT } from '../../enum';

export interface Attributes {
  value: string;
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLTextAreaElement>) {
  const ref = useRef<any>(null);
  const [attributes, setAttributes] = useState<Attributes | undefined>(props?.attributes);

  function exposeEvents() {
    globalEventSystem.on(props?.id, 'setValue' as ExposeEvents, function (payload) {
      const newAttributes: Attributes = {
        ...props?.attributes,
        value: payload,
      };
      currentInstances?.getIns(props?.id)?.handleSetAttributes?.(newAttributes);
      globalEvent.notify(EVENT.SET_ATTRIBUTES, newAttributes);
    });
  }

  useEffect(() => {
    setAttributes(props?.attributes);
  }, [props?.attributes]);

  useEffect(() => {
    exposeEvents();
    props?.getDomFn?.(() => ref.current?.resizableTextArea?.textArea);
  }, []);

  return (
    <Input.TextArea
      ref={ref}
      style={props?.style}
      placeholder={'请输入'}
      value={attributes?.value}
      onChange={(e) =>
        setAttributes({
          ...attributes,
          value: e.target.value,
        })
      }
      {...getEvent(props?.events, {
        onChange(e: any) {
          globalEventSystem.notify(props?.id, 'change' as TriggerEvents, e.target.value);
        },
      })}
    >
      {attributes?.value}
    </Input.TextArea>
  );
}
