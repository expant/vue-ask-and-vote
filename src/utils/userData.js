const addUserDataToState = (authStore, data) => {
  authStore.userInfo.token = data.token
  authStore.userInfo.refreshToken = data.refreshToken
  authStore.userInfo.userId = data.userId
  authStore.userInfo.email = data.email
}

// TODO: Требуется пересмотреть способ хранения токенов на клиенте =================
const addUserDataToLocalStorage = (authStore) => {
  localStorage.setItem(
    'userData',
    JSON.stringify({
      token: authStore.userInfo.token,
      refreshToken: authStore.userInfo.refreshToken,
      userId: authStore.userInfo.userId,
      email: authStore.userInfo.email,
    }),
  )
}

const checkUserData = (authStore) => {
  const data = JSON.parse(localStorage.getItem('userData'))
  if (data) {
    addUserDataToState(authStore, data)
  }
}

export { addUserDataToLocalStorage, checkUserData }
