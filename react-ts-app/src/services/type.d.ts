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