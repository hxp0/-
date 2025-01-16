import React, { useRef, useEffect } from 'react'
import {
  ModalForm,
  ProForm,
  ProFormTextArea,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import type { QuestionListItem } from '../../../../services/type'
import { message, Input } from 'antd'


interface Props {
  visible: boolean
  setvisible: ( value: boolean ) => void
  editRow: QuestionListItem
}

const Pop: React.FC<Props> = ({ visible, setvisible, editRow }) => {
  const formRef = useRef<ProFormInstance>()

  useEffect(()=>{
    formRef.current?.setFieldsValue(editRow)
  }, [formRef.current])

  return (
    <>
      <ModalForm
        formRef={formRef}
        width={520}
        title="新建表单"
        open={visible}
        onFinish={async () => {
          message.success('提交成功')
          return true
        }}
        onOpenChange={setvisible}
      >
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="type"
            label="题型"
            placeholder="选择题型"
            rules={[{ required: true, message: '请选择题型!' }]}
          />
          <ProFormSelect
            width="sm"
            name="classify"
            label="科目"
            placeholder="选择科目"
            rules={[{ required: true, message: '请选择科目！' }]}
          />
        </ProForm.Group>
        <ProFormTextArea
          width={465}
          name="question"
          label="题目"
          placeholder="题目"
          rules={[{ required: true, message: '请输入题目！' }]}
        />
        <ProFormRadio.Group
          name="options"
          label="选项"
          options={[
            {
              label: <div>A<Input /></div>,
              value: 'a',
            },
            {
              label: <div>B<Input /></div>,
              value: 'b',
            },
            {
              label: <div>C<Input /></div>,
              value: 'c',
            },
            {
              label: <div>D<Input /></div>,
              value: 'd',
            },
          ]}
          rules={[{ required: true, message: '请选择答案！' }]}
        />
        { editRow?.hasOwnProperty('desc') && 
          <ProFormTextArea
            width={465}
            name="desc"
            label="解析"
          /> 
        }
      </ModalForm>
    </>
  );
}
export default Pop