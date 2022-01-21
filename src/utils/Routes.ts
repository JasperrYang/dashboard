import { RouteConfig } from 'vue-router'
import router from '@/router'

export default class Routes {
  static install = (): void => {
    routeInit()
  }
}

const routeInit = (): void => {
  const resources = require.context('@/modules', true, /\/routes\.ts$/)
  resources.keys().forEach((key) => {
    const resource = resources(key).default.routes
    resource.forEach((item: RouteConfig) => {
      router.addRoute('main', item)
    })
  })
}
