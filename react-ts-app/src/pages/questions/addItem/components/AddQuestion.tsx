import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  message,
  Select,
} from 'antd'
import style from '../AddItem.module.scss'
import Single from './optionPart/Single'
import Multiple from './optionPart/Multiple'
import Judge from './optionPart/Judge'
import Fill from './optionPart/Fill'
import { createQuestionApi } from '../../../../services'

enum TypesValue {
  single = '1',
  multiple = '2',
  judge = '3',
  fill = '4'
}

interface Props {
  types: {label: String, value: string}[] | undefined
  classify: {label: String, value: string}[] | undefined
}

const AddQuestion: React.FC<Props> = ({ types, classify }) => {
  const [form] = Form.useForm()
  const [typeValue, setTypeValue] = useState('1')
  const [curIndex, setCurIndex] = useState(-1)
  const [answerIndex, setAnswerIndex] = useState<number[]>([])
  const [judgeAnswer, setJudgeAnswer] = useState('')
  // console.log(curIndex)

  const renderType = ()=>{
    if( typeValue === TypesValue.single ){
      return <Single curIndex={curIndex} changeCur={setCurIndex}/>
    }else if( typeValue === TypesValue.multiple ){
      return <Multiple  answerIndex={answerIndex} changeAnswer={pushAnswer}/>
    }else if( typeValue === TypesValue.judge ){
      return <Judge changeJudge={setJudgeAnswer}/>
    }else if( typeValue === TypesValue.fill ){
      return <Fill />
    }
  }

  const changeTypes = (value: string) =>{
    setTypeValue(value)
  }

  useEffect(()=>{
    renderType()
  }, [typeValue])

  const pushAnswer = (index: number)=>{
    const newArr = [...answerIndex]
    const i = answerIndex.findIndex(v=> v === index)
    if( i === -1 ){
      newArr.push(index)
    }else{
      newArr.splice(i, 1)
    }
    setAnswerIndex(newArr)
  }

  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        variant='outlined'
        size='large'
        initialValues={{ variant: 'filled' }}
        onFinish={async(values)=>{
          let params = null
          if( typeValue === TypesValue.single ){
            params = {
              ...values,
              answer: values.options[curIndex]
            }
          }else if( typeValue === TypesValue.multiple ){
            params = {
              ...values,
              answer: JSON.stringify(answerIndex.map(item=>values.options[item]))
            }
          }else if( typeValue === TypesValue.judge ){
            params = {
              ...values,
              options:['对','错'],
              answer: judgeAnswer
            }
            console.log(params)
          }else if( typeValue === TypesValue.fill ){
            params = { ...values, options:[values.answer] }
          }
          const res = await createQuestionApi( params )
          if( res.data.code === 200 ){
            message.success('添加成功！')
            setCurIndex(-1)
            setAnswerIndex([])
            setJudgeAnswer('')
            form.resetFields()
          }
        }}
      >
        <div style={{display:'flex'}}>
          <Form.Item
            label="题型"
            name="type"
            style={{width:300, marginRight:20}}
            rules={[{ required: true, message: '选择题型!' }]}
          >
            <Select
              options={types}
              onChange={(value)=>changeTypes(value)}
            />
          </Form.Item>

          <Form.Item
            label="科目"
            name="classify"
            style={{width:300}}
            rules={[{ required: true, message: '选择科目!' }]}
          >
            <Select options={classify}/>
          </Form.Item>
        </div>

        <Form.Item
          label="题目"
          name="question"
          className={style.question}
          rules={[{ required: true, message: '题目不能为空!' }]}
        >
          <Input.TextArea placeholder='请输入题目'/>
        </Form.Item>

        { renderType() }

        <Form.Item
          label="解析"
          name="desc"
        >
          <Input.TextArea placeholder='请输入'/>
        </Form.Item>

        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
          <Button type="default" htmlType="reset" style={{marginRight:15}}>重置</Button>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddQuestion;