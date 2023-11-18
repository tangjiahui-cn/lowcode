import { Tree, TreeDataNode } from 'antd';
import { useEffect, useState } from 'react';
import { EVENT } from '../../../enum';
import { engine, JsonNode } from '../../../core';

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
              engine.instance.getInstance(x?.id)?.handleSelect?.();
            }}
            onMouseEnter={() => {
              engine.instance.getInstance(x?.id)?.handleHover?.();
            }}
            onMouseLeave={() => {
              engine.instance.getInstance(x?.id)?.handleUnHover?.();
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
      updateTreeData(engine.json.getJson());
    });

    engine.globalEvent.on(EVENT.JSON_EDITOR, updateTreeData);
    return () => engine.globalEvent.remove(EVENT.JSON_EDITOR, updateTreeData);
  }, []);

  return <Tree expandedKeys={expandKeys} onExpand={setExpendKeys} treeData={treeData} />;
}
