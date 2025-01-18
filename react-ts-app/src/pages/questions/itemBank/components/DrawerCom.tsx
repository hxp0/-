import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Drawer, Space } from 'antd'
import type { DrawerProps } from 'antd'
import type { QuestionListItem } from '../../../../services/type'
import { usePDF } from 'react-to-pdf';

interface Props {
  editRow: QuestionListItem | undefined
}

const DrawerCom = ( { editRow }: Props, ref: any ): any => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  const showLargeDrawer = () => {
    setSize('default');
    setOpen(true);
  };

  useImperativeHandle(ref, ()=>({showLargeDrawer}));

  const onClose = () => {
    setOpen(false);
  };

  const exportFn = ()=>{
    setOpen(false);
    toPDF();
  }

  return (
    <>
      <Drawer
        title='试题预览'
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        key={editRow?._id}
        extra={
          <Space>
            <Button onClick={exportFn}>导出PDF</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Space direction='vertical'>
          <div ref={targetRef} style={{padding:20}}>
            <h3>题目类型：{editRow?.type}</h3>
            <h3><span>科目:</span>{editRow?.classify}</h3>
            <div><div>题目：</div>{editRow?.question}</div>
            <div><div style={{margin:'0 15px 15px 0'}}>选项:</div>
              {editRow?.options.map((item, index)=>
                <b
                  style={{padding:'6px', borderRadius:'5px', marginRight:'6px'}}
                  key={index}
                >{item}</b>
              )}
            </div>
            <div  style={{marginTop:10}}><div>答案：</div>{editRow?.answer}</div>
          </div>
        </Space>
      </Drawer>
    </>
  );
};

export default forwardRef(DrawerCom)