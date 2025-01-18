import React, { useEffect,useState } from 'react'
import { questionListApi } from '../../../../services'
import { Table,Modal } from 'antd';
import type { TableColumnsType } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store'
type Props = {
    classify: string
    isDilog: boolean
    setIsDilog: (val: boolean)=>void
    setQuestionList: (list:DataType[])=>void
}
interface DataType {
    key: React.Key;
    question: string;
    type: string;
    name: string;
    answer: string;
  }
  
  const columns: TableColumnsType<DataType> = [
    {
      title: '题目',
      dataIndex: 'question',
      ellipsis: true,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '题型',
      dataIndex: 'name',
    },
    {
      title: '答案',
      dataIndex: 'answer',
    },
  ]
  
const TableComponent:React.FC<Props> = ({classify,setQuestionList,isDilog,setIsDilog})=> {
    const [list,setList] = useState([])
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const questionType = useSelector((state:RootState)=>state.questionType.questionType)
    const getQuestionList = async()=>{
        const res = await questionListApi( classify )
        const arr = res.data.data.list.map((item:any)=>{
            return {
                ...item,
                name: questionType.find(v=>v.value === Number(item.type))?.name
            }
        })
        setList(arr)
    }
    useEffect(()=>{
        getQuestionList()
    },[classify])
    return (
        <Modal
        title="试题列表"
        open={isDilog}
        onCancel={()=>setIsDilog(false)}
        onOk={()=>{
            setIsDilog(false)
            setQuestionList(selectedRows)
        }}
        width={800}
      >
            <Table<DataType>
                rowSelection={{ 
                    type: 'checkbox',
                    onChange(selectedRowKeys, selectedRows, info){
                        setSelectedRows(selectedRows)
                    }
                }}
                rowKey='_id'
                columns={columns}
                dataSource={list}
            />
        </Modal>
    );
}


export default TableComponent