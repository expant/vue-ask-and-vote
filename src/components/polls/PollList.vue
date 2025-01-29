<script setup>
import PollItem from '@polls/PollItem.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { ref, onMounted } from 'vue'
import { useCardsStore } from '@/stores/cards'

const cardsStore = useCardsStore()

onMounted(() => {
  cardsStore.getAllCards()
})
</script>

<template>
  <ul class="w-full flex flex-col gap-7 lg:w-1/2">
    <ClipLoader v-if="cardsStore.loader" />
    <PollItem
      v-for="(card, i) in cardsStore.cards"
      :key="i"
      :id="card.id"
      :text="card.text"
      :options="card.options"
      :createdAt="card.createdAt"
      :totalVotes="card.totalVotes"
      :voterIds="card.voterIds"
    />
  </ul>
</template>
