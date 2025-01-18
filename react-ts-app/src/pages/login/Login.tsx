import React, { useEffect, useState } from 'react'
import style from './Login.module.scss'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components'
import { message, theme } from 'antd'
import { getCaptchaApi, getLoginApi } from '../../services'
import type { LoginParams } from '../../services/type'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from'react-redux'
import type { RootState, AppDispatch } from '../../store'
import { getInfo } from '../../store/models/info'
import { getMenuList } from '../../store/models/menulist'
import { getQuestionType } from '../../store/models/questionType'


const Login: React.FC = () => {
  const navigate = useNavigate()
  const { token } = theme.useToken()
  const [imgUrl, setImgUrl] = useState<string | null>()
  const menuList = useSelector((state: RootState) => state.menuList.menuList)

  const getCaptcha = async()=>{
    const res = await getCaptchaApi();
    setImgUrl(res.data.data.code)
  }
  const dispatch = useDispatch<AppDispatch>()


  useEffect(()=>{
    getCaptcha()
  }, [])


  const onFinish = async(values: LoginParams)=>{
    try{
      const res = await getLoginApi(values)
      if( res.data.code === 1005 ){
        message.error(res.data.msg)
        getCaptcha()
      }else if( res.data.code === 200 ){
        localStorage.setItem('token', res.data.data?.token!)
        navigate('/')
        message.success('登录成功')
        dispatch(getInfo())
        dispatch(getMenuList()) 
        dispatch(getQuestionType())
      }else{
        message.error(res.data.msg)
      }
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className={style.login}>  
      <ProConfigProvider
        hashed={false}
      >
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm
            title="OnlineExam"
            subTitle="在线考试平台"
            onFinish={onFinish}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText:
                  'Password should contain numbers, letters and special characters, at least 8 characters long.',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return (
                      <div style={{ color: token.colorWarning }}>
                        强度：中
                      </div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{ color: token.colorSuccess }}>
                        强度：强
                      </div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <div className={style.code}> 
              <ProFormText
                name="code"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'验证码'}
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!',
                  },
                ]}
              />
              <div className={style.codeImg} onClick={getCaptcha}>
                <img src={imgUrl!} alt="" />
              </div>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
export default Login;