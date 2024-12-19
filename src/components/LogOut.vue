<script setup>
import LogOutIconItem from './icons/LogOutIconItem.vue'
import { useAuthStore } from '@/stores/auth'
import { useCardsStore } from '@/stores/cards'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const cardsStore = useCardsStore()
const router = useRouter()

const logout = () => {
  const currentViewPath = router.currentRoute.value.path
  authStore.logout()
  localStorage.removeItem('userData')

  if (currentViewPath === '/') {
    cardsStore.getAllCards()
  }
}
</script>

<template>
  <button class="flex items-center gap-2" @click.prevent="logout">
    <span class="font-medium text-base text-gray-600 hover:text-gray-700">Выйти</span>
    <LogOutIconItem size="15px" />
  </button>
</template>
