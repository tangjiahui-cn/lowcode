import { useEffect, useState } from 'react';
import { JsonNode, runtime } from '@/engine';
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
    const parentList = runtime?.instances?.getAllParentJsonNode?.(props?.jsonNode?.id) || [];
    setList(parentList);
  }, [props?.jsonNode]);

  if (!list.length) {
    return null;
  }

  return (
    <div className={container}>
      {list.map((parentNode) => {
        return (
          <div
            key={parentNode?.id}
            className={item}
            onMouseEnter={() => {
              runtime?.instances?.get(parentNode?.id)?.handleHover();
            }}
            onMouseLeave={() => {
              runtime?.instances?.get(parentNode?.id)?.handleUnHover();
            }}
            onClick={() => {
              runtime?.instances?.get(parentNode?.id)?.handleUnHover();
              props?.onSelect?.(parentNode);
            }}
          >
            {parentNode?.cName}
          </div>
        );
      })}
    </div>
  );
}
