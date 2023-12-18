/**
 * 折叠图标
 *
 * At 2023/12/14
 * By TangJiaHui
 */
import { FolderOpenFilled, FolderOutlined } from '@ant-design/icons';

export default function SwitchIcon(props: { expanded?: boolean; color?: string }) {
  const style = { fontSize: '1.125em', color: props?.color };
  return props?.expanded ? (
    <FolderOpenFilled style={style} />
  ) : (
    <FolderOutlined style={style} />
  );
}
