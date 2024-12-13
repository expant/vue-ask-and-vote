<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col w-full">
    <!-- Header with background -->
    <div class="w-full h-48 bg-green-500"></div>

    <!-- Profile content -->
    <div class="container mx-auto px-4 -mt-24">
      <div
        class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6"
      >
        <!-- Avatar -->
        <div
          class="w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg"
        >
          <!-- Replace with actual avatar image if available -->
          <div
            class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold"
          >
            {{ authStore.userInfo.username ? authStore.userInfo.username[0].toUpperCase() : 'U' }}
          </div>
        </div>

        <!-- User info -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ authStore.userInfo.username }}</h2>
          <p class="text-gray-600">{{ authStore.userInfo.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
