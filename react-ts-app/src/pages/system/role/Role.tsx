import React, { useEffect, useState } from 'react'
// import style from './Role.module.scss'
import { Button,Table  } from 'antd'
import { roleListApi } from '../../../services'
import DrawerComponent from './components/DrawerComponent'
import ModalComponents from './components/ModalComponents'
import getClumns from './constant'
import type { DataType } from './constant'
import type { roleListItemType } from '../../../services/type'






const Role: React.FC = () => {
  const [data,setData] = useState<roleListItemType[]>([])
  const [isOpen,setIsOpen] = useState(false)
  const [record,setRecord] = useState<DataType>({} as DataType)
  const [show,setShow] = useState(false)
  
  const getRoleList = async ()=>{
    const res = await roleListApi()
    if(res.data.code === 200){
      console.log(res.data.data.list)
      setData(res.data.data.list)
    }
  }
  const columns = getClumns(setIsOpen,setRecord,getRoleList)
  useEffect(()=>{
    getRoleList()
  },[])
  return (
    <>
      <Button 
        type='primary' 
        style={{borderRadius:20,marginBottom:20}} 
        onClick={()=>{
          setShow(true)
        }}>+添加角色</Button>
      <Table<roleListItemType> columns={columns} dataSource={data} rowKey='_id'/>
      <DrawerComponent isOpen={isOpen} setIsopen={setIsOpen} record={record} />
      <ModalComponents show={show} setShow={setShow} getRoleList={getRoleList}/>
    </>
  );
};
export default Role;