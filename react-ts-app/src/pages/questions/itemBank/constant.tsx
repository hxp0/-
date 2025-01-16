import type { ProColumns } from '@ant-design/pro-components'
import type { QuestionListItem } from '../../../services/type'
import { Button } from 'antd'
import { getQuestionApi, getQuestionTypeApi } from '../../../services'

interface Params {
  editFn: (row: QuestionListItem ) => void
}

export const ConstantFn = ({ editFn }: Params) => {
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
      request: async()=>{
        const res = await getQuestionApi()
        const arr:{label: string, value: string}[] = []
        res.data.data.list.map((item) =>{
          const index = arr.findIndex(it => it.value === item.classify)
          if( index === -1 ){
            arr.push({
              label: item.classify,
              value: item.classify
            })
          }
        })
        return arr
      }
    },
    {
      title: '题型',
      width: 60,
      dataIndex: 'type',
      align:'center',
      valueType: 'select',
      request: async()=>{
        const arr:{ label: string, value: string}[] = []
        const res = await getQuestionTypeApi()
        // console.log(res.data.data.list)
        res.data.data.list.map(item=>{
          arr.push({
            label: item.name,
            value: item.value + ''
          })
        })
        return arr
      }
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
          <Button type='primary' style={{marginRight: '5px'}} onClick={()=>editFn(record)}>编辑</Button>
          <Button type='primary' danger style={{marginRight: '5px'}}>删除</Button>
          <Button type='default'>试题详情</Button>
        </>
    },
  ];
  return columns
}