import { Tree, TreeDataNode } from 'antd';
import { useEffect, useState } from 'react';
import { engine, JsonNode } from '@/core';

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
              engine.instance.get(x?.id)?.handleSelect?.();
            }}
            onMouseEnter={() => {
              engine.instance.get(x?.id)?.handleHover?.();
            }}
            onMouseLeave={() => {
              engine.instance.get(x?.id)?.handleUnHover?.();
            }}
          >
            {x?.cName}
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
    updateTreeData(engine.jsonNode.getPage());
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <div
        style={{
          padding: '8px 16px',
          fontSize: 14,
          color: 'rgba(0,0,0,0.5)',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        组件树
      </div>
      <Tree expandedKeys={expandKeys} onExpand={setExpendKeys} treeData={treeData} />
    </div>
  );
}
