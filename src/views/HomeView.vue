<script setup>
import QuestionCards from '@/components/QuestionCards.vue'
import TheHeader from '@/components/TheHeader.vue'
import AddCardModal from '@/components/AddCardModal.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const showModal = ref(false)
</script>

<template>
  <div class="container my-0 mx-auto font-IBMPlexMono">
    <TheHeader />
    <main class="p-5">
      <!-- Button to open the modal -->
      <button
        v-if="authStore.userInfo.token"
        class="px-4 py-2 mb-8 bg-green-600 text-white rounded hover:bg-green-800 transition"
        @click="showModal = !showModal"
      >
        Создать опрос
      </button>

      <QuestionCards />
    </main>
    <AddCardModal :showModal="showModal" @hide-modal="showModal = false" />
  </div>
</template>
