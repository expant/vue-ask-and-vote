<script setup>
import axiosApiInstance from '@/api'
import QuestionCardsItem from '@/components/QuestionCardsItem.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()
const cards = ref([])
const showLoader = ref(false)

// FIXME: fix db rules
const url = `https://vue-surveys-96197-default-rtdb.europe-west1.firebasedatabase.app/questions`

const getAllCards = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstance.get(url)
    cards.value = response.data
  } catch (err) {
    console.log(err.response)
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllCards()
})
</script>

<template>
  <ul class="flex flex-col gap-7">
    <ClipLoader v-if="showLoader" />
    <QuestionCardsItem
      v-for="(card, i) in cards"
      :key="i"
      :text="card.text"
      :options="card.options"
    />
  </ul>
</template>
