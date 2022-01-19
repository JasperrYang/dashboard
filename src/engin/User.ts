import request from '@/utils/request'
import moment from 'moment'
import store from '@/store'
import qs from 'qs'

interface loginReq {
  phone: string
  password?: string
  code?: string
  Authorization?: string
}

interface commonResp {
  content: string
  message: string
  state: number
  success: boolean
}

export default class User {
  static hasLogin = (): boolean => {
    if (moment().unix() >= store.state.user?.expiresTime || !store.state.user) {
      return false
    }
    return true
  }

  static login = async (params: loginReq): Promise<commonResp> => {
    const { data } = await request.post('/front/user/login', qs.stringify(params))
    return data
  }

  static getUserInfo =async (): Promise<commonResp> => {
    const { data } = await request.get('/front/user/getInfo')
    return data
  }
}
