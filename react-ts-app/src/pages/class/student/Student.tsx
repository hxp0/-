import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import { useRef } from 'react'
import { operateFn } from './contant'
import type { StudentListItemType } from '../../../services/type'
import { StudentListApi, StudentEditApi, StudentDeleteApi } from '../../../services'
import Pop from './components/Pop'
import DrawerCom from './components/DrawerCom'

const Student: React.FC = ()=> {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [row, setRow] = useState<StudentListItemType>()

  const changeDrawerOpen = ( row: StudentListItemType )=>{
    setRow(row)
    setDrawerOpen(true)
  }

  const delFn = async(id: string)=>{
    try{
      const res = await StudentDeleteApi({ id })
      console.log(res.data)
      if( res.data.code === 200 ){
        message.success('删除成功！')
        actionRef.current?.reload()
      }else{
        message.error(res.data.msg)
      }
    }catch(e){
      console.log(e)
    }
  }

  const columns = operateFn({ changeDrawerOpen, delFn })

  return (
    <>
      <ProTable<StudentListItemType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async(params) => {
          const { current, pageSize, username, age, sex, className } = params
          const res = await StudentListApi({
            page: current!,
            pagesize: pageSize!,
            username,
            age,
            sex,
            className
          })
          return {
            data: res.data.data.list,
            total: res.data.data.total,
            success: true
          }
        }}
        editable={{
          type: 'multiple',
          onSave: async( rowKey, record ) => {
            const key = rowKey as string;
            try{
              const res = await StudentEditApi({
                ...record,
                id: key,
              })
              if( res.data.code === 200 ){
                message.success('编辑成功！')
                actionRef.current?.reload()
              }else{
                message.error(res.data.msg)
              }
            }catch(e){
              console.log(e)
            }
          },
          actionRender: (row, config, dom) => {
            console.log(row,config)
            return [dom.save, dom.cancel];
          },
        }}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpen(true)
              actionRef.current?.reload();
            }}
            type="primary"
          >
            添加学生
          </Button>
        ]}
      />
      <Pop open={open} changeOpen={setOpen} refresh={()=>actionRef.current!.reload()}/>
      <DrawerCom  row={row!} drawerOpen={drawerOpen} changeOpen={setDrawerOpen}/>
    </>
  );
}
export default Student