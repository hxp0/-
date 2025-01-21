import type { TableColumnsType } from 'antd'
import type { permissionListItem } from '../../../services/type'

interface ParamsType {
  list: permissionListItem[]
  editFn: ( row: permissionListItem )=>void
  delFn: ( id: string )=>void
}

export const getTableData = ( { list, editFn, delFn }: ParamsType )=>{

  const dataSource = list

  const columns: TableColumnsType<permissionListItem> = [
    { title: '菜单名称', dataIndex: 'name', key: 'name', width:133 },
    { title: '菜单路径', dataIndex: 'path', key: 'path', width:200 },
    {
      title: '权限类型',
      dataIndex: 'isBtn',
      key: 'isBtn',
      width:120,
      render: (_, record) => {
        return record.isBtn ? '按钮' : '页面'
      }
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width:190 },
    {
      title: '操作',
      key: 'operation',
      width:120,
      render: (record) => (
        <>
          <a
            style={{marginRight:10}}
            onClick={()=>{
              editFn(record)
            }}
          >编辑</a>
          <a
            onClick={()=>{
              delFn(record._id)
            }}
          >删除</a>
        </>
    )},
  ];
  
  return {
    columns,
    dataSource
  }
}