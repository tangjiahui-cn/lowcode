import {Table} from "antd";
import {TemplateProps} from "../../data";
import {useEffect, useRef} from "react";

export interface Attributes {
  title: string; // 表格标题
}

/**
 * 组件模板
 */
export default function (props: TemplateProps<Attributes, HTMLDivElement>) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props?.getDomFn?.(() => domRef.current);
  }, [])

  return (
    <div
      ref={domRef}
      style={props?.style}
      {...props?.events}
    >
      {props?.attributes?.title &&
        <h2 style={{textAlign: 'center'}}>{props?.attributes?.title}</h2>}
      <Table
        dataSource={[
          {key: '1', no: 1, name: 'T.J.H', age: 24, idCard: '340823199912341234'}
        ]}
        columns={[
          {title: '序号', dataIndex: 'no'},
          {title: '姓名', dataIndex: 'name'},
          {title: '年龄', dataIndex: 'age'},
          {title: '身份证号码', dataIndex: 'idCard'},
        ]}
        pagination={{
          total: 30
        }}
      />
    </div>
  )
}
