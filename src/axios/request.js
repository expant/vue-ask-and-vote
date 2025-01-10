import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

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
  const isInvalidIdToken = error.response.data.error.message === 'INVALID_ID_TOKEN'

  if (
    // (error.response.status === 400 && !originalRequest._retry) ||
    isInvalidIdToken &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true

    try {
      const refresh_token = JSON.parse(localStorage.getItem('userData')).refreshToken
      const newTokens = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
        {
          grant_type: 'refresh_token',
          refresh_token,
        },
      )

      console.log('sdfsdfsd')

      authStore.userInfo.token = newTokens.data.access_token
      authStore.userInfo.refreshToken = newTokens.data.refresh_token
      localStorage.setItem(
        'userData',
        JSON.stringify({
          token: newTokens.data.access_token,
          refreshToken: newTokens.data.refresh_token,
          email: authStore.userInfo.email,
          emailVerified: authStore.userInfo.emailVerified,
        }),
      )
    } catch (err) {
      console.error(err)
      localStorage.removeItem('userData')
      router.push('/signin')
      authStore.userInfo.token = ''
      authStore.userInfo.refreshToken = ''
    }
  } else {
    return Promise.reject(error)
  }
}

axiosApiInstance.interceptors.request.use(insertTokenIntoUrl)
axiosApiInstance.interceptors.response.use((response) => response, refreshTokenByError)

export default axiosApiInstance
