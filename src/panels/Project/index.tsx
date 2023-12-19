/**
 * Project 面板
 *
 * At 2023/12/10
 * By TangJiaHui
 * Description： 负责管理Project的所有页面与布局
 */
import { DeleteOutlined, FileFilled, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Tree, TreeDataNode } from 'antd';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { engine, JsonNode, Layout, notify, Page, useHook, useListenProjectChange } from '@/core';
import RenderLine from './components/RenderLine';
import SwitchIcon from './components/SwitchIcon';
import AddPageDialog from './components/AddPageDialog';
import AddLayoutDialog from './components/AddLayoutDialog';
import Dynamic from '@/common/Dynamic';
import ITipDialog from '@/common/ITipDialog';

type TreeNode = TreeDataNode & {
  _isPage?: boolean; // 是否是页面
  _isLayout?: boolean; // 是否是布局
  _data?: Page | Layout; // 携带数据
};
export default function () {
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const [currentItem, setCurrentItem] = useState<Page | Layout>();
  const [addLayoutVisible, setAddLayoutVisible] = useState(false);
  const [addPageVisible, setAddPageVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function handleAddLayout() {
    setIsEdit(false);
    setCurrentItem(undefined);
    setAddLayoutVisible(true);
  }

  function handleEditLayout(layout: Layout) {
    setIsEdit(true);
    setCurrentItem(layout);
    setAddLayoutVisible(true);
  }

  function handleDeleteLayout(layout: Layout) {
    ITipDialog.open({
      title: '提醒',
      content: '是否删除布局?',
      onOk(close) {
        engine.project.deleteLayout(layout.layoutId).then(close);
      },
    });
  }

  function handleAddPage() {
    setIsEdit(false);
    setCurrentItem(undefined);
    setAddPageVisible(true);
  }

  function handleEditPage(page: Page) {
    setIsEdit(true);
    setCurrentItem(page);
    setAddPageVisible(true);
  }

  function handleDeletePage(page: Page) {
    ITipDialog.open({
      title: '提醒',
      content: '是否删除页面？',
      onOk(close) {
        engine.project.deletePage(page.pageId).then(close);
      },
    });
  }

  // 显示/隐藏页面的layout
  function handleShowLayoutWrapPage(page: Page) {
    page.bindLayoutVisible = !page?.bindLayoutVisible;
    engine.project.updatePage(page);
    reGenTree();

    // 当前页面变更布局
    if (engine.project.isCurrent(page)) {
      engine.wrapBox.clear();
      notify('change-layout-visible', page.bindLayoutVisible);
    }
  }

  function getTreeData(pages: Page[], layouts: Layout[]): TreeNode[] {
    return [
      {
        key: 'layout',
        title: (
          <RenderLine
            label={'布局'}
            options={[
              {
                label: <PlusOutlined />,
                value: 'add',
              },
            ]}
            onOperate={(value) => {
              value === 'add' && handleAddLayout();
            }}
          />
        ),
        selectable: false,
        switcherIcon: ({ expanded }) => <SwitchIcon expanded={expanded} color={'#f39a88'} />,
        children: layouts?.length
          ? layouts.map((layout: Layout) => {
              return {
                _data: layout,
                _isLayout: true,
                key: layout.layoutId,
                title: (
                  <RenderLine
                    label={layout.layoutName}
                    options={[
                      {
                        label: (
                          <Dynamic type={'scale'}>
                            <DeleteOutlined />
                          </Dynamic>
                        ),
                        value: 'del',
                      },
                      {
                        label: (
                          <Dynamic type={'rotate'}>
                            <SettingOutlined />
                          </Dynamic>
                        ),
                        value: 'edit',
                      },
                    ]}
                    onOperate={(value) => {
                      value === 'edit' && handleEditLayout(layout);
                      value === 'del' && handleDeleteLayout(layout);
                    }}
                  />
                ),
                switcherIcon: <FileFilled style={{ color: '#f39a88' }} />,
              };
            })
          : [
              {
                key: 'no_layout',
                selectable: false,
                title: <span style={{ color: '#b7b7b7' }}>暂无数据</span>,
              },
            ],
      },
      {
        key: 'page',
        title: (
          <RenderLine
            label={'页面'}
            options={[{ label: <PlusOutlined />, value: 'add' }]}
            onOperate={(value) => {
              value === 'add' && handleAddPage();
            }}
          />
        ),
        selectable: false,
        switcherIcon: ({ expanded }) => <SwitchIcon expanded={expanded} color={'#4aafee'} />,
        children: pages?.length
          ? pages.map((page: Page) => {
              return {
                _data: page,
                _isPage: true,
                key: page.pageId,
                title: (
                  <RenderLine
                    label={page.pageName}
                    options={
                      [
                        page.bindLayoutId && {
                          custom: true,
                          label: (
                            <Dynamic type={'scale'} style={{ fontSize: 16 }}>
                              {page?.bindLayoutVisible ? (
                                <a>L</a>
                              ) : (
                                <span style={{ color: '#9d9d9d' }}>L</span>
                              )}
                            </Dynamic>
                          ),
                          value: 'show-layout',
                        },
                        {
                          label: (
                            <Dynamic type={'scale'}>
                              <DeleteOutlined />
                            </Dynamic>
                          ),
                          value: 'del',
                        },
                        {
                          label: (
                            <Dynamic type={'rotate'}>
                              <SettingOutlined />
                            </Dynamic>
                          ),
                          value: 'edit',
                        },
                      ].filter(Boolean) as any[]
                    }
                    onOperate={(value) => {
                      value === 'edit' && handleEditPage(page);
                      value === 'del' && handleDeletePage(page);
                      value === 'show-layout' && handleShowLayoutWrapPage(page);
                    }}
                  />
                ),
                switcherIcon: <FileFilled style={{ color: '#4aafee' }} />,
              };
            })
          : [
              {
                key: 'no_page',
                selectable: false,
                title: <span style={{ color: '#b7b7b7' }}>暂无数据</span>,
              },
            ],
      },
    ];
  }

  function handleSelect(page?: Page | Layout, isOnlyKeys?: boolean) {
    if (!isOnlyKeys) {
      engine.project.setCurrent(page);
      notify('set-jsonNodes', page?.json);
    }

    if ((page as Page)?.pageId) {
      notify('change-layout-visible', (page as Page).bindLayoutVisible);
    }

    setSelectedKeys([(page as Layout)?.layoutId || (page as Page)?.pageId].filter(Boolean));
  }

  // 刷新树
  function reGenTree() {
    const pages: Page[] = engine.project.getAllPage();
    const layouts: Layout[] = engine.project.getAllLayout();
    setTreeData(getTreeData(pages, layouts));
    // 新增后默认选中一项
    if (!engine.project.getCurrent()) {
      handleSelect(pages?.[0] || layouts?.[0]);
    } else {
      handleSelect(engine.project.getCurrent(), true);
    }
  }

  useListenProjectChange(() => {
    reGenTree();
  });

  // 监听编辑器挂载
  useHook('editor-mount', () => {
    const jsonNodes: JsonNode[] = engine.project.getCurrent()?.json || [];
    notify('set-jsonNodes', jsonNodes);
  });

  useEffectOnce(() => {
    reGenTree();
    setExpandedKeys(engine.project.getExpandedKeys() || ['page']);
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
        onExpand={(expandedKeys) => {
          engine.project.saveExpandedKeys(expandedKeys);
          setExpandedKeys(expandedKeys);
        }}
        onSelect={(selectedKeys, info) => {
          const node = info?.node;
          if (!selectedKeys?.length) {
            return;
          }

          handleSelect(node?._data as Page | Layout);
        }}
      />

      {/* 新增/编辑页面对话框 */}
      <AddPageDialog
        visible={addPageVisible}
        isEdit={isEdit}
        data={currentItem as Page}
        onCancel={() => setAddPageVisible(false)}
        onOk={() => {
          setAddPageVisible(false);
          reGenTree();
          if (!expandedKeys.includes('page')) {
            setExpandedKeys(['page', ...expandedKeys]);
          }
        }}
      />

      {/* 新增/编辑布局对话框 */}
      <AddLayoutDialog
        visible={addLayoutVisible}
        isEdit={isEdit}
        data={currentItem as Layout}
        onCancel={() => setAddLayoutVisible(false)}
        onOk={() => {
          setAddLayoutVisible(false);
          reGenTree();
          if (!expandedKeys.includes('layout')) {
            setExpandedKeys(['layout', ...expandedKeys]);
          }
        }}
      />
    </div>
  );
}
