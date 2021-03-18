import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: null,
    username: null,
    email: null
  },
  mutations: {
    upAccessToken(state, token) {
      state.accessToken = token
    },
    upUser(state, user) {
      state.username = user.username
      state.email = user.email
    },
  }
})
