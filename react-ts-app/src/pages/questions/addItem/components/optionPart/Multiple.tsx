import React from 'react'
import {
  Button,
  Form,
  Input,
  Radio
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'


const arr = ['A','B','C','D','E','F','G','H','I','J','K']
interface Props {
  answerIndex: number[]
  changeAnswer:(index: number)=>void
}

const Multiple: React.FC<Props> = ({ answerIndex, changeAnswer }) => {
  return (
    <Form.List
      name="options"
      initialValue={[ '', '', '', '' ]}
    >
      {(fields, { add, remove }) => (
        <>
          <Form.Item label='选项'>
            {fields.map((field, index) => (
              <Form.Item key={field.key}>
                <Form.Item name={[field.name, 'isAnswer']} noStyle>
                  <Radio checked={answerIndex.includes(index)} onClick={()=>changeAnswer(index)}>{arr[index]}</Radio>
                </Form.Item>
                <Form.Item name={field.name} noStyle rules={[{ required: true, message: '选项不能为空!' }]}>
                  <Input style={{ width: '60%' }} />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ marginLeft: '10px', fontSize: '18px' }}
                  onClick={() => remove(field.name)}
                />
              </Form.Item>
            ))}
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
              <Button
                type="dashed"
                onClick={() => add('新值')}
                icon={<PlusOutlined />}
              >添加选项</Button>
            </Form.Item>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default Multiple;