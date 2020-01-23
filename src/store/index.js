import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    healthplayer1: 100,
    healthplayer2: 100,
  },
  mutations: {
    SET_DECREASE1 (state, payload) {
      state.healthplayer1 = state.healthplayer1 - payload
    },
    SET_DECREASE2 (state, payload) {
      state.healthplayer2 = state.healthplayer2 - payload
    }
    
  },
  actions: {
    DECREASE1 (action, payload) {
      action.commit('SET_DECREASE1', payload)
    },
    DECREASE2 (action, payload) {
      action.commit('SET_DECREASE2', payload)
    }
  },
  modules: {
  }
})
