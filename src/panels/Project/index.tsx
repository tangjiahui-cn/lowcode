import { FileFilled, FolderOpenFilled, FolderOutlined } from '@ant-design/icons';
import { message, Tree, TreeDataNode } from 'antd';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { engine, Layout, Page } from '@/core';

type TreeNode = TreeDataNode & {
  _isPage?: boolean; // 是否是页面
  _isLayout?: boolean; // 是否是布局
  _data?: Page | Layout; // 携带数据
};

function SwitchIcon(props: { expanded?: boolean; color?: string }) {
  return props?.expanded ? (
    <FolderOpenFilled style={{ fontSize: '1.125em', color: props?.color }} />
  ) : (
    <FolderOutlined style={{ fontSize: '1.125em', color: props?.color }} />
  );
}

/**
 * Project 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description： 负责管理Project的所有页面与布局
 */
export default function () {
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  function getTreeData(pages: Page[], layouts: Layout[]): TreeNode[] {
    return [
      {
        key: 'layout',
        title: '布局',
        selectable: false,
        switcherIcon: ({ expanded }) => <SwitchIcon expanded={expanded} color={'#f39a88'} />,
        children: layouts.map((layout: Layout) => {
          return {
            _data: layout,
            _isLayout: true,
            key: layout.layoutId,
            title: layout.layoutName,
            switcherIcon: <FileFilled style={{ color: '#f39a88' }} />,
          };
        }),
      },
      {
        key: 'page',
        title: '页面',
        selectable: false,
        switcherIcon: ({ expanded }) => <SwitchIcon expanded={expanded} color={'#4aafee'} />,
        children: pages.map((page: Page) => {
          return {
            _data: page,
            _isPage: true,
            key: page.pageId,
            title: page.pageName,
            switcherIcon: <FileFilled style={{ color: '#4aafee' }} />,
          };
        }),
      },
    ];
  }

  function handleSelectNode(treeNode: TreeNode) {
    if (treeNode?._isPage) {
      handleSelectPage(treeNode?._data as Page);
    }
    if (treeNode?._isLayout) {
      handleSelectLayout(treeNode?._data as Layout);
    }
  }

  // 选中一个页面
  function handleSelectPage(page: Page) {
    notifyEditorSetPage(page.jsonId);
  }

  // 选中一个布局
  function handleSelectLayout(layout: Layout) {
    notifyEditorSetPage(layout.jsonId);
  }

  // 发布编辑器页面变更通知
  function notifyEditorSetPage(jsonId: string) {
    engine.project.getJsonFile(jsonId).then((jsonFile) => {
      if (!jsonFile?.jsonData) {
        message.error('页面jsonData丢失');
        return;
      }
      // 通知编辑器区域更新
      engine.api.project.setPage(jsonFile?.jsonData);
    });
  }

  useEffectOnce(() => {
    const pages: Page[] = engine.project.getAllPages();
    const layouts: Layout[] = engine.project.getAllLayouts();
    setExpandedKeys([pages?.length && 'page', layouts?.length && 'layout'].filter(Boolean));
    setTreeData(getTreeData(pages, layouts));

    if (pages?.length) {
      setSelectedKeys([pages?.[0]?.pageId]);
      handleSelectPage(pages?.[0]);
    }
  });

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '0px 16px 8px' }}>
      <div style={{ padding: '8px 0', fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>项目管理</div>
      <Tree
        blockNode
        showIcon
        treeData={treeData}
        style={{ fontSize: 14 }}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={setExpandedKeys}
        onSelect={(selectedKeys, info) => {
          if (!selectedKeys?.length) {
            return;
          }
          setSelectedKeys(selectedKeys);
          handleSelectNode(info?.node);
        }}
      />
    </div>
  );
}
