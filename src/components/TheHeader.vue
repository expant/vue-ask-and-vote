<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogOut from '@/components/LogOut.vue'

const authStore = useAuthStore()
const userMenu = ref(false)
</script>

<template>
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
      <div>{{ authStore.userInfo.email }}</div>
      <div class="relative">
        <div
          contextmenu="popup-usermenu"
          class="rounded-full w-7 h-7 bg-gray-300 border border-solid border-gray-500 hover:border-gray-600 cursor-pointer"
          @click="userMenu = !userMenu"
        ></div>
        <menu
          v-show="userMenu"
          type="context"
          id="popup-usermenu"
          class="absolute flex flex-col gap-2 top-10 right-0 p-2.5 border border-solid border-gray-300 rounded-md bg-white"
        >
          <router-link to="/profile" class="font-medium text-base text-gray-600 hover:text-gray-700"
            >Профиль</router-link
          >
          <LogOut />
        </menu>
      </div>
    </div>
  </header>
</template>
