import React, { useState, useEffect, useRef } from 'react'
import style from './ItemBank.module.scss'
import { getQuestionApi, getQuestionTypeApi, delQuestionApi  } from '../../../services'
import { ProTable } from '@ant-design/pro-components'
import type { ProColumns, ActionType } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import type { QuestionListItem } from '../../../services/type'
import { useNavigate } from 'react-router-dom'
import { ConstantFn } from './constant'
import Pop from './components/Pop'
import DrawerCom from './components/DrawerCom'

const ItemBank: React.FC = () => {
  const navigate = useNavigate()
  const formRef = useRef<ActionType>()
  let columns:ProColumns<QuestionListItem>[] = []
  const [classify, setClassify] = useState<{} | null>(null)
  const [types, setTypes] = useState<Map<string, { text: string; }> | null>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [editRow, setEditRow] = useState<QuestionListItem>()
  const drawerRef = useRef<any>(null)


  const getData = async()=>{
    const classifyArr:string[] = []
    const typeArr:{ label:{text: string}, value: string}[] = []
    const res = await Promise.all([getQuestionApi(), getQuestionTypeApi()])
    // console.log(res)
    // 科目 eg:数学
    res[0].data.data.list.map((item) =>{
      const index = classifyArr.findIndex(it => it === item.classify)
      if( index === -1 ){
        classifyArr.push(item.classify)
      }
    })
    const obj = classifyArr.reduce((obj:any, current: string) => {
      obj[current] = current;
      return obj;
    }, {})
    setClassify(obj)
    // 题目类型 eg:单选
    res[1].data.data.list.map(item=>{
      typeArr.push({
        label:{text: item.name},
        value: item.value + ''
      })
    })
    const types = new Map( typeArr.map(item => [item.value, item.label]))
    setTypes(types)
  }
  
  useEffect(()=>{
    getData()
  }, [])

  const delFn = ( row: QuestionListItem ) =>{
    const delData = async( id: string ) =>{
      const res = await delQuestionApi({ id } )
      console.log(res.data.code)
      formRef.current?.reload()
      message.success('删除成功')
    }
    delData( row._id )
  } 
  const editFn = ( row: QuestionListItem) =>{
    setEditRow(row)
    setModalVisible(true)
  }
  const showDrawer = (  row: QuestionListItem ) =>{
    setEditRow(row)
    if( drawerRef.current ){
      drawerRef.current.showLargeDrawer()
    }
  }

  if( types && classify ){
    columns = ConstantFn({ editFn, delFn, showDrawer, types, classify })
  }

  return (
    <div className={style.itemBank}>
      <Button type='primary' className={style.btn} onClick={()=>navigate('/question/create-item')}>添加试题</Button>
      <ProTable<QuestionListItem>
        columns={columns}
        actionRef={formRef}
        request={async( params ) => {
          // 表单搜索项会从 params 传入，传递给后端接口
          const { current, pageSize, ...other } = params
          // console.log(params)
          const res = await getQuestionApi({
            page: current!,
            pagesize: pageSize!,
            ...other
          })
          return {
            data: res.data.data?.list,
            total: res.data.data?.total,
            success: true
          }
        }}
        rowKey="_id"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        dateFormatter="string"
        headerTitle="试题库"
      />
      <Pop
        visible={modalVisible}
        setvisible={setModalVisible}
        types={types}
        classify={classify}
        reload={()=>formRef.current!.reload()}
        editRow={editRow!}
      />
      <DrawerCom ref={drawerRef} editRow={editRow}/>
    </div>
  );
};
export default ItemBank;