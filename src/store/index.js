import Vue from "vue";
import Vuex from 'vuex'
import i18n from '@/i18n'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'Zh_lang',
  },
  mutations: {
    increment(state, payload) {
      state.language = payload
      i18n.locale = payload
    }
  },
  actions: {
    incrementAction({ commit }, payload) {
      commit('increment', payload);
    }
  }
});