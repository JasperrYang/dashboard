import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Routes from '@/utils/Routes'

import './styles/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Routes)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
