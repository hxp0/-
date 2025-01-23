import React, { useEffect, useRef, useState } from 'react'
import { getUserApi, roleListApi, updateUserApi } from '../../../services/index'
import type { UserListType } from '../../../services/type'
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProFormInstance} from '@ant-design/pro-components';
import { ProTable, ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import CreateUserModal from './components/createUser'
import { getColumns } from './constants'


const User: React.FC =  () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false)
  const [editRecord, setEditRecord] = useState<UserListType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [delID, setDelID] = useState('')
  const formRef = useRef<ProFormInstance>()
  const [roleOpen, setRoleOpen] = useState<boolean>(false)

  const columns = getColumns({
    onClickRole: record => {
      setEditRecord(record)
      setRoleOpen(true)
    },
    onClickEdit: record => {
      setVisible(true)
      setEditRecord(record)
    },
    onClickDel: record => {
      setIsModalOpen(true)
      setDelID(record._id)
    },
  })

  useEffect(() => {
    if(!visible) {
      setEditRecord(null)
    }
  },[visible])



  return (
    <>
      {/* 列表渲染数据 */}
      <ProTable<UserListType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { current, pageSize, ...others } = params
          const res = await getUserApi({ 
            page:current!,
            pagesize:pageSize!,
            ...others
          })
          return {
            data: res.data.data.list,
            success: true,
            total: res.data.data.total,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          defaultPageSize:5,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }}
        dateFormatter="string"
        headerTitle="用户管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setVisible(true)
            }}
            type="primary"
            
          >
            新建
          </Button>
        ]}
      />
      {/* 编辑 删除 新增按钮弹窗 */}
      <CreateUserModal  
        visible={visible} 
        setVisible={setVisible} 
        refresh={() => actionRef.current?.reload()}
        editRecord={editRecord}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        delID={delID}
      />
      <ModalForm
        title="分配角色"
        formRef={formRef}
        open={roleOpen}
        onOpenChange={(roleOpen) => {
          if(roleOpen) {
            formRef.current?.setFieldsValue({
              role: editRecord?.role,
            })
          } else {
            formRef.current?.resetFields()
            setEditRecord(null)
          }
        }}
        modalProps={{
          onCancel: () => setRoleOpen(false),
        }}
        onFinish={async (values) => {
          const res = await updateUserApi({
            ...values,
            id: editRecord!._id,
          })
          if(res.data.code === 200) {
            setRoleOpen(false)
            message.success('提交成功');
            actionRef.current?.reload()
          } else {
            message.error(res.data.msg)
          }
        }}
      >
        <ProFormSelect
          width="md"
          name="role"
          mode='multiple'
          placeholder="请选择用户角色"
          request={async () => {
            const res = await roleListApi()
            // console.log(res.data.data.list)
            return res.data.data.list.map(item => ({
                value: item.value,
                label: item.name,
            }))
          }}
          rules={[{ required: true, message: '请选择角色!' }]}
        />
      </ModalForm>



    </>
  );
};


export default User
