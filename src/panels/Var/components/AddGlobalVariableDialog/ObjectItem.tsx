import JSONEditor from '@/common/JSONEditor';

type Object = {
  [K: string]: any;
};

interface IProps {
  value?: Object;
  onChange?: (value: Object) => void;
}

export default function ObjectItem(props: IProps) {
  return (
    <div style={{ height: 200 }}>
      <JSONEditor
        defaultValue={props?.value}
        onChange={(value) => {
          props?.onChange?.(value);
        }}
      />
    </div>
  );
}
