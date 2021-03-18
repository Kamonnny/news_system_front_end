import axios from 'axios'
import store from "@/store"
import router from "@/router"
import { handleToken } from "@/lib/token"
import { message } from "ant-design-vue"

const baseURL = process.env.NODE_ENV === "production" ? "" : "http://127.0.0.1:5000"

const requests = axios.create({
  baseURL: baseURL,
  timeout: 30000, // request timeout
})

requests.interceptors.request.use(
    config => {
      // do something before request is sent
      config.headers.Authorization = `Bearer ${store.state.accessToken}`
      return config
    },
    error => {
      // do something with request error
      console.error(error) // for debug
      return Promise.reject(error)
    }
)

requests.interceptors.response.use(
    response => {
      if (response.data.code === 401) return axios({
        url: `${baseURL}/oauth`,
        method: "put",
        data: {
          refresh_token: localStorage.getItem("refreshToken")
        },
        timeout: 30000,
      }).then(res => {
        if (res.data.code === 200) {
          const tokens = res.data.data
          handleToken(tokens)
          response.config.headers.Authorization = `Bearer ${tokens.access_token}`
          return axios(response.config)
        } else {
          localStorage.clear()
          const next = `${document.location.pathname}${document.location.hash}`
          router.push({ path: "/login", query: { next } })
          return response
        }
      }); else return response
    },
)

/**
 * 接口返回数据处理，此处只针对有返回情况
 * @param response // 接口返回消息
 */
const handlerData = response => {
  if (response.code === 200) {
    return response.data
  } else {
    message.error(response.msg)
    throw response
  }
}

requests.get = async (url, config = {}) => {
  const { data } = await requests({ url, method: 'get', ...config })
  return handlerData(data)
}

requests.post = async (url, config = {}) => {
  const { data } = await requests({ url, method: 'post', ...config })
  return handlerData(data)
}

requests.put = async (url, config = {}) => {
  const { data } = await requests({ url, method: 'put', ...config })
  return handlerData(data)
}

export default requests
