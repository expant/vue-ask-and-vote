<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
// const data = ref([])
// const loading = ref(false)
// const error = ref(null)
// const usersUrl = 'https://af8aa88a9935b925.mokky.dev/users'

// const fetchData = async () => {
//   try {
//     loading.value = true
//     const response = await axios.get(usersUrl, { email, password })
//     data.value = response.data
//   } catch (err) {
//     error.value = err.message
//   } finally {
//     loading.value = false
//   }

//   console.log(data.value)
// }

// onMounted(fetchData)
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Авторизация</h2>
    <form
      @submit.prevent="fetchData"
      class="flex flex-col gap-6 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
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
        <label for="password" class="inline-block mb-2">Введите пароль 😅</label>
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
          class="transition w-full font-medium text-xl text-white bg-green-600 rounded-md px-4 py-2.5 hover:bg-green-700"
        >
          Войти
        </button>
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

<style scoped></style>
