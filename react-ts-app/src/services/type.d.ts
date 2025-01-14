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