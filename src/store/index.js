import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: null,
  },
  mutations: {
    upAccessToken(state, token) {
      state.accessToken = token
    },
  }
})
