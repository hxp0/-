import request from './request'
import {
  BaseType,
  CaptchaType,
  LoginParams,
  LoginType,
  QuestionType,
  QuestionListParams,
  QuestionTypeList,
  UpdateQuestionParams,
  CreateQuestionParams,
  ClassResType,
  SubjectResType,
  UserListResType,
  infoDataType,
  RecordParams,
  RecordResType,
  menulistDataType,
  ExamListType,
  detailExamType,
  questionTypeRes,
  examParamsType,
  permissionListType,
  roleListType
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
  return request.get<BaseType<infoDataType>>('/user/info')
}
export const menulistApi = ()=>{
  return request.get<BaseType<{list:menulistDataType[]}>>('/user/menulist')
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

// 添加试题
export const createQuestionApi = ( params: CreateQuestionParams ) => {
  return request.post<BaseType<QuestionTypeList>>('/question/create', params)
}

// 考试记录接口
export const getRecordApi = (params:RecordParams)=>{
  const res =  request.get<BaseType<RecordResType>>('/examination/list',
    {params}
   )
  return res
}

// 查询班级接口
export const getClassApi = (params:RecordParams)=>{
  return request.get<BaseType<ClassResType>>('/studentGroup/list',{
    params
  })
}
//查询科目接口
export const getSubjectApi = (params:RecordParams)=>{
  return request.get<BaseType<SubjectResType>>('classify/list',{
    params
  })
}
// 删除考试记录接口
export const delRecordApi = (id:string)=>{
  return request.post('examination/remove',{
    id
  })
}
// 编辑考试接口
export const editRecordApi = (params:string)=>{
  return request.post('examination/edit',{
    params
  })
}

//用户列表接口
export const getUserApi = ( params: RecordParams )=>{
  return request.get<BaseType<UserListResType>>('/user/list', {
    params
  })
}
// 获取试卷列表
export const examApi = (params={})=>{
  return request.get<BaseType<ExamListType>>('/exam/list',{params})
}
// 删除试卷
export const DeleteExamApi = (id:string)=>{
  return request.post(`/exam/remove`,{id})
}
// 获取试卷详情
export const detailExamApi = (id:string)=>{
  return request.get<BaseType<detailExamType>>(`/exam/detail?id=${id}`)
}

// 获取试题类型列表
export const questionTypeApi = ()=>{
  return request.get<BaseType<{list:questionTypeRes[]}>>(`/question/type/list`)
}
// 获取考试科目列表
export const classifyListApi = ()=>{
  return request.get(`/classify/list`)
}
// 获取试题科目列表
export const questionListApi = (classify:string)=>{
  return request.get(`/question/list?classify=${classify}`)
}
// 创建试卷
export const examCreateApi = (params:examParamsType)=>{
  return request.post(`/exam/create`,params)
}
// 获取角色列表
export const roleListApi = ()=>{
  return request.get<BaseType<roleListType>>(`/role/list`)
}
// 获取权限列表
export const permissionListApi = ()=>{
  return request.get<BaseType<permissionListType>>(`/permission/list`)
}
// 添加角色
export const roleAddApi = (params:{name:string,value:string})=>{
  return request.post<{msg:string,code:number}>(`/role/create`,params)
}
// 删除角色
export const roleDeleteApi = (id:string)=>{
  return request.post<{msg:string,code:number}>(`/role/remove`,{id})
}
// 编辑角色
export const roleEditApi = (params:{id:string,name:string,permission:string[]})=>{
  return request.post<{msg:string,code:number}>(`/role/update`,params)
}

