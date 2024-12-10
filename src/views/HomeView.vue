<script setup>
import QuestionCards from '@/components/QuestionCards.vue'
import { useAuthStore } from '@/stores/auth'
import LogOut from '@/components/LogOut.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="container my-0 mx-auto font-IBMPlexMono">
    <header class="flex justify-around items-center py-10">
      <h1 class="font-bold text-3xl text-green-500">Ask&Vote</h1>
      <div v-if="!authStore.userInfo.token" class="flex items-center gap-5">
        <router-link to="/signin" class="font-medium text-xl text-gray-600 hover:text-gray-700"
          >Войти</router-link
        >
        <router-link
          to="/signup"
          class="transition font-medium text-xl text-green-600 px-3 py-2 border border-solid border-green-600 rounded-md hover:bg-green-600 hover:text-white"
          >Зарегистрироваться</router-link
        >
      </div>
      <div v-else class="flex items-center gap-5">
        <router-link to="/profile" class="font-medium text-xl text-gray-600 hover:text-gray-700"
          >Профиль</router-link
        >
        <LogOut />
      </div>
    </header>
    <main class="flex justify-center">
      <QuestionCards />
    </main>
  </div>
</template>

<style scoped></style>
