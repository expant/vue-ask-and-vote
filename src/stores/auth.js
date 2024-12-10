import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosApiInstance from '@/api'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

const getErrorMessage = (err) => {
  const message = err.response.data.error.message
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'Email уже существует'
    case 'EMAIL_NOT_FOUND':
      return 'Email не найден'
    case 'INVALID_PASSWORD':
      return 'Invalid password'
    case 'WEAK_PASSWORD : Password should be at least 6 characters':
      return 'Пароль должен содержать минимум 6 символов'
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Неправильный логин или пароль'
    default:
      throw new Error(`Unknown error message ${message}`)
  }
}

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
  })
  const error = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const stringUrlType = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true

    try {
      const response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrlType}?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true,
        },
      )

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
        }),
      )
    } catch (err) {
      error.value = getErrorMessage(err)
      throw error.value
    } finally {
      loader.value = false
    }
  }

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
    }
  }

  return { auth, userInfo, error, loader, logout }
})
