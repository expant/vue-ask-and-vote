<script setup>
import LogOutIconItem from './icons/LogOutIconItem.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userData')
}
</script>

<template>
  <button class="flex items-center gap-2" @click.prevent="logout">
    <span class="font-medium text-base text-gray-600 hover:text-gray-700">Выйти</span>
    <LogOutIconItem size="15px" />
  </button>
</template>
