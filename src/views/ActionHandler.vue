<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')
  const params = `mode=${mode}&oobCode=${oobCode}`

  if (!mode) {
    router.push('/')
    return
  }

  switch (mode) {
    case 'verifyEmail':
      // router.push(`/signup?${params}`)
      break
    case 'resetPassword':
      router.push(`/password_reset?${params}`)
      break
    case 'recoverEmail':
      break
    default:
      throw new Error(`Unknown mode ${mode}`)
  }
})
</script>

<template>
  <div>
    <h1 class="font-IBMPlexMono text-base text-green-600">Обработка действия...</h1>
  </div>
</template>
