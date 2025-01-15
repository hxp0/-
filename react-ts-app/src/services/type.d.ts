// 验证码返回值类型
export type CaptchaType = {
  code: number
  msg: string
  data: {
    code: string
  }
}

// 登录接口参数类型
export type LoginParams = Record<'username' | 'password' | 'code', string>

// 登录返回值类型
export type LoginType = {
  code: number
  msg: string
  data?: {
    token: string
  }
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