<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { addUserDataToLocalStorage } from '@/utils/userData'
import BaseButton from '@/components/BaseButton.vue'
import FormField from '@/components/FormField.vue'
import axiosApiInstance from '@/api'

// TODO: Переписать валидацию на Vee Validate

const authStore = useAuthStore()
const router = useRouter()
const uid = ref('')
const username = ref('')
const email = ref('')
const password = ref('')

const addUserToDb = async () => {
  uid.value = authStore.userInfo.userId
  const userData = { username: username.value, email: email.value }
  const pathToUser = `https://vue-surveys-96197-default-rtdb.europe-west1.firebasedatabase.app/users/${uid.value}.json`
  await axiosApiInstance.post(pathToUser, userData)
}

const signup = async () => {
  console.log(username.value)
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
  await addUserToDb()
  authStore.userInfo.username = username.value
  addUserDataToLocalStorage(authStore)
  router.push('/')
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Регистрация</h2>
    <form
      @submit.prevent="signup"
      class="flex flex-col gap-6 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <div v-if="authStore.error">
        <p class="text-red-500 text-xs">{{ authStore.error }}</p>
      </div>
      <form-field type="text" name="username" v-model="username">Придумайте ник</form-field>
      <form-field type="email" name="email" v-model="email">Email</form-field>
      <form-field type="password" name="password" v-model="password">Введите пароль 😅</form-field>
      <div>
        <base-button :loading="authStore.loader">Зарегистрироваться</base-button>
        <div class="text-right mt-2">
          Уже зарегистрирован?
          <router-link to="/signin" class="text-blue-500 hover:text-blue-600">Войти</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
