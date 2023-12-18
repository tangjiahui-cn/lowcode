import { Empty } from 'antd';

export default function IEmpty() {
  return (
    <div
      style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}
