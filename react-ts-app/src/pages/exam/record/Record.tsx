import React, {useRef} from 'react'
import { getRecordApi } from '../../../services';
import type { RecordListType } from '../../../services/type';

import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, } from 'antd';
const columns: ProColumns<RecordListType>[] = [
  {
    title: '考试名称',
    dataIndex: 'name',
    ellipsis: true,
    width: 80,
  },
  {
    title: '科目分类',
    dataIndex: 'classify',
    search:true,
    valueType: 'select',
    ellipsis: true,
    width: 80,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    ellipsis: true,
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTimeSearch',
    valueType: 'dateTimeRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    valueType: 'dateTime',
    hideInSearch: true,
    width: 160,
  },		
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      '0': {
        text: '未开始'
      },
      '1': {
        text: '已结束',
      },
      '2': {
        text: '进行中',
      },
    },
  },
  {
    title: '监考人',
    dataIndex: 'examiner',
    ellipsis: true
  },
  {
    title: '考试班级',
    dataIndex: 'group',
    ellipsis: true,
    valueType: 'select',
  },		
  {
    title: '开始时间',
    // key: 'startTime',
    dataIndex: 'startTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '结束时间',
    // key: 'endTime',
    dataIndex: 'endTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '考试时间',
    dataIndex: 'examTime',
    valueType: 'dateTimeRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '设置',
    valueType: "option",
    dataIndex: 'setting',
    hideInSearch: true,
    width: 160,
    render: () => [
      <Space>
        <Button type="primary" size="small">
          {/*  onClick={showDrawer} */}
          预览试卷
        </Button>
        <Button type="default" size="small" disabled>
          删除
        </Button>
      </Space>

    ],
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'operate',
    fixed: 'right',
    hideInSearch: true,
    width: 80,
    render: () => [
      <Button type="primary" size="small">
        成绩分析
      </Button>
    ],
  },
];

const record:React.FC = () => {
  const actionRef = useRef<ActionType>();
  // const [open, setOpen] = useState(false);
  // const showDrawer = () => {
  //   setOpen (true)
  // }
  return (
    <ProTable<RecordListType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params,sorter,filter) => {
        console.log(params,sorter,filter)
        const { current , pageSize,...others } = params
        const res = await getRecordApi({ 
          page:current!,
          pagesize:pageSize!,
          ...others 
        })
        console.log(res.data.data.list)
        return {
          data: res.data.data.list,
          total: res.data.data.total,
          success: true,
        }
      }}
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      rowKey="_id"
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        showQuickJumper: true,
        // onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="考试记录"
      scroll={{ x: 1300 }}
    />
  );
};
export default record;