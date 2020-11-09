const state = {
  userName: '',
  isIOS: /iPhone|iPod|iPad/.test(window.navigator.platform),
  selUbi: {}
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SelUbi(state, item) {
    state.selUbi = item
  }
}
const actions = {
  // 设置name
  setUserName({commit}, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
