import React, { useEffect } from 'react'
import { Modal, Form, message, Button } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { DataItem } from '../constants';
import { modalColumns } from '../constants';
import { createUserApi, updateUserApi, delUserApi } from '../../../../services/index'
import type { UserListType } from '../../../../services/type'


type Props = {
  visible: boolean,
  setVisible: (visible: boolean) => void
  refresh: () => void
  editRecord: UserListType | null
  delID: string
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}



const CreateUserModal: React.FC<Props> = (props) => {
  const [form] = Form.useForm()
  useEffect(() => {
    // 如果是编辑  反显数据
    if(props.editRecord) {
      form.setFieldsValue({
        ...props.editRecord
      })
    }
  },[props.editRecord])

  useEffect(() => {
    if(!props.visible) {
      // 重置表单
      form.resetFields()
    }
  },[props.visible])


  // 新增用户函数
  const createUser = async (values: DataItem) => {
    const res = await createUserApi(values)
      if(res.data.code === 200) {
        props.setVisible(false)
        message.success('创建成功')
        props.refresh()
      }else {
        message.error(res.data.msg)
      }
  }
  // 编辑用户函数
  const updateUser = async (values: DataItem) => {
    console.log(values)
    const res = await updateUserApi({...values, id: props.editRecord!._id})
      if(res.data.code === 200) {
        props.setVisible(false)
        message.success('编辑成功')
        props.refresh()
      }else {
        message.error(res.data.msg)
      }
  }

  // 删除用户函数
  const delUser = async (id: string) => {
    const res = await delUserApi(id)
      if(res.data.code === 200) {
        props.setIsModalOpen(false)
        message.success('删除成功')
        props.refresh()
      }else {
        message.error(res.data.msg)
      }
  }




  return (
    <>
    {/* 新增和编辑弹窗 */}
      <Modal
        title={props.editRecord? '编辑用户' : '创建用户'}
        open={props.visible}
        onCancel={() => props.setVisible(false)}
        onOk={() => { 
          form.submit()
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          onFinish={async (values: DataItem) => {
            // 编辑信息存在  调用更新接口
            if(props.editRecord) {
              updateUser(values)
            } else {
              createUser(values)
            }
          }}
        >
          <BetaSchemaForm<DataItem>
            layoutType="Embed"
            columns={modalColumns}
          />
        </Form>
      </Modal>
      {/* 删除弹窗 */}
      <Modal 
        title="警告" 
        open={props.isModalOpen} 
        onOk={() => delUser(props.delID)} 
        onCancel={() => props.setIsModalOpen(false)}
      >
        <p>确定删除吗？</p> 
      </Modal>
    </>
  )
}

export default CreateUserModal