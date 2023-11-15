import { currentInstances, JsonNode } from '../../../data';
import { useEffect, useState } from 'react';
import { engine } from '../../../core';
import { container, item } from './style';

/**
 * 父组件选择列表
 */
interface IProps {
  jsonNode?: JsonNode;
  onSelect?: (jsonNode: JsonNode) => void;
}

export default function (props: IProps) {
  const [list, setList] = useState<JsonNode[]>([]);

  useEffect(() => {
    setList(engine.jsonNode.getParents(props?.jsonNode?.id));
  }, [props?.jsonNode]);

  if (!list.length) {
    return null;
  }

  return (
    <div className={container}>
      {list.map((node) => {
        return (
          <div
            key={node?.id}
            className={item}
            onMouseEnter={() => {
              currentInstances.getInstance(node?.id)?.handleHover();
            }}
            onMouseLeave={() => {
              currentInstances.getInstance(node?.id)?.handleUnHover();
            }}
            onClick={() => {
              currentInstances.getInstance(node?.id)?.handleUnHover();
              props?.onSelect?.(node);
            }}
          >
            {node?.name}
          </div>
        );
      })}
    </div>
  );
}
