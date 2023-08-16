import { createStore } from 'vuex'

export default createStore({
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    // 用户当前环境ID
    userCurrentEnvId: null,
    // 用户当前token信息
    token:null
  },
  mutations: {
    // 更新环境ID
    setEnvId(state,envId){
      state.userCurrentEnvId = envId.envId
    }
  },
  actions: {
  },
  modules: {
  }
})
