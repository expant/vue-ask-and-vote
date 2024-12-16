<script setup>
import { ref } from 'vue'

const email = ref('')
const username = ref('')
const password = ref('')
</script>

<template>
  <div class="bg-white p-6 border border-solid border-gray-200 rounded-lg shadow-sm">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Редактировать профиль</h3>

    <!-- TODO: Добавить иконки к input -->
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
        />
      </div>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700"
          >Имя пользователя</label
        >
        <input
          type="text"
          id="username"
          v-model="username"
          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Новый пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
        />
      </div>
      <div>
        <label for="avatar" class="block text-sm font-medium text-gray-700">Аватар</label>
        <input type="file" id="avatar" accept="image/*" class="mt-1 block w-full" />
      </div>
      <div>
        <label for="headerBackground" class="block text-sm font-medium text-gray-700"
          >Фон шапки</label
        >
        <input type="file" id="headerBackground" accept="image/*" class="mt-1 block w-full" />
      </div>
      <div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>
