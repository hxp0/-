// 返回值类型
interface BaseType<T> {
  code: number
  msg: string
  data: T
}

// 验证码返回值类型
export type CaptchaType = { code: string }

// 登录接口参数类型
export type LoginParams = Record<'username' | 'password' | 'code', string>

// 登录返回值类型
export type LoginType =  {
    token: string
  }
// info返回值类型
export type infoDataType = {
  age?: number
  avator?: string
  email?: string
  permission:{
    name:string
    path:string
  }[]
  role:string[]
  sex?:string
  username:string
  id:string
}
// menulist返回值类型
export type menulistResType = {
  code: number
  msg: string
  data?: {
    list: menulistDataType[]
  }
}
// menulist返回值类型
export type menulistDataType = {
    children: {
      path: string
      title: string
      _id:string
    }[]
    path: string
    name: string
    _id:string
  }
  
export type LoginType =  { token: string }

// 试题库列表返回值类型
export type QuestionType =  {
  list: QuestionListItem[]
  total: number
  totalPage: number
} 
export type QuestionListItem = {
  answer: string
  classify: string
  options?: string[]
  question: string
  desc?: string
  type: string
  __v: number
  _id: string
  createdAt?: string
}

// 试题库查询参数
export type QuestionListParams = {
  page: number
  pagesize: number
  question?: string
  classify?: string
  type?: string
}
// 查询试题类型返回值类型
export type QuestionTypeList = {
  list: QuestionTypeListItem[]
}
export type QuestionTypeListItem = {
  _id: string
  name: string
  value: number
}
// 编辑试题参数类型
export type UpdateQuestionParams = Partial<Omit<QuestionListItem, '_v'> & { id: string }>
// 添加试题接口参数类型
export type CreateQuestionParams = Omit<QuestionListItem, '_v'>
// 批量创建试题接口参数类型
export type createMultipleQuestionParams = {
  list: ExcelData[]
}
export type ExcelData = {
  question: string
  type: number
  classify: string
  answer: string
  options: string[]
  desc:  string
}


// 考试记录列表公共 参数类型
export type RecordParams = {
  page: number
  pagesize: number
  name?: string
  creator?: string
}
// 考试记录列表里试题类型
export type RecordQuestion = {
  _id: string
  answer: string | string[]
  classify: string
  question: string
  options: string[]
  score?: number
  __v: number
  type: string
}
// 考试记录列表参数类型
export type RecordListType = {
  _id: string
  classify: string
  createTime: number
  endTime: number
  creator: string
  examiner: string[]
  name: string
  group: string[]
  startTime: number
  status: number
  questionsList: RecordQuestion[]
}
// 考试记录列表返回值类型
export type RecordResType = {
  list: RecordListType[]
  total: number
}
// 班级列表参数类型
export type ClassListType = {
  _id: string
  classify: string
  creator: string
  name: string
  createTime: number
  teacher: string
}
// 班级列表返回值类型
export type ClassResType = {
  list: ClassListType[]
  total: number
}
// 科目列表参数类型
export type SubjectListType = {
  _id: string
  value: string
  creator: string
  name: string
  createTime: number
}
//科目列表返回值类型
export type SubjectResType = {
  list: SubjectListType[]
  total: number
}
// 考试记录详情问题参数类型
export type RecordQuestionDetail = {
  _id: string
  answer: string
  classify: string
  question: string
  options: string[]
  type: string
  __v: number
}
// 考试记录详情返回值类型
export type RecordDetailType = {
  _id: string
  classify: string
  createTime: number
  creator: string
  name: string
  questionsList: RecordQuestionDetail[]
}
// 创建考试记录参数类型
export type CreateRecordParams = {
  classify: string
  name: string
  examId: string
  group: string
  examiner: string
  startTime: string
  endTime: string
}



// 用户列表参数类型
export type UserListType = {
  _id: string
  creator?: string
  username: string
  avator: string
  role: string[]
  age?: number
  sex?: string
  email?: string
  password: string
  lastOnlineTime: number
  status: number
}
// 用户列表返回值类型
export type UserListResType = {
  list: UserListType[]
  total: number
}
// 创建用户参数类型
export type CreateUserParams = {
  username: string
  password: string
  status: number
}
// 更新用户接口参数类型
export type updateUserParams = { id: string } & Partial<Omit<UserListType,'_id'|'lastOnlineTime' | 'creator'>>




// 试卷列表返回值类型
export type ExamListType = {
  total:number
  totalPage:number
  list:ExamListItemType[]
}
export type ExamListItemType = {
  classify:string
  createTime:number
  creator:string
  name:string
  questions:string[]
  __v:number
  _id:string
}
// 试卷详情返回值类型
export type detailExamType = {
  name:string
  classify:string
  __v:number
  createTime:string
  creator:string
  _id:string
  questions:questionItemType[]
}

export type questionItemType = {
  name:string
  _id:string
  classify:string
  __v:number
  createTime:string
  type:string
  options:string[]
}
// 试题类型列表返回值类型
export type questionTypeRes = {
  name:string
  value:number
  _id:string
}

// 班级查询接口参数类型
export type StudentGroupParams = {
  page: number
  pagesize: number
  name: string
  classify?: string
  teacher?: string
}
// 班级查询接口返回值类型
export type StudentGroupType = {
  total: number
  list: StudentGroupListItemType[]
}
export type StudentGroupListItemType = {
  _id: string
  name: string
  classify: string
  teacher: string
  students: number[]
  creator: string
  createTime: number
  __v: number
}
// 编辑班级接口参数类型
export type StudentGroupEditParams = { id: string } & Omit<StudentGroupListItemType, '_id' | '__v'>
// 创建班级接口参数类型
export type StudentGroupCreateParams = Omit<StudentGroupListItemType, '_id' | '__v'>

// 查询学生接口参数类型
export type StudentParams = {
  page: number
  pagesize: number
  sex?: string
  username?: string
  age?: number
  className?: string
}
// 查询学生接口返回值类型
export type StudentType = {
  total: number
  list: []
}
export type StudentListItemType = {
  _id: string
  password: string
  sex: string
  age: number
  email: string
  className: string
  avator: string
  status: number
  creator: string
  createTime: number
  __v: number
  role: string
  username: string
  classId: string
  exams: []
  idCard: string
}
// 编辑学生接口参数类型
export type StudentEditParams = {
  id: string
  username?: string
  sex?: string
  age?: number
  className?: string
}
// 创建学生接口参数类型
export type StudentCreateParams = {
  password: string
  sex: string
  age: number
  email: string
  className: string
  avator: string
  status: number
  username: string
  idCard: string
}
export type examParamsType = {
  name:string
  classify:string
  questions:string[]
}
// 权限列表返回值类型
export type permissionListType = {
  list: permissionListItem[]
}
export type permissionListItem = {
  name:string
  classify?:string
  __v?:number
  createTime:string
  creator?:string
  _id?:string
  disabled?:boolean
  isBtn:boolean | string
  path:string
  pid?:string
  children?:permissionListItem[]
}
// 角色列表返回值类型
export type roleListType = {
  totalPage:number
  total:number
  list:roleListItemType[] 
}
type roleListItemType = {
  name:string
  _id:string
  createTime:number
  creator:string
  permission:string[]
  __v:number
  disabled:boolean
  value:string
}

// 创建权限菜单接口参数类型
export type PermissionCreateParams = {
  name: string
  pid: string
  path: string
  disabled: boolean
  isBtn: boolean
}

// 查询学生考试列表返回值类型
export type StudentExamListType = {
  list: []
}
export type StudentExamListItem = {
  "_id": string
  "className": string
  "examId": string
  "examinationId": string
  "startTime": number
  "endTime": number
}