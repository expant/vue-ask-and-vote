const addUserDataToState = (authStore, data) => {
  authStore.userInfo.token = data.token
  authStore.userInfo.refreshToken = data.refreshToken
  authStore.userInfo.username = data.username
}

// TODO: Требуется пересмотреть способ хранения токенов на клиенте =================
const addUserDataToLocalStorage = (authStore) => {
  localStorage.setItem(
    'userData',
    JSON.stringify({
      token: authStore.userInfo.token,
      refreshToken: authStore.userInfo.refreshToken,
      username: authStore.userInfo.username,
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
