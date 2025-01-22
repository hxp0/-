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
  createMultipleQuestionParams,
  ClassResType,
  SubjectResType,
  UserListResType,
  infoDataType,
  RecordParams,
  RecordResType,
  RecordDetailType,
  CreateRecordParams,
  menulistDataType,
  ExamListType,
  detailExamType,
  questionTypeRes,
  StudentGroupParams,
  StudentGroupType,
  StudentGroupEditParams,
  StudentGroupCreateParams,
  StudentParams,
  StudentType,
  StudentEditParams,
  StudentCreateParams,
  examParamsType,
  permissionListType,
  roleListType,
  CreateUserParams,
  updateUserParams,
  PermissionCreateParams
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
// 批量创建试题
export const createMultipleQuestionApi = ( params: createMultipleQuestionParams ) => {
  return request.post<BaseType<null>>('/question/create/multiple', params)
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
// 编辑考试记录接口
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
// 新增用户接口
export const createUserApi = ( params: CreateUserParams )=>{
  return request.post<BaseType<null>>('/user/create',params)
}
// 编辑用户接口
export const updateUserApi = ( params: updateUserParams ) => {
  return request.post<BaseType<null>>('/user/update',params)
}
// 删除用户接口
export const delUserApi = ( id:string ) => {
  return request.post<BaseType<null>>('/user/remove',{
    id
  })
}


// 获取考试记录详情
export const getRecordDetailApi = (id:string)=>{
  return request.get<BaseType<RecordDetailType>>(`/examination/detail?id=${id}`)
}
// 获取创建考试记录
export const createRecordApi = (params:CreateRecordParams)=>{
  return request.post(`/examination/create`,params)
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
// 编辑试卷
export const editExamApi = (params:{id:string,name:string})=>{
  return request.post<{msg:string,code:number}>(`exam/update`,params)
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

// 查询班级
export const StudentGroupListApi = ( params: StudentGroupParams | null = null )=>{
  return request.get<BaseType<StudentGroupType>>('/studentGroup/list', {
    params
  })
}
// 编辑班级
export const StudentGroupEditApi = (params: StudentGroupEditParams)=>{
  return request.post<BaseType<null>>('/studentGroup/update', params)
}
// 创建班级 
export const StudentGroupCreateApi = (params: StudentGroupCreateParams)=>{
  return request.post<BaseType<null>>('/studentGroup/create', params)
}
// 删除班级
export const StudentGroupDeleteApi = (params:{ id: string })=>{
  return request.post<BaseType<null>>('/studentGroup/remove', params )
}

// 查询学生
export const StudentListApi = ( params: StudentParams )=>{
  return request.get<BaseType<StudentType>>('/student/list', {
    params
  })
}
// 编辑学生
export const StudentEditApi = (params: StudentEditParams)=>{
  return request.post<BaseType<null>>('/student/update', params)
}
// 创建学生
export const StudentCreateApi = (params: StudentCreateParams)=>{
  return request.post<BaseType<null>>('/student/create', params)
}
// 删除学生
export const StudentDeleteApi = (params:{ id: string })=>{
  return request.post<BaseType<null>>('/student/remove', params )
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
// 上传头像
export const uploadAvatarApi = (avatar:FormData)=>{
  return request.post<{msg:string,code:number,data:{url:string}}>(`/profile`,avatar)
}
// 更新用户信息
export const updateUserInfoApi = (params:Omit<infoDataType,'id' | 'permission' | 'role'>)=>{
  return request.post<{msg:string,code:number}>(`/user/update/info`,params)
}

// 创建权限菜单
export const permissionCreateApi = (params: PermissionCreateParams)=>{
  return request.post<BaseType<null>>('/permission/create', params)
}
// 编辑权限菜单
export const permissionEditApi = (params: {id:string} & PermissionCreateParams)=>{
  return request.post<BaseType<null>>('/permission/update', params)
}
// 删除权限菜单
export const permissionDeleteApi = (params: {id:string})=>{
  return request.post<BaseType<null>>('/permission/remove', params)
}
