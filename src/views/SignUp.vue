<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userSchema } from '@/schemas'
import { useAuthStore } from '@/stores/auth'
import { addUserDataToLocalStorage } from '@/utils/userData'
import { Field, Form, ErrorMessage } from 'vee-validate'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseNotification from '@/components/BaseNotification.vue'
import axiosApiInstance from '@/axios/request'

const authStore = useAuthStore()
const router = useRouter()

const uid = ref('')
const email = ref('')
const password = ref('')
const isNotificationVisible = ref(false)
const loadingVerify = ref(false)

const addUserToDb = async () => {
  uid.value = authStore.userInfo.userId
  const pathToUser = `https://vue-surveys-96197-default-rtdb.europe-west1.firebasedatabase.app/users/${uid.value}.json`
  await axiosApiInstance.post(pathToUser, { email: email.value })
}

const signup = async () => {
  try {
    await authStore.auth({ email: email.value, password: password.value }, 'signup')
    const response = await authStore.handleEmailVerification()
    if (response.data.email) {
      isNotificationVisible.value = true
    }
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get('mode')
  if (mode !== 'verifyEmail') {
    return
  }

  try {
    loadingVerify.value = true
    const response = await authStore.confirmEmailVerification()
    if (response) {
      await addUserToDb()
      addUserDataToLocalStorage(authStore)
      // router.push('/')
    }
  } catch (err) {
    console.error(err.response.data.error.message)
  } finally {
    loadingVerify.value = false
  }
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 px-5">
    <div v-if="!loadingVerify">
      <base-notification v-if="isNotificationVisible"
        >На <span class="font-bold">{{ email }}</span> было отправленно письмо с ссылкой на
        подтверждение!</base-notification
      >
      <h2 class="text-2xl text-green-600">Регистрация</h2>
      <Form
        @submit="signup"
        :validation-schema="userSchema"
        class="relative flex flex-col gap-8 w-full rounded-md p-5 bg-white border border-solid shadow-sm md:w-[400px]"
      >
        <div class="absolute right-5 top-5 text-sm text-red-500" v-if="authStore.error">
          {{ authStore.error }}
        </div>
        <div class="relative">
          <label class="inline-block mb-2">Email</label>
          <Field
            name="email"
            v-model="email"
            class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
          />
          <ErrorMessage name="email" class="absolute left-2 top-[85px] text-sm text-red-500" />
        </div>
        <div class="relative">
          <label class="inline-block mb-2">Введите пароль 😅</label>
          <Field
            name="password"
            type="password"
            v-model="password"
            class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
          />
          <ErrorMessage name="password" class="absolute left-2 top-[85px] text-sm text-red-500" />
        </div>
        <div class="mt-5">
          <base-button :loading="authStore.loader">Зарегистрироваться</base-button>
          <div class="text-right mt-2">
            Уже зарегистрирован?
            <router-link to="/signin" class="text-blue-500 hover:text-blue-600">Войти</router-link>
          </div>
        </div>
      </Form>
    </div>

    <ClipLoader v-if="loadingVerify" color="#16A34A" size="50px" />
  </div>
</template>
