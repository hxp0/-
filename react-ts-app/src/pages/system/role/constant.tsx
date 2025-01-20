import { Button,Space,message,Modal  } from 'antd';
import type { TableProps } from 'antd'
import { roleDeleteApi } from '../../../services'
import type { roleListItemType } from '../../../services/type'


export interface DataType {
  _id: string
  key: string
  name: string
  value: string
  creator: string
  createTime: number
  permission: string[]
}

const getClumns = (setIsOpen:(val:boolean)=>void,setRecord:any,getRoleList:any)=>{
    const columns: TableProps<roleListItemType>['columns'] = [
      {
        title: '角色',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '角色关键字',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        render: (_, record) => <span>{new Date(record.createTime).toLocaleString()}</span>
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type='primary' 
              onClick={()=>{
                setIsOpen(true)
                setRecord(record)
              }}
            >分配角色</Button>
            <Button 
              style={{borderColor:'red',color:'red'}}
              onClick={async()=>{
                Modal.confirm({
                  title: '确认删除',
                  content: '是否确认删除',
                  okText: '确认',
                  cancelText: '取消',
                  async onOk(){
                    const res = await roleDeleteApi(record._id)
                    if(res.data.code === 200){
                      message.success('删除成功')
                      getRoleList()
                      return
                    }
                  }
                })
              }}
            >删除</Button>
          </Space>
        )
      }
    ]
    return columns
  }
export default getClumns