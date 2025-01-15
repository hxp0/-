import axios from 'axios'


const request = axios.create({
    baseURL:process.env.NODE_ENV === 'development' ? '/api' : 'https://zyxcl.xyz/exam_api'
  })
  // 请求拦截器
  request.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      // 例如，设置请求头，添加token
      config.headers['Authorization'] = localStorage.getItem('token') || ''
      return config
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  // 响应拦截器
  request.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      // 例如，处理返回的数据格式
      
      return response
    },
    error => {
      // 对响应错误做点什么
      if(window.location.pathname !== '/user/login'){
        if(error.response.status === 401){
          localStorage.removeItem('token')
          window.location.href = '/user/login'
        }
      }
      return Promise.reject(error);
    }
  );

  export default request