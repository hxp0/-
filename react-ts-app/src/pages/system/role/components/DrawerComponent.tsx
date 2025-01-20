import React,{ useEffect,useRef,useState } from 'react'
import { Button, Drawer, message, Tree  } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import { permissionListApi,roleEditApi } from '../../../../services'
import type { DataType } from '../constant'
import type { Key } from 'node:readline'

interface Props {
    isOpen:boolean
    setIsopen:(val:boolean)=>void
    record:DataType
}


const DrawerComponent:React.FC<Props> = ({isOpen,setIsopen,record})=> {
    const [treeData,setTreeData] = useState<TreeDataNode[]>([])
    const [selectedKeys,setSelectedKeys] = useState<any>([])
    const [checkedKeys,setCheckedKeys] = useState<any>([])
    const treeRef = useRef<any>(null)
    const getPermissionListApi = async ()=>{
        const res = await permissionListApi()
        const arr = res.data.data.list.map(item=>{
            return {
                title:item.name,
                key:item._id,
                children:item.children?.map(v=>{
                    return {
                        title:v.name,
                        key:v._id
                    }
                })
            }
        })
        setTreeData(arr)
    }
    const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
      setSelectedKeys(selectedKeys)
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
      setCheckedKeys(checkedKeys)
    }
    const Submit = async()=>{
        const res = await roleEditApi({
            id:record._id,
            permission:treeRef.current?.props.checkedKeys,
            name:record.name,
        })
        if(res.data.code === 200){
            message.success('分配成功')
            getPermissionListApi()
            setIsopen(false)
        }else{
            message.error(res.data.msg)
        }
    }
    useEffect(()=>{
        getPermissionListApi()
        
    },[])
    useEffect(()=>{
        if(record.permission){
            setSelectedKeys(record.permission)
            setCheckedKeys(record.permission)
        }
    },[record])
    return (
        <Drawer
            title="分配角色"
            placement="right"
            open={isOpen}
            onClose={() => {
                setIsopen(false)
            }}
        >
            <Tree
                ref={treeRef}
                checkable
                selectable
                defaultExpandAll
                selectedKeys={selectedKeys}
                checkedKeys={checkedKeys}
                treeData={treeData}
                onCheck={onCheck}
                onSelect={onSelect}

            />
            <Button type='primary' onClick={()=>Submit()}>确认</Button>
        </Drawer>
            
    )
}


export default DrawerComponent