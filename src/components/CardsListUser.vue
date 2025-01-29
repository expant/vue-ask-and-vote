<script setup>
import { onMounted } from 'vue'
import { PollList } from '@polls'
import { useCardsStore } from '@/stores/cards'

const cardsStore = useCardsStore()

onMounted(async () => {
  await cardsStore.getCardsByUser()
})
</script>

<template>
  <div class="w-full">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Мои опросы</h3>
    <!-- TODO: Добавить вывод списка карточек юзера -->
  </div>
</template>
