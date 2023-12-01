import { Button, Dropdown, MenuProps } from 'antd';
import { RegisterEventStepType } from '../../../../../../../core';

interface IProps {
  onSelect?: (key: RegisterEventStepType) => void;
}
export default function addEventStepButton(props: IProps) {
  const items: MenuProps['items'] = [
    { key: 'event', label: '触发组件' },
    { key: 'globalVar', label: '修改全局变量' },
    { key: 'openUrl', label: '打开新页面' },
    { key: 'jumpUrl', label: '跳转页面' },
  ];

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
        onClick: ({ key }) => {
          props?.onSelect?.(key as any);
        },
      }}
    >
      <Button type={'dashed'} block>
        + 新增操作
      </Button>
    </Dropdown>
  );
}
