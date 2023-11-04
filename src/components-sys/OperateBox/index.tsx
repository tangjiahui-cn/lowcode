import { Space } from 'antd';
import { ArrowUpOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { btn } from './style';

/**
 * 操作工具盒
 */

interface IProps {
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
  const mergeShow = {
    showDrag: props?.show?.showDrag ?? true,
    showSelectParent: props?.show?.showSelectParent ?? true,
    showDelete: props?.show?.showDelete ?? true,
  };

  return (
    <Space size={0}>
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
