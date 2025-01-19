import React from 'react'

const BatchImport: React.FC = () => {
  return (
    <div>
      BatchImport
    </div>
  );
};
export default BatchImport;


// import React, { useState } from 'react';
// import { Upload, message, Button } from 'antd';
// import XLSX from 'xlsx';

// interface ExcelData {
//   name?: string;
//   snCode?: string;
//   macAddress?: string;
//   ipAddress?: string;
//   number?: number;
//   podium?: boolean;
//   devices?: Array<{
//     ipAddress?: string;
//     location?: string;
//   }>;
// }

// const BatchImport: React.FC = () => {
//   const [fileData, setFileData] = useState<ExcelData[]>([]);

//   const beforeUpload = (file: File) => {
//     const readFile = (file: File) => {
//       const [fileReader, data1] = [new FileReader(), {}];
//       let [binaryData, workbook] = [null, null];
//       fileReader.onload = (e: ProgressEvent<FileReader>) => {
//         binaryData = e.target?.result?
//         workbook = XLSX.read(binaryData, { type: 'binary' })
//         Object.keys(workbook.Sheets).forEach((sheet) => {
//           data1[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: 1 }).slice(1);
//         });
//         workbook.SheetNames.forEach((sheetName) => {
//           const dataSheet = data1[sheetName] as Array<Array<string | number | null>>;
//           const items = dataSheet.map((row) => ({
//             name: row[0] ? row[0] : null,
//             snCode: row[1] ? row[1] : null,
//             macAddress: row[2] ? row[2] : null,
//             ipAddress: row[3] ? row[3] : null,
//             number: Number(row[4] ? row[4] : null),
//             podium: (row[5] ? row[5] : null) === '是' ? true : false,
//             devices: [
//               { ipAddress: row[6] ? row[6] : null, location: 'top1' },
//               { ipAddress: row[7] ? row[7] : null, location: 'side1' },
//               { ipAddress: row[8] ? row[8] : null, location: 'front1' },
//               { ipAddress: row[9] ? row[9] : null, location: 'front2' },
//             ],
//           }));
//           setFileData(items as ExcelData[]);
//         });
//         if (fileData.length > 0) {
//           message.success('导入成功！');
//         } else {
//           message.error('导入失败！');
//         }
//       };
//       fileReader.readAsBinaryString(file);
//     };
//     readFile(file);
//     return false; // 阻止默认上传行为
//   };

//   return (
//     <Upload
//       name="importExcel"
//       accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//       beforeUpload={beforeUpload}
//     >
//       <Button>上传 Excel</Button>
//     </Upload>
//   );
// };
// export default BatchImport;