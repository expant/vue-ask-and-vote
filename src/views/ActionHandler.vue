<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  console.log('sdfsdfds')
  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')
  const params = `mode=${mode}&oobCode=${oobCode}`

  console.log(mode)

  // if (!mode) {
  //   router.push('/')
  //   return
  // }
  try {
    switch (mode) {
      case 'verifyEmail':
        await authStore.confirmEmailVerification(oobCode)
        console.log('profile')
        // router.push(`/profile`)
        break
      case 'resetPassword':
        router.push(`/password_reset?${params}`)
        break
      case 'recoverEmail':
        break
      default:
        throw new Error(`Unknown mode ${mode}`)
    }
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div>
    <h1 class="font-IBMPlexMono text-base text-green-600">Обработка действия...</h1>
  </div>
</template>
