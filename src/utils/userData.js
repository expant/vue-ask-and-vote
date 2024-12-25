const addUserDataToState = (authStore, data) => {
  authStore.userInfo.token = data.token
  authStore.userInfo.refreshToken = data.refreshToken
  authStore.userInfo.userId = data.userId
  authStore.userInfo.email = data.email
}

// TODO: Требуется пересмотреть способ хранения токенов на клиенте =================
const addUserDataToLocalStorage = (userData) => {
  localStorage.setItem(
    'userData',
    JSON.stringify({
      token: userData.token,
      refreshToken: userData.refreshToken,
      userId: userData.userId,
      email: userData.email,
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
