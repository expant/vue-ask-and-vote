<script setup>
import QuestionCards from '@/components/QuestionCards.vue'
</script>

<template>
  <div class="container my-0 mx-auto font-IBMPlexMono">
    <header class="flex justify-around items-center py-10">
      <h1 class="font-bold text-3xl text-green-500">Ask & Vote</h1>
      <div>
        <button class="font-medium text-xl text-gray-600 hover:text-gray-700">Профиль</button>
      </div>
    </header>
    <main class="flex justify-center">
      <QuestionCards />
    </main>
  </div>
</template>

<style scoped></style>
