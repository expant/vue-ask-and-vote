import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router'

const axiosApiInstance = axios.create()
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

const insertTokenIntoUrl = (config) => {
  const url = config.url

  if (url.includes('signInWithPassword') || url.includes('signUp')) {
    return config
  }

  const authStore = useAuthStore()
  let params = new URLSearchParams()
  params.append('auth', authStore.userInfo.token)
  config.params = params
  return config
}

const refreshTokenByError = async (error) => {
  const authStore = useAuthStore()
  const originalRequest = error.config

  if (error.response.status !== 401 || originalRequest._retry) {
    return Promise.reject(error)
  }

  originalRequest._retry = true

  try {
    const refresh_token = JSON.parse(localStorage.getItem('userTokens')).refreshToken
    const newTokens = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
      {
        grant_type: 'refresh_token',
        refresh_token,
      },
    )
    authStore.userInfo.token = newTokens.data.access_token
    authStore.userInfo.refreshToken = newTokens.data.refresh_token
    localStorage.setItem(
      'userTokens',
      JSON.stringify({
        token: newTokens.data.access_token,
        refreshToken: newTokens.data.refresh_token,
      }),
    )
  } catch (err) {
    localStorage.removeItem('userTokens')
    router.push('/signin')
    authStore.userInfo.token = ''
    authStore.userInfo.refreshToken = ''
  }
}

axiosApiInstance.interceptors.request.use(insertTokenIntoUrl)
axiosApiInstance.interceptors.response.use((response) => response, refreshTokenByError)

export default axiosApiInstance
