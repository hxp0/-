import React, { useState, useEffect } from 'react'
import { Upload, Form, Button, message } from 'antd'
import * as XLSX from 'xlsx'
import { InboxOutlined } from '@ant-design/icons'
import { ExcelData } from '../../../../services/type'
import { createMultipleQuestionApi } from '../../../../services'

const { Dragger } = Upload

const BatchImport: React.FC = () => {
  const [fileData, setFileData] = useState<ExcelData[]>([]);
  const [isFirst, setIsFirst] = useState(true)

  const beforeUpload = (file: File) => {
    const newArr: any = []
    const readFile = (file: File) => {
      const [fileReader, data1] = [new FileReader(), {}]
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const binaryData = e.target?.result
        const workbook: XLSX.WorkBook = XLSX.read(binaryData, { type: 'binary' })
        Object.keys(workbook.Sheets).forEach((sheet) => {
          (data1 as any)[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: 1 }).slice(1);
        })
        workbook.SheetNames.forEach((sheetName: any) => {
          const dataSheet = (data1 as any)[sheetName] as Array<Array<string | number | null>>;
          const items = dataSheet.map((row) => ({
            question: row[0],
            type: Number(row[1]),
            classify: row[2],
            answer: row[3],
            options: JSON.parse(row[4] as string),
            desc: row[5],
          }));
          newArr.push(items as ExcelData[])
        });
        setIsFirst(false)
        setFileData(newArr.flat());
      };
      fileReader.readAsBinaryString(file);
    };
    readFile(file);
    return false; // 阻止默认上传行为
  };

  useEffect(()=>{
    if( !isFirst ){
      if (fileData.length > 0) {
        message.success('导入成功！');
      } else {
        message.error('导入失败！');
      }
    }
  }, [fileData])

  const onFinish = async()=>{
    try{
      const res = await createMultipleQuestionApi({ list: fileData })
      if( res.data.code === 200 ){
        message.success('添加成功！')
      }
    }catch(e){
      console.log(e)
    }
  }

  return (
    <>
    <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      > 
        <Form.Item rules={[{required:true}]}>上传excel批量导入</Form.Item>
        <Dragger
          name="importExcel"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          beforeUpload={beforeUpload}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
          {/* <p className="ant-upload-hint">
            支持单次或批量上传
          </p> */}
        </Dragger>
        <Form.Item style={{marginTop:20}}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default BatchImport;