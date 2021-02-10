import store from '@/store'

// 储存获得的token
export const handleToken = tokens => {
  localStorage.setItem("refreshToken", tokens.refresh_token)
  store.commit("upAccessToken", tokens.access_token)
}

export const checkLogin = () => {
  return localStorage.getItem("refreshToken") != null
}
