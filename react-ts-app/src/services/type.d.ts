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
export type InfoResType = {
  code: number
  msg: string
  data?: infoDataType
}
// info返回值类型
export type infoDataType = {
  age: number
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
  options: string[]
  question: string
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
  answer: string
  classify: string
  question: string
  options: string[]
  score: number
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

