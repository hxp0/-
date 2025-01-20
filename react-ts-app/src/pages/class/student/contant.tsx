import type {ProColumns } from '@ant-design/pro-components'
import type { StudentListItemType } from '../../../services/type'

interface Params {
  changeDrawerOpen: (row: StudentListItemType )=>void
}

export const operateFn = ({ changeDrawerOpen }: Params) =>{
  const columns: ProColumns<StudentListItemType>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '姓名',
      dataIndex: 'username',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '班级',
      dataIndex: 'className',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 180,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        > 编辑 </a>,
        <a
          key="view"
          onClick={() => {
            changeDrawerOpen(record)
          }}
        > 查看 </a>,
      ],
    },
  ]
  return columns
}