/**
 * 页面布局包裹容器
 *
 * At 2023/12/13
 * By TangJiaHui
 */
import React, { createContext, useEffect, useState } from 'react';
import { engine, JsonNode, Layout, Page } from '@/core';
import RenderJsonNode from '@/panels/Editor/components/RenderJsonNode';

export const layoutChildrenContext = createContext<{
  children?: React.ReactNode;
}>({
  children: undefined,
});

interface LayoutWrapperProps {
  current?: Page | Layout;
  showLayout?: boolean; // 显示布局
  children?: any;
}

export default function LayoutWrapper(props: LayoutWrapperProps) {
  const [jsonNodes, setJsonNodes] = useState<JsonNode[]>([]);

  function renderChildren(children: JsonNode[], isCannotSelect?: boolean): React.ReactElement {
    return (
      <>
        {children.map((jsonNode: JsonNode) => {
          return (
            <RenderJsonNode key={jsonNode.id} jsonNode={jsonNode} isCannotSelect={isCannotSelect} />
          );
        })}
      </>
    );
  }

  useEffect(() => {
    if (props?.showLayout) {
      const current = engine.project.getCurrent();
      if (!current) return;
      const bindLayoutId = engine.project.isPage(current)
        ? (current as Page)?.bindLayoutId
        : undefined;
      const jsonNodes = engine.project.getLayout(bindLayoutId)?.json || [];
      setJsonNodes(jsonNodes);
    }
  }, [props?.showLayout]);

  if (engine.project.isLayout(props?.current)) {
    return props?.children;
  }

  return props?.showLayout ? (
    <layoutChildrenContext.Provider value={{ children: props?.children }}>
      {renderChildren(jsonNodes, true)}
    </layoutChildrenContext.Provider>
  ) : (
    props?.children
  );
  // return props?.showLayout ? (
  //   <div
  //     style={{
  //       width: '100%',
  //       height: '100%',
  //       display: 'flex',
  //       background: '#dcdcdc',
  //     }}
  //   >
  //     <div style={{ flex: '0 0 150px', height: '100%', background: 'rgba(3, 21, 41)' }}>
  //       <div
  //         style={{
  //           height: 48,
  //           color: 'white',
  //           fontWeight: 'bold',
  //           userSelect: 'none',
  //           lineHeight: '48px',
  //           textAlign: 'center',
  //           letterSpacing: 2,
  //           fontSize: 16,
  //         }}
  //       >
  //         <DingtalkOutlined style={{ marginRight: 6 }} />
  //         桩桩管理平台
  //       </div>
  //       <Menu
  //         mode='inline'
  //         theme='dark'
  //         selectedKeys={['1']}
  //         items={[
  //           { label: '菜单一', key: '1' },
  //           { label: '菜单二', key: '2' },
  //           { label: '菜单三', key: '3' },
  //         ]}
  //       />
  //     </div>
  //     <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
  //       <div
  //         style={{
  //           height: 48,
  //           display: 'flex',
  //           padding: '0 16px',
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //           background: 'white',
  //         }}
  //       >
  //         <HomeOutlined style={{ color: '#939393', fontSize: 16 }} />
  //         <div style={{ gap: 8, display: 'flex', alignItems: 'center' }}>
  //           <b>Zyz测试企业</b>
  //           <Tag color={'processing'}>切换</Tag>
  //           <Divider type='vertical' />
  //           <SettingFilled style={{ color: '#939393', fontSize: 16 }} />
  //         </div>
  //       </div>
  //       <div
  //         style={{
  //           flex: 1,
  //           height: '100%',
  //           background: 'whitesmoke',
  //           padding: '16px 16px 0',
  //           overflow: 'hidden',
  //         }}
  //       >
  //         {props?.children}
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   props?.children
  // );
}
