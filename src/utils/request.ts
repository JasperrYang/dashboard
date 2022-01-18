import axios from 'axios'

const request = axios.create({
  // 配置项
  // baseurl
  baseURL: 'http://eduboss.lagou.com',
  // timeout
  timeout: 5000
})

// 请求拦截

// 响应拦截

export default request
