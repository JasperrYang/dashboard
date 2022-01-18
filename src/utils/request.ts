import axios from 'axios'

const request = axios.create({
  // 配置项
  // baseurl
  // timeout
  timeout: 5000
})

// 请求拦截

// 响应拦截

export default request
