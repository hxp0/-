import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Drawer, Space } from 'antd'
import type { DrawerProps } from 'antd'
import type { QuestionListItem } from '../../../../services/type'

interface Props {
  editRow: QuestionListItem | undefined
}

const DrawerCom = ( { editRow }: Props, ref: any ): any => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();

  const showLargeDrawer = () => {
    setSize('default');
    setOpen(true);
  };

  useImperativeHandle(ref, ()=>({showLargeDrawer}));

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title='试题预览'
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>导出PDF</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Space direction='vertical'>
          <h3>题目类型：{editRow?.type}</h3>
          <h3><span>科目:</span>{editRow?.classify}</h3>
          <p><div>题目：</div>{editRow?.question}</p>
          <p><div style={{margin:'0 15px 15px 0'}}>选项:</div>
            {editRow?.options.map(item=>
              <b style={{padding:'6px 15px', border:'1px solid #333', borderRadius:'5px', marginRight:'10px'}}>{item}</b>
            )}
          </p>
          <p><div>答案：</div>{editRow?.answer}</p>
        </Space>
      </Drawer>
    </>
  );
};

export default forwardRef(DrawerCom)