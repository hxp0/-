
import request from './request'
import {
  BaseType,
  CaptchaType,
  LoginParams,
  LoginType,
  QuestionType,
  QuestionListParams,
  QuestionTypeList,
  InfoResType,
  UpdateQuestionParams,
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

// 试题库接口
export const getQuestionApi = ( params: QuestionListParams | null = null )=>{
  return request.get<BaseType<QuestionType>>('/question/list', {
    params
  })
}
// 获取试题类型接口
export const getQuestionTypeApi = () => {
  return request.get<BaseType<QuestionTypeList>>('/question/type/list')
}

// 编辑题目
export const updateQuestionApi = ( params: UpdateQuestionParams ) => {
  return request.post<BaseType<QuestionTypeList>>('/question/update', params)
}

// 删除题目
export const delQuestionApi = ( params:{ id: string } ) => {
  return request.post<BaseType<QuestionTypeList>>('/question/remove', params)
}


// 考试记录接口
export const getRecordApi = (params:RecordParams)=>{
  const res =  request.get<BaseType<RecordResType>>('/examination/list',
    {params}
   )
  return res
}
