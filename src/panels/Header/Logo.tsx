import { Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

export default function () {
  function handleJumpGithub() {
    window.open('https://github.com/tangjiahui-cn/lowcode-engine');
  }

  return (
    <Space style={{ userSelect: 'none' }}>
      <b style={{ fontSize: '1.5em' }}>低代码引擎</b>
      <GithubOutlined
        onClick={handleJumpGithub}
        style={{
          fontSize: '1.25em',
          verticalAlign: 'middle',
          paddingRight: 10,
          cursor: 'pointer',
        }}
      />
    </Space>
  );
}
