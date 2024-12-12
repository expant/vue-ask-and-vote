<script setup>
import { checkUserData } from '@/utils/userData.js'
import { useAuthStore } from '@/stores/auth'

checkUserData(useAuthStore())
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
