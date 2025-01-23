import type { ProFormColumnsType } from '@ant-design/pro-components';
import { Input, Image, Button, Space, Modal} from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import type { UserListType } from '../../../services/type'


const valueEnum = new Map(
  [
    [ 1,{ text: '启用' }],
    [ 0,{ text: '禁用' }],
  ]
);

export interface DataItem {
  username: string;
  password: string;
  status: number;
}

// 弹窗表单
export const modalColumns: ProFormColumnsType<DataItem>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '密码',
    dataIndex: 'password',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入密码',
        },
      ],
    },
    renderFormItem: () => <Input.Password />, 
    width: 'm',
  },
  {
    title: '启用状态',
    dataIndex: 'status',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择状态',
        },
      ],
    },
    valueType: "radio",
    valueEnum,
    width: 'm',
  }
];



interface ColumnsProps {
  onClickEdit: (record: UserListType) => void,
  onClickDel: (record: UserListType) => void,
  onClickRole: (record: UserListType) => void,
}

// 数据表格
export const getColumns = ({onClickEdit,onClickDel,onClickRole}: ColumnsProps) => {
  const columns: ProColumns<UserListType>[] = [
    {
      title: '头像',
      dataIndex: 'avator',
      hideInSearch: true,
      align: 'center',
      render: (_, record) => (
        <Image
          width={200}
          src={record.avator || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'}
        />
      ),
    },
    {
      title: '是否禁用',
      dataIndex: 'status',
      valueType: 'select',
      width:100,
      align: 'center',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success'}
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      search: true,
      align: 'center',
      width:200
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '最近登录',
      dataIndex: 'lastOnlineTime',
      valueType: "dateTime",
      hideInSearch: true,
      width: 150,
      align: 'center',
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
      hideInSearch: true,
      width: 80,
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (text, record, _, action) => (      
        <Space>
          <Button type="primary" size="small" onClick={() => onClickRole(record)}>分配角色</Button>
          <Button type="primary" size="small" onClick={() => onClickEdit(record)}>编辑</Button>
          <Button type="default" size="small" onClick={() => onClickDel(record)}>删除</Button>
        </Space>
      ),
    },
  ];
  return columns
}



