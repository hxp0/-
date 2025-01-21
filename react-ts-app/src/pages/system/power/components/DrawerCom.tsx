import React, { useState, useEffect } from 'react';
import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Select,
  Space
} from 'antd';
import type { permissionListItem } from '../../../../services/type'
import style from '../Power.module.scss'
import { permissionCreateApi, permissionEditApi } from '../../../../services'

interface Props {
  open: boolean
  list: permissionListItem[]
  editRow: permissionListItem | null
  changeOpen: (value: boolean)=>void
  refresh: ()=>void
  changeRow: ( row: null )=>void
}

const DrawerCom: React.FC<Props> = ({ open, changeOpen, list, refresh, editRow, changeRow }) => {
  const [form] = Form.useForm()
  const [optionsArr, setOptionsArr] = useState<{value?: string | boolean | number | undefined, label: string}[]>([])

  useEffect(()=>{
    if( list ){
      const data = list?.map(item=>({
        value: item._id,
        label: item.name
      }))
      // console.log(data)
      setOptionsArr([...data, { value: 0, label: '创建新的一级菜单' }])
    }
  }, [list])

  useEffect(()=>{
    if( editRow ){
      form.setFieldsValue(editRow)
    }
  }, [editRow])

  return (
    <>
      <Drawer
        title={editRow ? "编辑菜单" : "添加菜单" }
        onClose={()=>{
          changeRow(null)
          changeOpen(false)
          form.resetFields()
        }}
        open={open}
        size='large'
        styles={{ body:{overflow: 'hidden'} }}
      >
        <Form
          form={form}
          layout='inline'
          size='middle'
          onFinish={async(values)=>{
            if( editRow ){
              try{
                // console.log(editRow)
                const res = await permissionEditApi({
                  ...values,
                  id: editRow._id
                })
                console.log(res.data)
                if( res.data.code === 200 ){
                  refresh()
                  form.resetFields()
                  changeOpen(false)
                  message.success('编辑成功！')
                }else{
                  message.error(res.data.msg)
                }
              }catch(e){
                console.log(e)
              }
            }else{
              try{
                const res = await permissionCreateApi({...values})
                // console.log(res.data)
                if( res.data.code === 200 ){
                  refresh()
                  form.resetFields()
                  changeOpen(false)
                  message.success('新增菜单成功！')
                }else{
                  message.error(res.data.msg)
                }
              }catch(e){
                console.log(e)
              }
            }
          }}
        >
          { !editRow && <Form.Item
            label="选择菜单等级"
            name='pid'
            rules={[{required: true, message: '请选择菜单等级'}]}
            layout='vertical'
            style={{marginBottom:20}}
          >
            <Select
              style={{ width: 300 }}
              options={ optionsArr }
            />
          </Form.Item>}

          <Form.Item
            label="菜单名称"
            name='name'
            tooltip='最长为24位'
            rules={[{required: true, message: '请输入菜单名称'}]}
            layout='vertical'
          >
            <Input
              style={{ width: 300 }}
              count={{
                show: false,
                max: 24,
              }} 
            />
          </Form.Item>

          { !editRow && <Form.Item
            label="状态"
            name='disabled'
            rules={[{required: true, message: '请选择状态'}]}
            layout='vertical'
            style={{marginBottom:20}}
          >
            <Select
              style={{ width: 300 }}
              options={[
                { value: true, label: '启用' },
                { value: false, label: '禁用' }
              ]}
            />
          </Form.Item>}

          <Form.Item
            label="权限类型"
            name='isBtn'
            layout='vertical'
            rules={[{required: true, message: '请选择权限等级'}]}>
            <Select
              style={{ width: 300 }}
              options={[
                { value: true, label: '按钮' },
                { value: false, label: '页面' }
              ]}
            />
          </Form.Item>

          <Form.Item
            label="路径"
            name='path'
            tooltip='最长为18位'
            rules={[{required: true, message: '请输入菜单路径'}]}
            layout='vertical'
          >
            <Input 
              style={{ width: 300 }}
              count={{
                show: false,
                max: 18,
              }} 
            />
          </Form.Item>

          <Space className={style.btns}>
            <Form.Item wrapperCol={{offset:8}} layout='vertical'>
              <Button htmlType='reset' style={{marginRight:10}}>重置</Button>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};
export default DrawerCom;