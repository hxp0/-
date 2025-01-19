import React from 'react'
import { Form, Input } from 'antd'

const Fill: React.FC = () => {
  return (
    <Form.Item 
      label='正确答案'
      name="answer"
      rules={[{ required: true, message: '请输入正确答案!' }]}
    >
      <Input />
    </Form.Item>
  );
};
export default Fill;