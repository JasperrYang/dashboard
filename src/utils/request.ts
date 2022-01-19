import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '@/router'

const request = axios.create({
  // 配置项
  // baseurl
  // timeout
  timeout: 5000
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    const { user } = store.state
    if (user && user.access_token) {
      config.headers = {
        Authorization: user.access_token
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
let isRefresh: boolean = false
let requests: any[] = []
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // 响应错误
    if (error.response) {
      const { status } = error.response
      switch (status) {
        case 400:
          Message.error('请求参数错误')
        case 401:
          return oauth(error)
        case 403:
          Message.error('没有权限，请联系管理员')
        case 404:
          Message.error('请求资源不存在')
        default:
          Message.error('服务端错误，请联系管理员')
      }
    // 无响应
    } else if (error.request) {
      Message.error('请求超时，请刷新重试')
    } else {
      Message.error(`请求失败：${error.message}`)
    }
    return Promise.reject(error)
});

function oauth(error: any) {
  if (!store.state.user) {
    redirectLogin()
    return Promise.reject(error)
  }
  if (!isRefresh) {
    isRefresh = true
    // 尝试刷新获取新的 token
    return refreshToken().then(res => {
      if (!res.data.success) {
        throw new Error('刷新 Token 失败')
      }
      store.commit('setUser', res.data.content)
      requests.forEach(cb => cb())
      requests = []
      return request(error.config)
    }).catch(err => {
      console.log(err)
      store.commit('setUser', null)
      redirectLogin()
      return Promise.reject(error)
    }).finally(() => {
      isRefresh = false
    })
  }
}

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.post('/front/user/refresh_token', qs.stringify({ refreshtoken: store.state.user.refresh_token }))
}

export default request
