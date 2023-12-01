import ICustomSelect, {
  ICustomSelectProps,
} from '../../../../../../../components-sys/ICustomSelect';

export default function PayloadTypeSelect(props: ICustomSelectProps) {
  return (
    <ICustomSelect
      {...props}
      requestFn={async () => [
        { label: '默认值', value: 'default' },
        { label: '自定义', value: 'custom' },
        { label: '全局变量', value: 'globalVar' },
      ]}
    />
  );
}
