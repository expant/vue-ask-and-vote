import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

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
    expiresIn: '',
  })
  const error = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const stringUrlType = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true

    try {
      const response = await axios.post(
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
        expiresIn: response.data.expiresIn,
      }
      localStorage.setItem('userTokens', JSON.stringify({ 
        token: userInfo.value.token, 
        refreshToken: userInfo.value.refreshToken,
        expiresIn: userInfo.value.expiresIn,
      }))
    } catch (err) {
      error.value = getErrorMessage(err)
      throw error.value;
    } finally {
      loader.value = false
    }
  }

  return { auth, userInfo, error, loader }
})
