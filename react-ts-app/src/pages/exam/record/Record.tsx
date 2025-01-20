import React, { useRef,useState } from 'react'
import { getRecordApi, getClassApi, getSubjectApi } from '../../../services';
import type { RecordListType } from '../../../services/type';

import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Modal, message } from 'antd';
// import classNames from 'classnames';
import { delRecordApi } from '../../../services/index';
import DrawerForm from './components/DrawerForm';
const record:React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('')


  const valueEnum = new Map([
    [1, {text: '已结束'}],
    [2, {text: '未开始'}],
    [3, {text: '进行中'}]
  ])


  // 删除弹出框
  const handleOk = async (id:string) => {
    const res = await delRecordApi(id)
    if(res.data.code === 200){
      message.success('删除成功')
      setIsModalOpen(false)
      actionRef.current?.reload()
    }else{
      message.error('删除失败')
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<RecordListType>[] = [
    {
      title: '考试名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 80,
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      valueType: 'select',
      search:true,
      request: async () =>{
        const res = await getSubjectApi({
          page:1,
          pagesize:100,
        })
        // console.log(res.data)
        const list = res.data.data.list.map(item => {
          return {
            text:item.name,
            value:item.name
          }
        }).reduce((pre,cur) => {
          if(!pre.find(item => item.value === cur.value)){
            pre.push(cur)
          }
          return pre
        },[] as {text:string,value:string}[])
        return list
        
      }
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      ellipsis: true,
      width: 80,
    },
    {
      title: '创建时间',
      key: 'createTimeSearch',
      dataIndex: 'createTimeSearch',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1]
          }
        }
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      hideInSearch: true,
      ellipsis: true,
      valueType: 'dateTime',
      width: 160,
    },		
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      ellipsis: true
    },
    {
      title: '考试班级',
      dataIndex: 'group',
      search:true,
      valueType: 'select',
      request: async () => {
        const res = await getClassApi({
          page:1,
          pagesize:100,
        })
        const classList = res.data.data.list.map(item => {
          return {
            value:item.name
          }
        }).reduce((pre,cur) => {
          if(!pre.find(item => item.value === cur.value)){
            pre.push(cur)
          }
          return pre
        },[] as {value:string}[])
        return classList
      }
    },	
    {
      title: '开始时间',
      key: 'startTime',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      key: 'endTime',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '考试时间',
      key: 'examTime',
      dataIndex: 'examTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '设置',
      valueType: 'option',
      dataIndex: 'setting',
      key:'setting',
      hideInSearch: true,
      width: 160,
      render: (_,record) => {
        return (
          <Space>
            <Button type="primary" size="small" onClick={() => {
              setId(record._id)
              setOpen(true)
            } }
              >预览试卷</Button>
            <Button type="primary" size="small" disabled={record.status !== 2? true : false} onClick={() => setIsModalOpen(true)}> 删除 </Button>
            <Modal title="警告" open={isModalOpen} onOk={() => handleOk(record._id)} onCancel={handleCancel}>
              <p>确定删除吗？</p> 
            </Modal>
          </Space>
        )
      }
    },
    {
      title: '操作',
      // valueType: 'option',
      key: 'operate',
      // dataIndex: 'operate',
      hideInSearch: true,
      width: 100,
      render: (text,record,_,action) => {
        return record.status !== 2? 
        <Button type="primary" size="small"> 成绩分析 </Button>
         : 
        <a
          key="editable"
          onClick={() => {
            console.log(record,action)
            action?.startEditable?.(record._id);
          }}
        >
          <Button type="primary" size="small">编辑</Button>
        </a>
      },
    },
  ];

  return (
    <>
      <ProTable<RecordListType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          // console.log(params,sorter,filter)
          const { current , pageSize,...others } = params
          const res = await getRecordApi({ 
            page:current!,
            pagesize:pageSize!,
            ...others 
          })
          return {
            data: res.data.data.list,
            total: res.data.data.total,
            success: true,
          }
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="_id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showQuickJumper: true,
        }}
        dateFormatter="string"
        headerTitle="考试记录"
        scroll={{ x: 1300 }}
        
      />
      {open && <DrawerForm open={open} setOpen={setOpen} id={id}/>}
    </>
  );
};
export default record;