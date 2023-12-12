import { FileFilled, FolderOpenFilled } from '@ant-design/icons';
import { Space, Tree, TreeDataNode } from 'antd';

// interface Project {
//   // 布局
//   layouts: {
//     id: string;
//     name: string;
//   };
//   // 开发页面
//   pages: {
//     id: string;
//     name: string;
//     route: string;
//   }[];
// }

/**
 * Project 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description： 负责管理Project的所有页面与布局
 */
export default function () {
  const treeData: TreeDataNode[] = [
    {
      key: 'layout',
      title: '布局',
      icon: <FolderOpenFilled style={{ color: '#4aafee', fontSize: '1.125em' }} />,
      children: [
        {
          key: 'layout-1',
          title: '菜单布局',
          icon: <FileFilled style={{ color: '#f39a88' }} />,
        },
      ],
    },
    {
      key: '1',
      title: (
        <Space>
          <FolderOpenFilled style={{ color: '#4aafee', fontSize: '1.125em' }} />
          页面
        </Space>
      ),
      children: [
        {
          key: '1-1',
          title: '首页',
          icon: <FileFilled style={{ color: '#4aafee' }} />,
        },
        {
          key: '1-2',
          title: '数据管理',
          icon: <FileFilled style={{ color: '#4aafee' }} />,
        },
      ],
    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '0px 16px 8px' }}>
      <div style={{ padding: '8px 0', fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>项目管理</div>
      <Tree
        showIcon
        draggable
        style={{ fontSize: 14 }}
        expandedKeys={['1', 'layout']}
        treeData={treeData}
      />
    </div>
  );
}
