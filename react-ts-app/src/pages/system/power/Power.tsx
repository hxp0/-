import React, { useState, useEffect } from 'react'
import { Table, Button, message } from 'antd'
import style from './Power.module.scss'
import { permissionListApi, permissionDeleteApi } from '../../../services'
import type { permissionListItem } from '../../../services/type'
import { getTableData } from './constant'
import DrawerCom from './components/DrawerCom'

const Power: React.FC = () => {
  const [open, setOpen] = useState<boolean>()
  const [permissionList, setPermissionList] = useState<permissionListItem[]>()
  const [editRow, setEditRow] = useState<permissionListItem | null>(null)

  const getPermissionList = async()=>{
    const res = await permissionListApi()
    setPermissionList(res.data.data.list)
  }

  useEffect(()=>{
    getPermissionList()
  }, [])

  const editFn = ( row: permissionListItem )=>{
    setOpen(true)
    console.log(row)
    setEditRow(row)
  }

  const delFn = async( id: string )=>{
    try{
      const res = await permissionDeleteApi({id})
      console.log(res.data)
      if( res.data.code === 200 ){
        getPermissionList()
        message.success('删除成功')
      }else{
        message.error(res.data.msg)
      }
    }catch(e){
      console.log(e)
    }
  }
  
  const { columns, dataSource } = getTableData({ list: permissionList!, editFn, delFn })

  return (
    <>
      <div className={style.title}>
        <h3>菜单列表</h3>
        <Button type='primary' onClick={()=>setOpen(true)}>添加菜单</Button>
      </div>
      <Table<permissionListItem>
        columns={columns}
        dataSource={dataSource}
        size="middle"
        pagination={false}
        rowKey='_id'
      />
      <DrawerCom
        open={open!}
        changeOpen={setOpen}
        list={permissionList!}
        refresh={getPermissionList}
        editRow={editRow}
        changeRow={setEditRow}
      />
    </>
  )
};

export default Power;
