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
let isRefresh = false
// eslint-disable-next-line
let requests: any[] = []
request.interceptors.response.use(
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
          break
        case 401:
          return oauth(error)
        case 403:
          Message.error('没有权限，请联系管理员')
          break
        case 404:
          Message.error('请求资源不存在')
          break
        default:
          Message.error('服务端错误，请联系管理员')
          break
      }
    // 无响应
    } else if (error.request) {
      Message.error('请求超时，请刷新重试')
    } else {
      Message.error(`请求失败：${error.message}`)
    }
    return Promise.reject(error)
  }
)

// eslint-disable-next-line
function oauth (error: any) {
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
      store.dispatch('login', res.data.content)
      requests.forEach(cb => cb())
      requests = []
      return request(error.config)
    }).catch(() => {
      store.dispatch('singOut')
      redirectLogin()
      return Promise.reject(error)
    }).finally(() => {
      isRefresh = false
    })
  }

  // 刷新状态下，把请求挂起放到 requests 数组中
  return new Promise(resolve => {
    requests.push(() => {
      resolve(request(error.config))
    })
  })
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
