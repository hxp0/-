import React,{ useEffect, useMemo, useRef, useState } from 'react'
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio
} from '@ant-design/pro-components'
import { Button , message,InputNumber,Table  } from 'antd'
import { classifyListApi,examCreateApi,questionListApi } from '../../../services'
import TableComponent from './components/TableComponent'
import { useNavigate } from 'react-router-dom';


const AddPaper =  () => {
  const navigate = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const numRef = useRef<HTMLInputElement>(null)
  const [formInfo,setFormInfo] = useState({
      name: '',
      remark: '',
      classify: '',
      radio: '选择组卷',
    })
  const [isDilog,setIsDilog] = useState(false)
  const [classifyList,setClassifyList] = useState([])
  const [questionList,setQuestionList] = useState<any>([])
  
  const getClassifyList = async()=>{
    const res = await classifyListApi()
    setClassifyList(res.data.data.list)
  }
  const classify = useMemo(()=>{
    const str = classifyList.find((v:any)=>v._id === formRef.current?.getFieldsValue().classify) || {name:''}
    return str.name
  },[formRef.current?.getFieldsValue().classify])
  const onQuestionList = async()=>{
    const res = await questionListApi(classify)
    const i = res.data.data.total > numRef.current!.value ? numRef.current?.value : res.data.data.list.length
    const arr:any = []
    while (arr.length < i) {
      const cur = Math.floor(Math.random() * i);
      if(!arr.find(v=>v._id === res.data.data.list[cur]._id)){
        arr.push(res.data.data.list[cur])
      }
    }
    setQuestionList(arr)
  }
  useEffect(()=>{
    getClassifyList()
  },[])
  return (<>
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          const res = await examCreateApi({
            name: formInfo.name,
            classify,
            questions:questionList.map((v:any)=>v._id)
          })
          console.log(res)
          if(res.data.code === 200){
            message.success('提交成功')
            navigate('/paper/paper-bank')
          }
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="试卷基础信息"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue())
            setFormInfo({
            ...formInfo,
            ...formRef.current?.getFieldsValue()
            })
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="试卷名称"
            width="md"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="remark"
            label="备注"
            width="lg"
            placeholder="请输入备注"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="选择组卷方式&科目"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            setFormInfo({
              ...formInfo,
              ...formRef.current?.getFieldsValue(),
            })
            return true;
          }}
          onChange={async () => {
            if(formRef.current?.getFieldsValue().radio !== formInfo.radio){
              setFormInfo({
                ...formInfo,
               radio:formRef.current?.getFieldsValue().radio,
              })
            }
            return true;
          }}

        >
          <ProForm.Group>
            <ProFormSelect
                name="classify"
                label="科目"
                rules={[
                  {
                    required: true,
                  },
                ]}
                width={300}
                params={{
                  allowClear: true,
                  mode: 'multiple',
                }}
                request={async()=>{
                  const res = await classifyListApi()
                  const arr = res.data.data.list.map((v:any)=>{
                    return {
                      value:v._id,
                      label:v.name,
                    }
                  })
                  return arr
                }}
              />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormRadio.Group
              name="radio"
              label="组卷方式"
              radioType="button"
              initialValue={formInfo.radio}
              onMetaChange={(value)=>{
                console.log(value)
                // setEethod(value)
              }}
              options={[
                {
                  label: '选择组卷',
                  value: '选择组卷',
                },
                {
                  label: '随机组卷',
                  value: '随机组卷'
                }
              ]}
            > 
            </ProFormRadio.Group>
          </ProForm.Group>
          <ProForm.Group style={{marginBottom:20}}>
           <div>
                {
                 formInfo.radio === '选择组卷' ?
                  <Button type='primary' onClick={()=>setIsDilog(true)}>选择试题</Button>
                  :
                 <>
                 <span>试题数量:</span>
                  <InputNumber  max={10} ref={numRef} />
                  <Button type='primary' onClick={onQuestionList}>查询试题</Button>
                </>
              }
                
            </div>
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="发布实验"
        >
          <div>
            <p>试卷名称：{formInfo.name}</p>
            <p>组卷方式：{formInfo.radio}</p>
            <p>科目：{classify}</p>
            <p>备注：{formInfo.remark}</p>
          </div>
          <h2>试题列表</h2>
          <Table 
            columns={[
              {
                title: '科目',
                dataIndex: 'classify'
              },
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
            ]}
            dataSource={questionList}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>  
      {
        isDilog && <TableComponent classify={classify} setQuestionList={setQuestionList} isDilog={isDilog} setIsDilog={setIsDilog}/>
      }
    </>
  )
}

export default AddPaper
