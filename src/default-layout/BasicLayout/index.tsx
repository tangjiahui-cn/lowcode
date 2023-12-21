/**
 * 经典布局样式
 *
 * At 2023/12/07
 * By TangJiaHui
 */
import * as styles from './style';
import {
  ApartmentOutlined,
  AppstoreOutlined,
  EditOutlined,
  // FolderOutlined,
  FontColorsOutlined,
} from '@ant-design/icons';
import MenuTabs from './components/MenuTabs';
import { useState } from 'react';
import { RenderPlugin, Runtime } from '@/engine';

interface IProps {
  runtime: Runtime;
}

export default function BasicLayout(props: IProps) {
  const [activeKey, setActiveKey] = useState<string>('2');

  const menu = [
    // { key: '1', label: '项目管理', icon: FolderOutlined },
    { key: '2', label: '组件库', icon: AppstoreOutlined },
    { key: '3', label: 'JSON编辑器', icon: EditOutlined },
    { key: '4', label: '组件树', icon: ApartmentOutlined },
    { key: '5', label: '全局变量', icon: FontColorsOutlined },
  ];

  return (
    <div className={styles.pageClass}>
      <div className={styles.headClass}>
        {<RenderPlugin pluginId={'header-plugin'} runtime={props?.runtime} />}
      </div>
      <div className={styles.bodyClass}>
        <div className={styles.bodyLeftClass}>
          <MenuTabs options={menu} value={activeKey} onChange={setActiveKey} />
          <div style={{ flex: 1, overflowY: 'auto', borderLeft: '1px solid #e8e8e8' }}>
            {activeKey === '1' && (
              <RenderPlugin pluginId={'project-plugin'} runtime={props?.runtime} />
            )}
            {activeKey === '2' && (
              <RenderPlugin pluginId={'components-plugin'} runtime={props?.runtime} />
            )}
          </div>
        </div>
        <div className={styles.bodyMidClass}>
          {<RenderPlugin pluginId={'editor-plugin'} runtime={props?.runtime} />}
        </div>
        <div className={styles.bodyRightClass}>
          {<RenderPlugin pluginId={'attributes-plugin'} runtime={props?.runtime} />}
        </div>
      </div>
    </div>
  );
}
