<script setup>
import LogOutIconItem from './icons/LogOutIconItem.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
}
</script>

<template>
  <button class="flex items-center gap-2" @click.prevent="logout">
    <span class="font-medium text-xl text-gray-600 hover:text-gray-700">Выйти</span>
    <LogOutIconItem />
  </button>
</template>
