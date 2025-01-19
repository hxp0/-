import React, { useState, useEffect } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Form } from 'antd';

interface Props {
  changeJudge:(value: string)=>void
}

const Judge: React.FC<Props> = ({ changeJudge }) => {
  const [value, setValue] = useState('');

  useEffect(()=>{
    changeJudge(value)
  }, [value])

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <Form.Item label='选项' rules={[{required:true}]}>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value='对'>对</Radio>
        <Radio value='错'>错</Radio>
      </Radio.Group>
    </Form.Item>
  );
};
export default Judge;