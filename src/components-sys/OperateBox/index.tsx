import { Space, Tooltip } from 'antd';
import { ArrowUpOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { btn, name } from './style';
import { currentInstances, JsonNode } from '../../data';
import ParentList from './ParentList';
import { useState } from 'react';

/**
 * 操作工具盒
 */

interface IProps {
  jsonNode: JsonNode;
  // 是否显示按钮
  show?: {
    // 显示拖拽操作
    showDrag?: boolean;
    // 显示选中父组件
    showSelectParent?: boolean;
    // 显示删除组件按钮
    showDelete?: boolean;
  };
  onDragStart?: React.DragEventHandler<HTMLSpanElement>;
  onDragEnd?: React.DragEventHandler<HTMLSpanElement>;
  // 选中父级组件
  onSelectParent?: () => void;
  // 点击删除
  onDelete?: () => void;
}

export default function OperateBox(props: IProps) {
  // 浮层是否允许显示
  const [allowVisible, setAllowVisible] = useState(true);

  const mergeShow = {
    showDrag: props?.show?.showDrag ?? true,
    showSelectParent: props?.show?.showSelectParent ?? true,
    showDelete: props?.show?.showDelete ?? true,
  };

  function handleSelect(node: JsonNode) {
    currentInstances.getInstance(node?.id)?.handleSelect();
    setAllowVisible(false);
  }

  return (
    <Space size={0} style={{ background: '#3877ec', color: 'white' }}>
      {/* TODO: 后续重写浮层 */}
      <Tooltip
        overlayInnerStyle={{ boxShadow: 'none', display: allowVisible ? 'block' : 'none' }}
        title={<ParentList jsonNode={props?.jsonNode} onSelect={handleSelect} />}
        placement={'bottomLeft'}
        color={'transparent'}
      >
        <div className={name}>{props?.jsonNode?.name}</div>
      </Tooltip>
      {mergeShow.showDrag && (
        <DragOutlined
          draggable
          className={btn}
          style={{ color: 'white' }}
          onDragEnd={props?.onDragEnd}
          onDragStart={props?.onDragStart}
        />
      )}
      {mergeShow?.showSelectParent && (
        <ArrowUpOutlined
          className={btn}
          style={{ color: 'white' }}
          onClick={props?.onSelectParent}
        />
      )}
      {mergeShow?.showDelete && (
        <DeleteOutlined className={btn} style={{ color: 'white' }} onClick={props?.onDelete} />
      )}
    </Space>
  );
}
