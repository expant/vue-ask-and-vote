<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import PasswordResetForm from '@/components/PasswordResetForm.vue'
import PasswordResetMessage from '@/components/AuthMessage.vue'

const authStore = useAuthStore()
const email = ref('')
const newPassword = ref('')
const stateStrings = ref({
  fillingEmail: 'email',
  fillingNewPassword: 'new password',
  sendingPasswordResetEmail: 'sending password reset email',
  newPasswordSaved: 'new password saved',
})
const resetProcess = ref(stateStrings.value.fillingEmail)

const submitForm = async () => {
  try {
    if (resetProcess.value === stateStrings.value.fillingEmail) {
      await authStore.handlePasswordReset(email.value, stateStrings.value.fillingEmail)
      resetProcess.value = stateStrings.value.sendingPasswordResetEmail
    }

    if (resetProcess.value === stateStrings.value.fillingNewPassword) {
      await authStore.handlePasswordReset(newPassword.value, stateStrings.value.fillingNewPassword)
      resetProcess.value = stateStrings.value.newPasswordSaved
    }
  } catch (err) {
    resetProcess.value = 'error'
  }
}

const setFillingState = () => {
  const currentUrl = window.location.href
  const hasParams = currentUrl.includes('?')
  if (hasParams) {
    resetProcess.value = stateStrings.value.fillingNewPassword
  }
}

onMounted(() => {
  setFillingState()
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8">
    <h2 class="text-2xl text-green-600">Сбросить пароль</h2>

    <PasswordResetForm
      v-if="resetProcess === stateStrings.fillingEmail"
      v-model="email"
      field-name="email"
      @submit-form="submitForm"
    />
    <PasswordResetForm
      v-if="resetProcess === stateStrings.fillingNewPassword"
      v-model="newPassword"
      field-name="newPassword"
      @submit-form="submitForm"
    />
    <PasswordResetMessage
      field-name="email"
      v-if="resetProcess === stateStrings.sendingPasswordResetEmail"
    />
    <PasswordResetMessage
      field-name="newPassword"
      v-if="resetProcess === stateStrings.newPasswordSaved"
    />
    <PasswordResetMessage field-name="error" v-if="resetProcess === 'error'" />
  </div>
</template>
