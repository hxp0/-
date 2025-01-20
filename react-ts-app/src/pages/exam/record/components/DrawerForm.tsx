import React, { useEffect, useState, useMemo } from 'react'
import { Drawer,Button } from 'antd'
import { getRecordDetailApi,questionTypeApi } from '../../../../services/index'
import type { questionTypeRes, RecordDetailType, RecordQuestionDetail } from '../../../../services/type'

interface Props {
  open:boolean
  setOpen:(val:boolean)=>void
  id:string
}


const DrawerForm: React.FC<Props> = (props) => {
  const {open,setOpen,id} = props
  const [data,setData] = useState<RecordDetailType>({} as RecordDetailType)
  const [questionType,setQuestionType] = useState<questionTypeRes[]>([])
  const charCode = ['A','B','C','D']

  const getDetailRecord = async()=>{
    const res = await getRecordDetailApi(id)
    if(res.data.code!==200) return
    console.log(res.data.data.questionsList)
    setData(res.data.data)
  }
  const getQuestionType = async()=>{
    const res = await questionTypeApi()
    if(res.data.code!==200) return
    console.log(res.data.data.list)
    setQuestionType(res.data.data.list)
  }

  const questionList = useMemo(()=>{
    let arr:(questionTypeRes & {list:RecordQuestionDetail[]})[] = questionType.map(item=>{
      return {
          ...item,
          list:[]
      }
    })
    if(!data.questionsList) return arr
    data.questionsList.forEach((item)=>{
      if(item === null) return
      const index = arr.findIndex((v)=>v.value === Number(item.type))
      if(index>-1){
        arr[index].list.push(item)
      }
    })
    return arr
},[data])


  useEffect(()=>{
    getDetailRecord()
    getQuestionType()
  },[id])


  return (
    <Drawer
      title={<div style={{display:'flex',justifyContent:'space-between'}}>
              <h4>试卷预览</h4>
              <div>
                  <Button >导出PDF</Button>
                  <Button type='primary' style={{marginLeft:15}}>OK</Button>
              </div>   
        </div>}
      open={open}
      placement="right"
      onClose={() => setOpen(false)}
      width={600}
    >
      <h2 style={{ textAlign:'center' }}>{data.name}</h2>
      <p style={{textAlign:'center',margin: 15}}>科目：{data.classify}</p>
      <div>
        {
          questionList.map((item) => {
            return (
              <div key={item._id} style={{fontSize:16}}>
                  {item.list.length>0 && <h4 style={{color:'#1890ff'}}>{item.name}</h4>}
                  {item.list.map((v:any,i:number)=>{
                    return (
                      <div key={i}>
                          <h5 style={{marginTop:15,fontWeight:'normal',fontSize:16}}>{i+1}.{v.question}</h5>
                          {v.options.map((val:any,index:number)=>{
                              return <p key={index} style={{margin:15}}>{charCode[index]}.{val}</p>
                          })}
                      </div>
                    )
                  })}
              </div>
            )
          })
        }
      </div> 

    </Drawer>
  )
}

export default DrawerForm