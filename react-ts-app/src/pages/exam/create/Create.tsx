import React from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import { getUserApi, getClassApi, getSubjectApi } from '../../../services';



const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Create: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [options,setOptions] = useState<{value:string}[]>([])
  const [subject,setSubject] = useState<{value:string}[]>([])
  const [examId,setExamId] = useState<{value:string}[]>([])

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

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('提交成功');
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
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
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

          {/* 第二部 */}
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="设置参数"
          stepProps={{
            description: '这里填入运维参数',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="迁移类型"
            width="lg"
            options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
          />
          <ProForm.Group>
            <ProFormText name="dbname" label="业务 DB 用户名" />
            <ProFormDatePicker
              name="datetime"
              label="记录保存时间"
              width="sm"
            />
            <ProFormCheckbox.Group
              name="checkbox"
              label="迁移类型"
              options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="发布实验"
          stepProps={{
            description: '这里填入发布判断',
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="部署单元"
            rules={[
              {
                required: true,
              },
            ]}
            options={['部署单元1', '部署单元2', '部署单元3']}
          />
          <ProFormSelect
            label="部署分组策略"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
          <ProFormSelect
            label="Pod 调度策略"
            name="remark2"
            initialValue="2"
            options={[
              {
                value: '1',
                label: '策略一',
              },
              { value: '2', label: '策略二' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};

export default Create

