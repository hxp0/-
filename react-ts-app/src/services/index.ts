import axios from 'axios'

export const getInfoApi = async()=>{
  const res = await axios.get('https://zyxcl.xyz/exam_api/user/info')
  // const res
  return res
}