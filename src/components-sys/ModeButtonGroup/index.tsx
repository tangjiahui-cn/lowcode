import { Space } from 'antd';
import * as classNames from 'classnames';
import { btn, btnSelect } from './style';
import { MODE } from '../../data';

const options = [
  { label: '开发', value: MODE.DEV },
  { label: '预览', value: MODE.PREVIEW },
];

interface IProps {
  value?: MODE;
  onChange?: (value: MODE) => void;
}

export default function (props: IProps) {
  return (
    <Space size={0}>
      {options?.map((option) => {
        return (
          <div
            key={option?.value}
            onClick={() => props?.onChange?.(option.value)}
            className={classNames(btn, props?.value === option.value && btnSelect)}
          >
            {option?.label}
          </div>
        );
      })}
    </Space>
  );
}
