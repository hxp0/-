import React, { useEffect,useMemo,useState } from 'react'
import { Drawer,Button } from 'antd'
import { detailExamApi,questionTypeApi } from '../../../../services'

type Props = {
    open:boolean
    loading:boolean
    setOpen:(val:boolean)=>void
    id:string
}
type questionItemType = {
    name:string
    _id:string
    classify:string
    __v:number
    createTime:string
    type:string
    options:string[]
}
type detailExamType = {
    name:string
    classify:string
    __v:number
    createTime:string
    creator:string
    _id:string
    questions:questionItemType[]
}
type questionTypeRes = {
    name:string
    value:number
    _id:string
}

const DrawerComponent:React.FC<Props> = (props)=> {
    const {open,loading,setOpen,id} = props
    const [data,setData] = useState<detailExamType>({} as detailExamType)
    const [questionType,setQuestionType] = useState<questionTypeRes[]>([])
    // const pdfRef = useRef<any>(null)
    const getDetailExam = async()=>{
        const res = await detailExamApi(id)
        if(res.data.code!==200) return
        setData(res.data.data)
    }
    const getQuestionType = async()=>{
        const res = await questionTypeApi()
        setQuestionType(res.data.data.list)
    }
    const questionList = useMemo(()=>{
        let arr:any[] = questionType.map(item=>{
            return {
                ...item,
                list:[]
            }
        })
        if(!data.questions) return arr
        data.questions.forEach((item)=>{
            if(item === null) return
            const index = arr.findIndex((v)=>v.value === Number(item.type))
            if(index>-1){
                arr[index].list.push(item)
            }
        })
        return arr
    },[data])
    console.log(questionList)
    useEffect(()=>{
        getDetailExam()
        getQuestionType()
    },[id])

   
  return (
      <Drawer
        closable
        destroyOnClose
        title={<div style={{display:'flex',justifyContent:'space-between'}}>
                <h4>试卷预览</h4>
                <div>
                    <Button >导出PDF</Button>
                    <Button type='primary' style={{marginLeft:15}}>OK</Button>
                </div>   
        </div>}
        placement="right"
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
        width={600}
      >
        {/* <Document ref={pdfRef}>
          <Page size="A4" style={{ padding: '1cm' }}> */}
            <h2 style={{textAlign:'center'}}>{data.name}</h2>
            <p style={{textAlign:'center',margin: 15}}>科目：{data.classify}</p>
            <div>
                {
                    questionList.map(item=>{
                        return (
                            <div key={item._id} style={{fontSize:16}}>
                                {item.list.length>0 && <h4 style={{color:'#1890ff'}}>{item.name}</h4>}
                                {item.list.map((v:any,i:number)=>{
                                    return (
                                        <div key={v._id}>
                                            <h5 style={{marginTop:15,fontWeight:'normal',fontSize:16}}>{i+1}.{v.question}</h5>
                                            {v.options.map((val:any,index:number)=>{
                                                return <p key={index} style={{margin:15}}>{String.fromCharCode(65+index)}.{val}</p>
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
          {/* </Page>
        </Document> */}
        
      </Drawer>
  );
};


export default DrawerComponent