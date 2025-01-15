import request from './request'
import {
  BaseType,
  CaptchaType,
  LoginParams,
  LoginType,
  QuestionType,
  QuestionListParams,
  InfoResType
} from './type'



export const getCaptchaApi = async()=>{
  const res = await request.get<BaseType<CaptchaType>>('/login/captcha')
  return res
}

// 登录接口
export const getLoginApi = async( params:LoginParams )=>{
  const res = await request.post<BaseType<LoginType>>('/login', params)
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
  return request.get('/user/menulist')
}

// 试题库接口
export const getQuestionApi = ( params: QuestionListParams )=>{
  return request.get<BaseType<QuestionType>>('/question/list', {
    params
  })
}
