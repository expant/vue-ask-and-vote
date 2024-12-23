<script setup>
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'
import EmailIcon from './icons/EmailIcon.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const props = defineProps({
  fieldName: {
    type: String,
    required: false,
  },
  view: {
    type: String,
    default: 'passwordReset',
  },
})

const contentText = ref({
  email:
    'Проверьте свою электронную почту на наличие ссылки для сброса пароля. Если она не появится в течение нескольких минут, проверьте папку со спамом.',
  newPassword: 'Новый пароль успешно создан!',
  error: authStore.error,
})
</script>

<template>
  <div
    class="relative flex flex-col gap-6 w-96 rounded-md p-5 bg-white border border-solid shadow-sm md:w-96"
  >
    <p class="text-base text-center text-gray-600" v-if="view === 'passwordReset'">
      {{ contentText[fieldName] }}
    </p>

    <div v-if="view === 'emailVerification'">
      <h3 class="text-xl text-gray-800">Подвердите свой email</h3>
      <p class="text-base text-center text-gray-600">
        Мы выслали вам на почту ссылку для подтверждения!
      </p>
    </div>

    <EmailIcon class="self-center" v-if="fieldName === 'email' || view === 'emailVerification'" />
    <base-button v-if="view === 'passwordReset'">
      <router-link to="/signin">Вернутся к авторизации</router-link>
    </base-button>
  </div>
</template>
