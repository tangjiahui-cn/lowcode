import { useEffect, useState } from 'react';
import { Modal, Space } from 'antd';
import { TipDialogPoolOpenProps } from '.';
import { QuestionCircleFilled } from '@ant-design/icons';

type IProps = TipDialogPoolOpenProps & {
  removeDomFn?: () => void;
};

export default function (props: IProps) {
  const { iconStyle } = props;
  const [visible, setVisible] = useState<boolean>(false);

  function handleCancel() {
    setVisible(false);
    props?.removeDomFn?.();
  }

  function handleOk() {
    props?.onOk?.(handleCancel);
  }

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Modal
      visible={visible}
      centered
      title={
        <Space>
          {props?.icon !== false && (
            <div
              style={{
                display: 'inline-block',
                color: 'rgb(230, 100, 80)',
                fontSize: '22px',
                verticalAlign: 'middle',
                ...iconStyle,
              }}
            >
              {props?.icon || <QuestionCircleFilled />}
            </div>
          )}
          {props?.title}
        </Space>
      }
      destroyOnClose
      okText={props?.okText}
      cancelText={props?.cancelText}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      {props?.content}
    </Modal>
  );
}
