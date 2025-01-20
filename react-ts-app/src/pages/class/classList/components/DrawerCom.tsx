import React from 'react'
import { Button, Drawer, Space } from 'antd'
import { StudentGroupListItemType } from '../../../../services/type'

interface Props {
  row: StudentGroupListItemType
  drawerOpen: boolean
  changeOpen: (value: boolean)=>void
}

const DrawerCom: React.FC<Props> = ({ row, drawerOpen, changeOpen }) => {

  const onClose = () => {
    changeOpen(false);
  };

  return (
    <>
      <Drawer
        title="班级详情"
        width={500}
        onClose={onClose}
        open={drawerOpen}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onClose}>确定</Button>
          </Space>
        }
      >
        <p>名称：{row?.name}</p>
        <p>创建人：{row?.creator}</p>
        <p>创建时间：{new Date(row?.createTime).toLocaleString()}</p>
        <p>老师：{row?.teacher}</p>
        <p>科目：{row?.classify}</p>
      </Drawer>
    </>
  );
};

export default DrawerCom;