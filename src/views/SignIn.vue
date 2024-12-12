<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { addUserDataToLocalStorage } from '@/utils/userData'
import BaseButton from '@/components/BaseButton.vue'
import FormField from '@/components/FormField.vue'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const signin = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signin')
  const pathToUser = `${import.meta.env.VITE_FIREBASE_DB_USERS_URL}/${authStore.userInfo.userId}.json`
  const response = await axios.get(pathToUser)
  const username = Object.entries(response.data)[0][1].username
  authStore.userInfo.username = username
  addUserDataToLocalStorage(authStore)
  router.push('/')
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Авторизация</h2>
    <form
      @submit.prevent="signin"
      class="flex flex-col gap-6 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <div class="text-red-500 text-base" v-if="authStore.error">{{ authStore.error }}</div>
      <form-field type="email" name="email" v-model="email">Email</form-field>
      <form-field type="password" name="password" v-model="password">Введите пароль 😅</form-field>
      <div>
        <base-button :loading="authStore.loader">Войти</base-button>
        <div class="text-right mt-2">
          В первый раз тут?
          <router-link to="/signup" class="text-blue-500 hover:text-blue-600">
            Зарегистрироваться
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
