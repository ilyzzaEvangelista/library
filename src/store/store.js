import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions: {
    fetchUser({ commit }) {
      auth.onAuthStateChanged(user => {
        commit('setUser', user ? { email: user.email, uid: user.uid } : null)
      })
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
  },
})
