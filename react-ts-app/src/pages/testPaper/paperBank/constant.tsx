import type { ProColumns } from '@ant-design/pro-components'
import { Button,Modal,message } from 'antd'
import {DeleteExamApi,examApi} from '../../../services'


const ondelete = async(id:string)=>{
    Modal.confirm({
      title: '是否删除',
      content: '删除后无法恢复',
      okText:'确定',
      cancelText:'取消',
      onOk:async()=>{
        const res = await DeleteExamApi(id)
        if(res.data.code===200){
          message.success('删除成功')
        }else{
          message.error('删除失败')
        }
      }
    })
  }

const getColumns = (setOpen:(val:boolean)=>void,setLoading:(val:boolean)=>void,setId:(val:string)=>void) => {
    const columns: ProColumns[] = [
      {
        title: '试卷名称',
        dataIndex: 'name',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        }
      },
      {
        title: '科目类型',
        dataIndex: 'classify',
        editable:false,
        request:async()=>{
          const res = await examApi()
          const arr = res.data.data.list.map((item:any)=>{
            return {
              text:item.classify,
              value:item.classify
            }
          }).reduce((pre:{text:string,value:string}[],cur:{text:string,value:string})=>{
            if(!pre.find((item)=>item.value===cur.value))
              pre.push(cur)
            return pre
          },[])
          return arr
        }
      },
      {
        title: '总分',
        dataIndex: '__v',
        search:false,
        editable:false
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        editable:false,
        request:async()=>{
          const res = await examApi()
          const arr = res.data.data.list.map((item:any)=>{
            return {
              text:item.creator,
              value:item.creator
            }
          }).reduce((pre:{text:string,value:string}[],cur:{text:string,value:string})=>{
            if(!pre.find((item)=>item.value===cur.value))
              pre.push(cur)
            return pre
          },[])
          return arr
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
        search:false,
        editable:false
      },
      {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text,record,_,action) => ([
          <Button
            type='primary'
            key='1'
            onClick={() => {
              action?.startEditable?.(record._id)
            }}
          >编辑</Button>,
          <Button type='default' 
            key='2'
            style={{background:'#ff4d4f',color:'#fff',border:'none'}} 
            onClick={()=>{
              ondelete(record._id)
              action?.reload()
            }}
          >删除</Button>,
          <Button 
            type='default'
            key='3'
            onClick={()=>{
              setOpen(true)
              setLoading(false)
              setId(record._id)
            }}
          >预览试卷</Button>
        ]),
      },
    ];
    return columns
  }
export default getColumns