import {Space} from "antd";
import {ArrowUpOutlined, DeleteOutlined} from "@ant-design/icons";
import {btn} from './style'

/**
 * 操作工具盒
 */

interface IProps {
  // 是否显示按钮
  show?: {
    showSelectParent?: boolean;
    showDelete?: boolean;
  };
  // 选中父级组件
  onSelectParent?: () => void;
  // 点击删除
  onDelete?: () => void;
}

export default function OperateBox(props: IProps) {
  const mergeShow = {
    showSelectParent: props?.show?.showSelectParent ?? true,
    showDelete: props?.show?.showDelete ?? true
  }

  return (
    <Space size={0}>
      {mergeShow?.showSelectParent && <ArrowUpOutlined
        className={btn}
        style={{color: 'white'}}
        onClick={props?.onSelectParent}
      />}
      {mergeShow?.showDelete && <DeleteOutlined
        className={btn}
        style={{color: 'white'}}
        onClick={props?.onDelete}
      />}
    </Space>
  )
}
