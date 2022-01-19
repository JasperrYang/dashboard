import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    login (state, payload) {
      const user = JSON.parse(payload)
      state.user = { ...user, expiresTime: moment().unix() + user.expires_in }
      window.localStorage.setItem('user', JSON.stringify(state.user))
    },
    singOut (state) {
      state.user = null
      window.localStorage.removeItem('user')
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('login', payload)
    },
    singOut ({ commit }) {
      commit('singOut')
    }
  },
  modules: {
  }
})
