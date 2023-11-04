import { Tree, TreeDataNode } from 'antd';
import { useEffect, useState } from 'react';
import { currentInstances, currentJson, globalEvent, JsonNode } from '../../../data';
import { EVENT } from '../../../enum';

/**
 * 组件树
 *
 * At 2023/11/03
 * By TangJiaHui
 */
export default function () {
  const [expandKeys, setExpendKeys] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  function getTreeData(json: JsonNode[] = []): TreeDataNode[] {
    return json.map((x) => {
      return {
        key: x?.id,
        title: (
          <div
            onClick={() => {
              currentInstances.getIns(x?.id)?.handleSelect?.();
            }}
            onMouseEnter={() => {
              currentInstances.getIns(x?.id)?.handleHover?.();
            }}
            onMouseLeave={() => {
              currentInstances.getIns(x?.id)?.handleUnHover?.();
            }}
          >
            {x?.name}
          </div>
        ),
        children: getTreeData(x?.children),
      };
    });
  }

  function updateTreeData(json: JsonNode[]) {
    const treeData = getTreeData(json);
    setTreeData(treeData);
    // 展开第一级组件
    setExpendKeys(treeData.map((x) => x.key));
  }

  useEffect(() => {
    setTimeout(() => {
      updateTreeData(currentJson.getJson());
    });

    globalEvent.on(EVENT.JSON_EDITOR, updateTreeData);
    return () => globalEvent.remove(EVENT.JSON_EDITOR, updateTreeData);
  }, []);

  return <Tree expandedKeys={expandKeys} onExpand={setExpendKeys} treeData={treeData} />;
}
