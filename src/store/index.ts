import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    login (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    },
    singOut (state) {
      state.user = null
      window.localStorage.removeItem('user')
    }
  },
  actions: {
    login (context, payload) {
      context.commit('login', payload)
    },
    singOut (context) {
      context.commit('singOut')
    }
  },
  modules: {
  }
})
