import { getQuestionApi, getQuestionTypeApi   } from '../../../../services'

interface ResultType {
  classify: {}
  types: { label:{text: string}, value: string}[]
}

export const getData = async() =>{
  const result: ResultType = { classify: {}, types: [] }
  const classifyArr:string[] = []
  const typeArr:{ label:{text: string}, value: string}[] = []
  const res = await Promise.all([getQuestionApi(), getQuestionTypeApi()])
  // 科目 eg:数学
  res[0].data.data.list.map((item) =>{
    const index = classifyArr.findIndex(it => it === item.classify)
    if( index === -1 ){
      classifyArr.push(item.classify)
    }
  })
  const obj = classifyArr.reduce((obj:any, current: string) => {
    obj[current] = current;
    return obj;
  }, {})
  result.classify = obj
  // 题目类型 eg:单选
  res[1].data.data.list.map(item=>{
    typeArr.push({
      label:{text: item.name},
      value: item.value + ''
    })
  })
  result.types = typeArr
  return result
}