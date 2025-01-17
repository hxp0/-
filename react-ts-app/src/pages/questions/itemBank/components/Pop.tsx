import React, { useRef, useEffect } from 'react'
import {
  ModalForm,
  ProForm,
  ProFormTextArea,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import { updateQuestionApi } from '../../../../services'
import type { QuestionListItem } from '../../../../services/type'
import { message, Input } from 'antd'

interface Props {
  visible: boolean
  types: any
  // Map<string, { text: string; }>
  classify: any
  // {}
  setvisible: ( value: boolean ) => void
  editRow: QuestionListItem
  reload: ()=>void
}

const Pop: React.FC<Props> = ({ visible, types, classify, setvisible, editRow, reload }) => {
  const formRef = useRef<ProFormInstance>()
  // const arr = ['A','B','C','D','E','F','H']

  useEffect(()=>{
    formRef.current?.setFieldsValue(editRow)
  }, [editRow])

  return (
    <>
      <ModalForm
        formRef={formRef}
        width={520}
        title="编辑试题"
        open={visible}
        onFinish={async (values) => {
          const res = await updateQuestionApi({id: editRow._id,...values})
          console.log(res.data.code)
          reload()
          message.success('编辑成功')
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
            valueEnum={types}
            rules={[{ required: true, message: '请选择题型!' }]}
          />
          <ProFormSelect
            width="sm"
            name="classify"
            label="科目"
            placeholder="选择科目"
            valueEnum={classify}
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
          // fieldProps={
          //   defaultValue: {editRow.answer}
          //  onChange: (e: T) => void
          // }
          options={
            [
              {
                label: <div>A<Input value={editRow?.options[0]}/></div>,
                value: 'A',
              },
              {
                label: <div>B<Input value={editRow?.options[1]}/></div>,
                value: 'B',
              },
              {
                label: <div>C<Input value={editRow?.options[2]}/></div>,
                value: 'C',
              },
              {
                label: <div>D<Input value={editRow?.options[3]}/></div>,
                value: 'D',
              },
            ]
          }
          rules={[{ required: true, message: '请选择答案！' }]}
        />
        {/* {JSON.stringify(editRow)} */}
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