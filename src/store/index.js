import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import ubi from './modules/ubi'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ubi
  },
  getters
})

export default store
