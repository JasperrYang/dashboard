import request from '@/utils/request'
import qs from 'qs'

interface loginRequest {
  phone: string
  password?: string
  code?: string
  Authorization?: string
}

interface loginResponse {
  content: string
  message: string
  state: number
  success: boolean
}

export default class User {
  static login = async (params: loginRequest): Promise<loginResponse> => {
    const { data } = await request.post('/front/user/login', qs.stringify(params))
    return data
  }
}
