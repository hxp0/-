import type { ProColumns } from '@ant-design/pro-components'
import type { QuestionListItem } from '../../../services/type'
import { Button } from 'antd'

interface Params {
  editFn: (row: QuestionListItem ) => void
  delFn: (row: QuestionListItem ) => void
  showDrawer: (row: QuestionListItem ) => void
  types: Map<string, { text: string; }>
  classify: {}
}

export const ConstantFn = ({ editFn, delFn, showDrawer, types, classify }: Params) => {
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
      valueType: 'select',
      valueEnum: classify
    },
    {
      title: '题型',
      width: 60,
      dataIndex: 'type',
      align:'center',
      valueType: 'select',
      valueEnum: types
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
      render:( _ , record ) =>
        <>
          <Button size='small' type='primary' style={{marginRight: '5px'}} onClick={()=>editFn(record)}>编辑</Button>
          <Button size='small' type='primary' danger style={{marginRight: '5px'}} onClick={()=>delFn(record)}>删除</Button>
          <Button size='small' type='default'  onClick={()=>showDrawer(record)}>试题详情</Button>
        </>
    },
  ];
  return columns
}