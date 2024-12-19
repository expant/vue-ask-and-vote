<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import EditProfile from '@/components/EditProfile.vue'
import CardsListUser from '@/components/CardsListUser.vue'

const authStore = useAuthStore()

const currentTab = ref('EditProfile')
const tabs = { EditProfile, CardsListUser }
const contextTabs = {
  EditProfile: 'Редактировать профиль',
  CardsListUser: 'Мои опросы',
}
const firstLetter = authStore.userInfo.email[0].toUpperCase()
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
            {{ firstLetter }}
          </div>
        </div>

        <!-- User info -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ authStore.userInfo.email }}</h2>
          <p class="text-gray-600">{{ authStore.userInfo.email }}</p>
        </div>
      </div>

      <!-- Router link to home page -->
      <div class="flex gap-7 items-center mt-8">
        <router-link
          to="/"
          class="inline-block px-6 py-2 text-sm font-medium text-green-500 bg-white border border-solid border-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors duration-300"
        >
          Назад
        </router-link>
        <div class="flex gap-4">
          <button
            v-for="(_, tab) in tabs"
            :key="tab"
            :class="[
              'text-sm font-medium hover:text-black',
              currentTab === tab ? 'text-black' : 'text-green-600',
            ]"
            @click="currentTab = tab"
          >
            {{ contextTabs[tab] }}
          </button>
        </div>
      </div>

      <KeepAlive>
        <component :is="tabs[currentTab]" class="mt-4"></component>
      </KeepAlive>
    </div>
  </div>
</template>
