import React, { useEffect, useRef, useState } from 'react'
import { getUserApi } from '../../../services/index'
import type { UserListType } from '../../../services/type'
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType} from '@ant-design/pro-components';
import { ProTable, ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import CreateUserModal from './components/CreateUserModal'
import { getColumns } from './constants'



const UserManage: React.FC =  () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false)
  const [editRecord, setEditRecord] = useState<UserListType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [delID, setDelID] = useState('')

  const columns = getColumns({
    onClickEdit: record => {
      setVisible(true)
      setEditRecord(record)
    },
    onClickDel: record => {
      setIsModalOpen(true)
      setDelID(record._id)
      console.log(record)
    },
    onClickRole: record => {
      console.log(record)
      setIsModalOpen(true)
      
    }
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
          console.log(params)
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
          onChange(value) {
            console.log('value: ', value);
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
        open={isModalOpen}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onFinish={async (values) => {
          console.log(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormSelect
          width="md"
          name="role"
          mode='multiple'
          placeholder="请选择用户角色"
          rules={[{ required: true,}]}
          request={async () => {
            const res = await 
          }}
        />
      </ModalForm>



    </>
  );
};


export default UserManage
