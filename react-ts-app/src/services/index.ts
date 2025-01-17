<<<<<<< HEAD
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
// 获取用户信息
export const getInfoApi = ()=>{
  return request.get<InfoResType>('/user/info')
}
// 获取权限列表
export const menulistApi = ()=>{
  return request.get<menulistResType>('/user/menulist')
}
// 获取试卷列表
export const examApi = (params={})=>{
  return request.get('/exam/list',{params})
}
// 删除试卷
export const DeleteExamApi = (id:string)=>{
  return request.post(`/exam/remove`,{id})
}
// 获取试卷详情
export const detailExamApi = (id:string)=>{
  return request.get(`/exam/detail?id=${id}`)
}

// 获取试题类型列表
export const questionTypeApi = ()=>{
  return request.get(`/question/type/list`)
}


=======

import request from './request'
import {
  BaseType,
  CaptchaType,
  LoginParams,
  LoginType,
  QuestionType,
  QuestionListParams,
  InfoResType,
  RecordParams,
  RecordResType
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
// 考试记录接口
export const getRecordApi = (params:RecordParams)=>{
  const res =  request.get<BaseType<RecordResType>>('/examination/list',
    {params}
   )
  return res
}

// 试题库接口
export const getQuestionApi = ( params: QuestionListParams )=>{
  return request.get<BaseType<QuestionType>>('/question/list', {
    params
  })
}
>>>>>>> 629e74bf8119f6dec6a6a19187177a4ffdd5d30b
