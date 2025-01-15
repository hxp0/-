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

export type QuestionListParams = {
  page: number
  pagesize: number
  question?: string
}

// 考试记录列表参数类型
export type RecordParams = {
  page: number
  pagesize: number
}
export type Questions = {
  _id: string
  answer: string
  classify: string
  question: string
  options: string[]
  score: number
}
export type RecordListType = {
  _id: string
  classify: string
  createTime: number
  endTime: number
  creator: string
  examId: string
  examiner: string[]
  name: string
  group: string[]
  startTime: number
  questionsList: Questions[]
}
// 考试记录列表返回值类型
export type RecordResType = {
  list: RecordListType[]
  total: number
}


