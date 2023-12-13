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
  FolderOutlined,
  FontColorsOutlined,
} from '@ant-design/icons';
import MenuTabs from './components/MenuTabs';
import { useState } from 'react';

interface IProps {
  panels: {
    [K: string]: React.FunctionComponent;
  };
}

export default function BasicLayout(props: IProps) {
  const { Editor, Header, Components, Attributes, Project } = props?.panels;
  const [activeKey, setActiveKey] = useState<string>('1');

  const menu = [
    { key: '1', label: '项目管理', value: Project, icon: FolderOutlined },
    { key: '2', label: '组件库', value: Components, icon: AppstoreOutlined },
    { key: '3', label: 'JSON编辑器', value: undefined, icon: EditOutlined },
    { key: '4', label: '组件树', value: undefined, icon: ApartmentOutlined },
    { key: '5', label: '全局变量', value: undefined, icon: FontColorsOutlined },
  ];

  return (
    <div className={styles.pageClass}>
      <div className={styles.headClass}>{Header && <Header />}</div>
      <div className={styles.bodyClass}>
        <div className={styles.bodyLeftClass}>
          <MenuTabs options={menu} value={activeKey} onChange={setActiveKey} />
          <div style={{ flex: 1, overflowY: 'auto', borderLeft: '1px solid #e8e8e8' }}>
            {activeKey === '1' && Project && <Project />}
            {activeKey === '2' && Components && <Components />}
          </div>
        </div>
        <div className={styles.bodyMidClass}>{Editor && <Editor />}</div>
        <div className={styles.bodyRightClass}>{Attributes && <Attributes />}</div>
      </div>
    </div>
  );
}
