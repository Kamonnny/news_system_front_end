import store from '@/store'

// 储存获得的token
export const handleToken = tokens => {
  store.commit("upAccessToken", tokens.access_token)
  localStorage.setItem("refreshToken", tokens.refresh_token)
}

export const checkLogin = () => {
  return localStorage.getItem("refreshToken") != null
}
