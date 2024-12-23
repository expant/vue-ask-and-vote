<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthMessage from '@/components/AuthMessage.vue'

const authStore = useAuthStore()
</script>

<template>
  <AuthMessage view="emailVerification" />
</template>
