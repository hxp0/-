import React, { useState, useEffect } from 'react'
import style from './AddItem.module.scss'
import { getData } from '../itemBank/components/Select'
import classNames from 'classnames'
import AddQuestion from './components/AddQuestion'
import BatchImport from './components/BatchImport'

const AddItemn: React.FC = () => {
  const [classify, setClassify] = useState<{label: string, value: string}[]>()
  const [types, setTypes] = useState<{label: string, value: string}[]>()
  const [curIndex, setCurIndex] = useState(0)
  const tabs = ['手动添加', '批量导入']

  const getList = async()=>{
    const res = await getData()
    const arr = Object.entries(res.classify).map(item=>{
      return {
        label: item[0],
        value: item[0]
      }
    })
    setClassify(arr)
    const types = res.types.map(item=>{
      return {
        label: item.label.text,
        value: item.value
      }
    })
    setTypes(types)
  }
  
  useEffect(()=>{
    getList()
  }, [])

  // console.log(classify)
  // console.log(types)
  
  return (
    <div className={style.addItem}>
      <header>
        {tabs.map((item, index)=>
          <div
            className={classNames(style.tab, {[style.active]: curIndex === index})}
            onClick={()=>setCurIndex(index)}
            key={item}
          >{item}</div>
        )}
      </header>
      {curIndex === 0 ? <AddQuestion types={types} classify={classify}/> : <BatchImport />}
    </div>
  );
};
export default AddItemn;