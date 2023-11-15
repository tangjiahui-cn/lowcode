/**
 * 面包屑面板
 *
 * At 2023/11/14
 * By TangJiaHui
 */
import { Breadcrumb } from 'antd';
import { currentInstances, JsonNode } from '../../../data';
import { useEffect, useState } from 'react';
import { engine } from '../../../core';

interface IProps {
  jsonNode?: JsonNode;
}
export default function (props: IProps) {
  const [list, setList] = useState<JsonNode[]>([]);

  function handleSelect(node: JsonNode) {
    // 不能再次选中自身
    if (node?.id === props?.jsonNode?.id) return;
    currentInstances.getIns(node?.id)?.handleSelect();
  }

  useEffect(() => {
    if (!props?.jsonNode) {
      setList([]);
      return;
    }
    setList([...engine.jsonNode.getParentsFromOuter(props?.jsonNode?.id), props?.jsonNode]);
  }, [props?.jsonNode]);

  return (
    <Breadcrumb
      separator='>'
      style={{ fontSize: 14, padding: '2px 0', borderBottom: '1px solid #e8e8e8' }}
    >
      {list.map((node: JsonNode) => {
        return (
          <Breadcrumb.Item key={node?.id} onClick={() => handleSelect(node)}>
            <span style={{ cursor: 'pointer' }}>{node?.name}</span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
