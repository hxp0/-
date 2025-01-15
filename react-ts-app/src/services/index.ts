import request from './request'
import { 
  CaptchaType,
  LoginParams,
  LoginType,
  InfoResType,
  menulistResType
} from './type'



export const getCaptchaApi = async()=>{
  const res = await request.get<CaptchaType>('/login/captcha')
  return res
}

// 登录接口
export const getLoginApi = async( params:LoginParams )=>{
  const res = await request.post<LoginType>('/login', params)
  return res
}
// 退出登录
export const logoutApi = ()=>{
  return request.post('/user/logout')
}
export const getInfoApi = ()=>{
  return request.get<InfoResType>('/user/info')
}
export const menulistApi = ()=>{
  return request.get<menulistResType>('/user/menulist')
}
