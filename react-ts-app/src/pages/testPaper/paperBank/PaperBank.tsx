import React,{useState} from 'react'
import type { ActionType } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { useRef } from 'react'
import { examApi,editExamApi } from '../../../services'
import DrawerComponent from './components/DrawerComponent'
import getColumns from './constant'
import { message } from 'antd'


const PaperBank:React.FC = () => {
  const actionRef = useRef<ActionType>()
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [id,setId] = useState<string>('')
  const columns = getColumns(setOpen,setLoading,setId)
  
  
  return (
    <>  
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const { current, pageSize,...other } = params
        const res = await examApi({pagesize:params.pageSize,page:params.current,...other})
        return {
          data: res.data.data.list,
          success: true,
          total: res.data.data.total,
        };
      }}
      editable={{
        type: 'multiple',
        onSave: async (id,row) => {
          const res = await editExamApi({
            id:row._id,
            name:row.name
          })
          if(res.data.code === 200){
            actionRef.current?.reload()
            message.success('更新成功')
          }else{
            message.error('更新失败')
          }
        },
      }}
      rowKey="_id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5
      }}
      dateFormatter="string"
    />
       {open && <DrawerComponent open={open} loading={loading} setOpen={setOpen} id={id}/>}
    </>
  );
 
};
export default PaperBank
