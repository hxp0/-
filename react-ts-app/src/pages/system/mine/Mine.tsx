import React,{ useEffect, useState } from 'react'
import style from './Mine.module.scss'
import {  Button, Descriptions,Image, Modal,Upload, Form, Input, message,Select, InputNumber   } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { DescriptionsProps,UploadProps,GetProp   } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import type { RootState,AppDispatch } from '../../../store'
import { uploadAvatarApi,updateUserInfoApi } from '../../../services'
import { getInfo } from '../../../store/models/info'
type FieldType = {
  username: string;
  password?: string;
  avator?: string;
  sex?: string;
  age?: number;
  email?: string;

}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
type UploadRequestOption = Parameters<GetProp<UploadProps, 'customRequest'>>[0]



const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式的文件!');
  }
  const isLt500Kb = file.size / 1024 < 500;
  if (!isLt500Kb) {
    message.error('只能上传小于 500kb 的文件!');
  }
  return isJpgOrPng && isLt500Kb;
}


const Mine: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.info.info)
  const dispatch = useDispatch<AppDispatch>()
  const [imgUrl,setImgUrl] = useState<string>()
  const [form] = Form.useForm()
  const[show,setShow] = useState<boolean>(false)
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名称',
      children: userInfo.username,
    },
    {
      key: '2',
      label: '性别',
      children: userInfo.sex,
    },
    {
      key: '3',
      label: '年龄',
      children: userInfo.age,
    },
    {
      key: '4',
      label: '邮箱',
      children: userInfo.email,
    }
  ]

  const handleOk = () => {
    form.validateFields()
    .then(async(values:FieldType)=>{
      const res = await updateUserInfoApi(values)
      if(res.data.code === 200){
        message.success('更新成功')
        dispatch(getInfo())
        setShow(false)
      }else{
        message.error('更新失败')
      }
      
    })
    
  };
  const upload = async (options: UploadRequestOption) => {
    try {
      // 上传的原始文件
      // console.log(options.file)
      // 创建 FormData 存文件参数
      const formData = new FormData()
      formData.append('avatar', options.file)
      const res = await uploadAvatarApi(formData)
      setImgUrl(res.data.data.url)
      form.setFieldValue('avator', res.data.data.url)
    } catch (error) {
      message.error('上传失败！')
    }
  }

  useEffect(()=>{
    setImgUrl(userInfo.avator)
  },[form,userInfo])
  return (
    <div className={style.mine}>
      <Descriptions 
        title={<Image src={userInfo.avator} width={100} height={100} />} 
        items={items} 
      />
      <Button type='primary' style={{marginTop:20}} onClick={()=>setShow(true)}>编辑个人信息</Button>
      <Modal  open={show} onOk={handleOk} onCancel={()=>setShow(false)}>
      <Form
          name="basic"
          form={form}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{
            username: userInfo.username,
            sex: userInfo.sex,
            age: userInfo.age,
            email: userInfo.email,
            avator: userInfo.avator
          }}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请选择性别!' }]}
          >
             <Select placeholder="请选择性别">
                <Select.Option value={1}>男</Select.Option>
                <Select.Option value={0}>女</Select.Option>
              </Select>
          </Form.Item>
          <Form.Item 
            label="头像" 
            // getValueFromEvent={normFile} 
          >
            <Upload 
              name="avator"
              showUploadList={false}
              customRequest={upload}
              beforeUpload={beforeUpload}
              listType="picture-card"
            >
              {imgUrl ? (
                <Image src={imgUrl} width={100} height={100} preview={false}/>
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            name="avator"
            rules={[{ required: true, message: '请上传头像!' }]}
            valuePropName={imgUrl}
            noStyle
          >
          </Form.Item>
          <Form.Item<FieldType>
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请选择性别!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Mine;