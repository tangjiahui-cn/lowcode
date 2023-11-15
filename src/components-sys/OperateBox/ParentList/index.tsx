import { JsonNode } from '../../../data';
import { useEffect, useState } from 'react';
import { engine } from '../../../core';
import { css } from 'class-css';

const container = css({
  position: 'absolute',
  top: -10,
  left: 0,
  width: 100,
  maxHeight: 200,
});

const item = css({
  padding: '2px 8px',
  cursor: 'pointer',
  background: 'rgba(0,0,0,0.65)',
  '& + &': {
    marginTop: 2,
  },
  '&:hover': {
    background: 'rgba(0,0,0,0.50)',
  },
});

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
          <div key={node?.id} className={item} onClick={() => props?.onSelect?.(node)}>
            {node?.name}
          </div>
        );
      })}
    </div>
  );
}
