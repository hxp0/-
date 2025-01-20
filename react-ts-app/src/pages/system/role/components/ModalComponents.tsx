import React,{useRef} from 'react'
import { message, Modal,Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { roleAddApi } from '../../../../services'
type Props = {
    show:boolean
    setShow:(val:boolean)=>void
    getRoleList:()=>Promise<void>
}
type FieldType = {
  name: string;
  value: string;
}

const ModalComponents:React.FC<Props> = ({show,setShow,getRoleList})=> {
  const form = useRef<any>(null)
  const handleOk = () => {
      form.current?.validateFields()
      .then(async(values:FieldType)=>{
          const res = await roleAddApi(values)
          if(res.data.code === 200){
              message.success('新增成功')
              getRoleList()
              form.current.resetFields()
              setShow(false)
              return
          }
      })
  }
    return (
        <Modal title="新增角色" open={show} onOk={handleOk} onCancel={()=>setShow(false)} width={600}>
           <Form
                ref={form}
                name="basic"
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                
            >
                <Form.Item<FieldType>
                label="角色名称"
                name="name"
                rules={[{ required: true, message: '请输入角色名称' }]}
                >
                <Input />
                </Form.Item>
                <Form.Item<FieldType>
                label="角色关键字"
                name="value"
                rules={[{ required: true, message: '请输入角色关键字' }]}
                >
                <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}


export default ModalComponents