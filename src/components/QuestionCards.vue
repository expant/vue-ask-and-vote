<script setup>
import axiosApiInstance from '@/axios/request'
import QuestionCardsItem from '@/components/QuestionCardsItem.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted, watch } from 'vue'

const authStore = useAuthStore()
const cards = ref([])
const showLoader = ref(false)
const databaseUrl = import.meta.env.VITE_FIREBASE_DB_QUESTIONS_URL + '.json'

const getAllCards = async () => {
  showLoader.value = true

  try {
    const response = await axiosApiInstance.get(databaseUrl)
    const data = Object.entries(response.data)

    cards.value = data.map(([id, card]) => ({
      text: card.text,
      options: card.options,
      createdAt: card.createdAt,
      totalVotes: card.totalVotes || 0,
      voterIds: card.voterIds || [],
      id,
    }))
  } catch (err) {
    console.error(err)
  } finally {
    showLoader.value = false
  }
}

onMounted(() => {
  getAllCards()
})

// watch(authStore.userInfo, getAllCards())
</script>

<template>
  <ul class="w-full flex flex-col gap-7 md:w-1/3">
    <ClipLoader v-if="showLoader" />
    <QuestionCardsItem
      v-for="(card, i) in cards"
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
