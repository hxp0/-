import React, { useEffect, useState } from 'react'
import style from './ItemBank.module.scss'
import { getQuestionApi } from '../../../services'
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { QuestionListItem } from '../../../services/type'
import { useNavigate } from 'react-router-dom'


const columns: ProColumns<QuestionListItem>[] = [
  {
    title: '试题列表',
    width: 150,
    ellipsis: true,
    dataIndex: 'question',
  },
  {
    title: '分类',
    width: 80,
    align:'center',
    dataIndex: 'classify',
  },
  {
    title: '题型',
    width: 60,
    dataIndex: 'type',
    align:'center',
    valueEnum: {
      '1': { text: '单选题' },
      '2': { text: '多选题' },
      '3': { text: '判断题' },
      '4': { text: '填空题' },
    },
  },
  {
    title: '创建时间',
    width: 80,
    hideInSearch: true,
    align:'center',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '操作',
    width: 120,
    align:'center',
    hideInSearch: true,
    dataIndex: 'operate',
    render:() =>
      <>
        <Button type='primary' style={{marginRight: '5px'}}>编辑</Button>
        <Button type='primary' danger style={{marginRight: '5px'}}>删除</Button>
        <Button type='default'>试题详情</Button>
      </>
  },
];

const ItemBank: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={style.itemBank}>
      <Button type='primary' className={style.btn} onClick={()=>navigate('/question/create-item')}>添加试题</Button>
      <ProTable<QuestionListItem>
        columns={columns}
        request={async(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口
          console.log(sorter, filter)
          const res = await getQuestionApi({ page: params.current!, pagesize: params.pageSize! })
          return {
            data: res.data.data?.list,
            total: res.data.data?.total,
            success: true
          }
        }}
        rowKey="_id"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        dateFormatter="string"
        headerTitle="试题库"
      />
    </div>
  );
};
export default ItemBank;