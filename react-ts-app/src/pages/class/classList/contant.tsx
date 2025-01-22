import type {ProColumns } from '@ant-design/pro-components'
import type { StudentGroupListItemType } from '../../../services/type'
import PermissionButton from '../../../components/PermissionButton'

interface Params {
  changeDrawerOpen: (row: StudentGroupListItemType )=>void
  delFn: (id: string)=>void
}

export const operateFn = ({ changeDrawerOpen, delFn }: Params) =>{
  const columns: ProColumns<StudentGroupListItemType>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
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
      title: '创建人',
      dataIndex: 'creator',
      hideInSearch: true,
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
      title: '老师',
      dataIndex: 'teacher',
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
      title: '科目',
      dataIndex: 'classify',
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
        <PermissionButton perKey='groupDelBtn'> 
          <a
            onClick={() => {
              delFn(record._id);
            }}
          > 删除 </a>
        </PermissionButton>,
        <a
          key="view"
          onClick={() => {
            console.log(text)
            changeDrawerOpen(record)
          }}
        > 查看 </a>,
      ],
    },
  ]
  return columns
}