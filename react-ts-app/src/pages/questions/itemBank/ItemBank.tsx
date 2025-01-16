import React, { useState } from 'react'
import style from './ItemBank.module.scss'
import { getQuestionApi } from '../../../services'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import type { QuestionListItem } from '../../../services/type'
import { useNavigate } from 'react-router-dom'
import { ConstantFn } from './constant'
import Pop from './components/Pop'

const ItemBank: React.FC = () => {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [editRow, setEditRow] = useState<QuestionListItem>()

  const editFn = ( row: QuestionListItem ) =>{
    console.log(row)
    setEditRow(row)
    setModalVisible(true)
  }

  const columns = ConstantFn({ editFn })

  return (
    <div className={style.itemBank}>
      <Button type='primary' className={style.btn} onClick={()=>navigate('/question/create-item')}>添加试题</Button>
      <ProTable<QuestionListItem>
        columns={columns}
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
      <Pop visible={modalVisible} setvisible={setModalVisible} editRow={editRow!}/>
    </div>
  );
};
export default ItemBank;