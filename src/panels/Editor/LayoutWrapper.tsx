/**
 * 页面布局包裹容器
 *
 * At 2023/12/13
 * By TangJiaHui
 */
import { Divider, Menu, Tag } from 'antd';
import { DingtalkOutlined, HomeOutlined, SettingFilled } from '@ant-design/icons';

interface LayoutWrapperProps {
  children?: any;
}

export default function LayoutWrapper(props: LayoutWrapperProps) {
  const showLayout = true;

  return showLayout ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <div style={{ flex: '0 0 150px', height: '100%', background: 'rgba(3, 21, 41)' }}>
        <div
          style={{
            height: 48,
            color: 'white',
            fontWeight: 'bold',
            userSelect: 'none',
            lineHeight: '48px',
            textAlign: 'center',
            letterSpacing: 2,
            fontSize: 16,
          }}
        >
          <DingtalkOutlined style={{ marginRight: 6 }} />
          桩桩管理平台
        </div>
        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={['1']}
          items={[
            { label: '菜单一', key: '1' },
            { label: '菜单二', key: '2' },
            { label: '菜单三', key: '3' },
          ]}
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            height: 48,
            display: 'flex',
            padding: '0 16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white'
          }}
        >
          <HomeOutlined style={{ color: '#939393', fontSize: 16 }} />
          <div style={{ gap: 8, display: 'flex', alignItems: 'center' }}>
            <b>Zyz测试企业</b>
            <Tag color={'processing'}>切换</Tag>
            <Divider type='vertical' />
            <SettingFilled style={{ color: '#939393', fontSize: 16 }} />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'whitesmoke',
            padding: '16px 16px 0',
            overflow: 'hidden'
          }}
        >
          {props?.children}
        </div>
      </div>
    </div>
  ) : (
    props?.children
  );
}
