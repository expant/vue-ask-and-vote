<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Авторизация</h2>
    <form
      action="#"
      @submit.prevent="console.log(email, password)"
      class="flex flex-col gap-6 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <!-- <div>
        <label for="nickname">Придумай ник 😅</label>
        <input type="text" id="nickname" name="nickname" />
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
      <button
        class="transition font-medium text-xl text-white bg-green-600 rounded-md px-4 py-2.5 hover:bg-green-700"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped></style>
