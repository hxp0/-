import React from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { message, Table,  } from 'antd';
import { useRef, useState } from 'react';
import { getUserApi, getClassApi, getSubjectApi, examApi, createRecordApi } from '../../../services';
import { ExamListItemType } from '../../../services/type';
import type { TableColumnsType,  TableProps } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

type createSubjectType = {
  examId: string
  group: string
  name: string
  subject: string
  dateTime:string[]
}

const rowSelection: TableProps<ExamListItemType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ExamListItemType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: ExamListItemType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const Create: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [options,setOptions] = useState<{value:string}[]>([])
  const [subject,setSubject] = useState<{value:string}[]>([])
  const [examId,setExamId] = useState<{value:string}[]>([])
  const [createSubject,setCreateSubject] = useState<createSubjectType>()
  const [data,setData] = useState<ExamListItemType[]>([])
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const navigate = useNavigate()
  const userInfo = useSelector((state:RootState) => state.info.info)

  // 获取班级
  const requestClass = async () => {
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
    setOptions(classList)
    return classList
    
  }
  // 获取科目
  const requestSubject = async () => {
    const res = await getSubjectApi({
      page:1,
      pagesize:100,
    })
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
    setSubject(list)
    return list
  }
  // 获取监考人id
  const requestExamId = async () => {
    const res = await getUserApi({
      page:1,
      pagesize:100,
    })
    const list = res.data.data.list.map(item => {
      return {
        value:item.username
      }
    }).reduce((pre,cur) => {
      if(!pre.find(item => item.value === cur.value)){
        pre.push(cur)
      }
      return pre
    },[] as {value:string}[])
    setExamId(list)
    return list
  }

  // 第二步  表格数据
  const columns: TableColumnsType<ExamListItemType> = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      ellipsis: true
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
    },
    {
      title: '试卷创建人',
      dataIndex: 'creator',
    },
    {
      title: '试卷创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        return dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ]



  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async (values:any) => {
          console.log(values)
          // const res = await createRecordApi({
          //   name:userInfo.username,
          //   classify:values.subject,
          //   examiner:values.examId,
          //   group:values.group,
          //   startTime:values.dateTime[0],
          //   endTime:values.dateTime[1],
          //   examId:values.examId,
          // })
          // console.log(res.data)
          // if(res.data.code === 200){
            message.success('提交成功')
            navigate('/exam/record')
          // }
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="考试基本信息"
          onFinish={async () => {
            const data = formRef.current?.getFieldsValue()
            setCreateSubject(data)
            const res = await examApi({
              classify:formRef.current?.getFieldsValue().subject
            }) 
            const list = res.data.data.list.map(item => {
              return {
                ...item,
                key: item._id
              }  
            })     
            setData(list)
            return true
          }}
        >
          <ProFormText
            name="name"
            label="考试名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormDateTimeRangePicker 
            name="dateTime" 
            label="考试时间"
            rules={[{ required: true }]}
            
          />
          <ProFormSelect
            name="subject"
            label="科目分类"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请选择"
            rules={[{ required: true }]}
            request={requestSubject}
            options={subject}
          />
          <ProFormSelect
            name="examId"
            label="监考人"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请选择"
            rules={[{ required: true }]}
            request={requestExamId}
            options={examId}
          />
          <ProFormSelect
            name="group"
            label="考试班级"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请选择"
            rules={[{ required: true }]}
            request={requestClass}
            options={options}
          />
        </StepsForm.StepForm>

          {/* 第二步 */}
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="配置试卷"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <Table<ExamListItemType> 
            columns={columns}
            dataSource={data}
            rowSelection={{ type: selectionType, ...rowSelection }}
          />
        </StepsForm.StepForm>
        {/* 第三步 */}
        <StepsForm.StepForm
          name="time"
          title="发布考试"
        >
          <div style={{marginBottom: '20px'}}>
            <p style={{lineHeight: '25px'}}>考试名称: {createSubject?.name}</p>
            <p style={{lineHeight: '25px'}}>科目分类: {createSubject?.subject}</p>
            <p style={{lineHeight: '25px'}}>监考人员: {createSubject?.examId}</p>
            <p style={{lineHeight: '25px'}}>考试班级: {createSubject?.group}</p>
            <p style={{lineHeight: '25px'}}>考试时间: {createSubject?.dateTime.map( v => dayjs(v).format('YYYY-MM-DD HH:mm:ss')) + '\r\n'}</p>
          </div>
          
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default Create

