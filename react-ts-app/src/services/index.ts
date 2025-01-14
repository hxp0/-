import axios from 'axios'
import { CaptchaType, LoginParams, LoginType } from './type'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://zyxcl.xyz/exam_api'

// 获取验证码
export const getCaptchaApi = async()=>{
  const res = await axios.get<CaptchaType>('/login/captcha')
  return res
}

// 登录接口
export const getLoginApi = async( params:LoginParams )=>{
  const res = await axios.post<LoginType>('/login', params)
  return res
}