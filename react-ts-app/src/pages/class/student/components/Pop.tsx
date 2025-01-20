import React, { useState, useEffect } from 'react'
import { Form, Input, message, Modal, Select, InputNumber } from 'antd'
import { StudentListItemType } from '../../../../services/type'
import { StudentCreateApi, StudentGroupListApi } from '../../../../services'

type FieldType = Omit<StudentListItemType, '_id' | '__v'>

interface Props {
  open: boolean
  changeOpen: (value: boolean)=>void
  refresh: ()=>void
}

const Pop: React.FC<Props> = ({ open, changeOpen, refresh }) => {
  const [form] = Form.useForm()
  const [list, setList] = useState<{value: string, label: string}[]>([])

  const onOk = ()=>{
    form.submit()
  }

  const getList = async()=>{
    const res = await StudentGroupListApi()
    const optionsArr = res.data.data.list.map(item=>({
      value: item._id,
      label: item.name
    }))
    setList(optionsArr)
  }

  useEffect(()=>{
    getList()
  }, [])
  
  return (
    <>
      <Modal title="新建班级" open={open} onOk={onOk} onCancel={()=>changeOpen(false)}>
        <Form
          form={form}
          layout='vertical'
          onFinish={async(values)=>{
            try{
              const res = await StudentCreateApi({
                ...values,
                className: "67530813e7831b778115c301"
              })
              if( res.data.code === 200 ){
                form.resetFields()
                changeOpen(false)
                refresh()
                message.success('新建成功！')
              }else{
                message.error(res.data.msg)
              }
            }catch(e){
              console.log(e)
            }
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="姓名"
            name="username"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select
              options={[
                { value: '男', label: '男' },
                { value: '女', label: '女' },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="邮箱"
            name='email'
            rules={[{ required: true, message: '请输入邮箱！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="班级"
            name="className"
            rules={[{ required: true, message: '请输入班级!' }]}
          >
              <Select
                options={list}
              />
          </Form.Item>

          <Form.Item<FieldType>
            label="状态"
            name="status"
            rules={[{ required: true, message: '请输入状态!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType>
            label="头像"
            name="avator"
            rules={[{ required: true, message: '请上传头像!' }]}
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};
export default Pop;