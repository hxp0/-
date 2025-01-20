import React from 'react'
import type { SelectProps } from 'antd'
import { Form, Input, message, Modal, Select } from 'antd'
import { StudentGroupListItemType } from '../../../../services/type'
import type { RootState } from '../../../../store'
import { useSelector } from 'react-redux'
import { StudentGroupCreateApi } from '../../../../services'

type FieldType = Omit<StudentGroupListItemType, '_id' | '__v'>

interface Props {
  open: boolean
  changeOpen: (value: boolean)=>void
  refresh: ()=>void
}

const options: SelectProps['options'] = [];
for (let i = 1; i < 36; i++) {
  options.push({
    label: i,
    value: i,
  });
}

const Pop: React.FC<Props> = ({ open, changeOpen, refresh }) => {
  const [form] = Form.useForm()
  const info = useSelector((state: RootState)=>state.info.info)

  const onOk = ()=>{
    form.submit()
  }
  
  return (
    <>
      <Modal title="新建班级" open={open} onOk={onOk} onCancel={()=>changeOpen(false)}>
        <Form
          // name="basic"
          form={form}
          layout='vertical'
          onFinish={async(values)=>{
            try{
              const res = await StudentGroupCreateApi({
                ...values,
                creator: info.username,
                createTime: new Date().getTime()
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
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入班级名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="科目"
            name="classify"
            rules={[{ required: true, message: '请输入科目' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="老师"
            name="teacher"
            rules={[{ required: true, message: '请输入教师' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="学生"
            name='students'
            rules={[{ required: true, message: '请选择学生！' }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="请选择班级成员"
              // onChange={handleChange}
              options={options}
            />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};
export default Pop;