import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import axiosApiInstance from '@/axios/request'

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
    case 'INVALID_LOGIN_CREDENTIALS':
      return 'Неправильный логин или пароль'
    case 'INVALID_OOB_CODE' || 'EXPIRED_OOB_CODE':
      return 'Ссылка уже использовалась или её срок действия истек!'
    case 'USER_NOT_FOUND':
      return 'Нет записи пользователя. Пользователь мог быть удален.'
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

  const setUserInfo = (data) => {
    userInfo.value = {
      token: data.idToken,
      email: data.email,
      userId: data.localId,
      refreshToken: data.refreshToken,
    }
  }

  const handleEmailVerification = async () => {
    const payload = { requestType: 'VERIFY_EMAIL', idToken: userInfo.value.token }
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`
    try {
      return await axiosApiInstance.post(url, payload)
    } catch (err) {
      error.value = getErrorMessage(err)
      console.error(err)
    }
  }

  const confirmEmailVerification = async () => {
    console.log('userInfo: ', userInfo.value)
    const searchParams = new URLSearchParams(window.location.search)
    const oobCode = searchParams.get('oobCode')
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`
    try {
      return await axiosApiInstance.post(url, { oobCode })
    } catch (err) {
      error.value = getErrorMessage(err)
      console.error(err)
    }
  }

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
      setUserInfo(response.data)

      console.log('userInfo: ', userInfo.value)

      if (type === 'signup') {
        handleEmailVerification(response.data)
        return
      }
    } catch (err) {
      error.value = getErrorMessage(err)
      throw error.value
    } finally {
      loader.value = false
    }
  }

  // TODO: Функция изменения email

  // TODO: Функция изменения пароля

  // Password reset with email
  const handlePasswordReset = async (data, step) => {
    loader.value = true

    try {
      if (step === 'email') {
        const payload = { requestType: 'PASSWORD_RESET', email: data }
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`
        await axiosApiInstance.post(url, payload)
      }

      if (step === 'new password') {
        const searchParams = new URLSearchParams(window.location.search)
        const oobCode = searchParams.get('oobCode')
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${apiKey}`
        await axiosApiInstance.post(url, { oobCode })
        await axiosApiInstance.post(url, { oobCode, newPassword: data })
      }
    } catch (err) {
      error.value = getErrorMessage(err)
      throw new Error(err)
    } finally {
      loader.value = false
    }
  }

  // TODO: Функция удаления аккаунта

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
    }
  }

  return {
    auth,
    userInfo,
    error,
    loader,
    logout,
    handlePasswordReset,
    handleEmailVerification,
    confirmEmailVerification,
  }
})
