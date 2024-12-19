<script setup>
import { onMounted } from 'vue'
import CardsList from './CardsList.vue'
import { useCardsStore } from '@/stores/cards'

const cardsStore = useCardsStore()

onMounted(async () => {
  await cardsStore.getCardsByUser()
})
</script>

<template>
  <div class="w-full">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Мои опросы</h3>
    <!-- <CardsList /> -->
  </div>
</template>
