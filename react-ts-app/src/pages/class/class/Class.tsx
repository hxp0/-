import React from 'react'
import style from './Class.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Class: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={style.class}>
      <Button
        onClick={()=>{
          navigate('/manage-group/group-list')
        }}
      >创建班级</Button>
    </div>
  );
};
export default Class;