<script setup>
import checkToken from '@/utils/checkToken.js'
import { useAuthStore } from '@/stores/auth'

checkToken(useAuthStore())
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
