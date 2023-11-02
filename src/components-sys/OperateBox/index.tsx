import {Space} from "antd";
import {ArrowUpOutlined, DeleteOutlined} from "@ant-design/icons";
import {btn} from './style'

/**
 * 操作工具盒
 */

interface IProps {
  // 选中父级组件
  onSelectParent?: () => void;
  // 点击删除
  onDelete?: () => void;
}

export default function OperateBox(props: IProps) {
  return (
    <Space size={0}>
      <ArrowUpOutlined
        className={btn}
        style={{color: 'white'}}
        onClick={props?.onSelectParent}
      />
      <DeleteOutlined
        className={btn}
        style={{color: 'white'}}
        onClick={props?.onDelete}
      />
    </Space>
  )
}
