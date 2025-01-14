import axios from 'axios'


const request = axios.create({
  baseURL:process.env.NODE_ENV === 'development' ? '/api' : 'https://zyxcl.xyz/exam_api',
  headers:{
    'Authorization':localStorage.getItem('token') || ''
  }
})

export const getInfoApi = ()=>{
  return request.get('/user/info')
}
export const menulistApi = ()=>{
  return request.get('/user/menulist')
}