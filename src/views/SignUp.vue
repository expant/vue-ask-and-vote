<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import axios from 'axios'
import { useRouter } from 'vue-router'

// TODO: Переписать валидацию на Vee Validate

// const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  console.log(email, password)
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log(data)
      router.push('/')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Регистрация</h2>
    <form
      @submit.prevent="register"
      class="flex flex-col gap-6 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <!-- <div>
        <label for="username" class="inline-block mb-2">Придумай ник</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          v-model="username"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
      </div> -->
      <div>
        <label for="email" class="inline-block mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          v-model="email"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
      </div>
      <div>
        <label for="password" class="inline-block mb-2">Введи пароль 😅</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          v-model="password"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
      </div>
      <div>
        <button
          type="submit"
          class="transition w-full font-medium text-xl text-white bg-green-600 rounded-md px-4 py-2.5 hover:bg-green-700"
        >
          Зарегистрироваться
        </button>
        <div class="text-right mt-2">
          Уже зарегистрирован?
          <router-link to="/signin" class="text-blue-500 hover:text-blue-600"> Войти </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
