<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import EmailIcon from '@/components/icons/EmailIcon.vue'

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
  if (resetProcess.value === stateStrings.value.fillingEmail) {
    await authStore.SendPasswordResetEmail(email.value)
    resetProcess.value = stateStrings.value.sendingPasswordResetEmail
  }

  if (resetProcess.value === stateStrings.value.fillingNewPassword) {
    await authStore.changePassword(newPassword.value)
    resetProcess.value = stateStrings.value.newPasswordSaved
  }
}

const setFillingState = () => {
  const currentUrl = window.location.href
  const hasParams = currentUrl.includes('?');
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

    <Form
      v-if="resetProcess === stateStrings.fillingEmail"
      @submit="submitForm"
      class="relative flex flex-col gap-8 max-w-1/4 font-IBMPlexMono rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <div class="absolute right-5 top-5 text-sm text-red-500" v-if="authStore.error">
        {{ authStore.error }}
      </div>
      <div class="relative">
        <label class="inline-block mb-2">Email</label>
        <Field
          name="email"
          v-model="email"
          :rules="emailRules"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
        <ErrorMessage name="email" class="absolute left-2 top-[85px] text-sm text-red-500" />
        <div class="mt-10">
          <base-button :loading="authStore.loader">Отправить</base-button>
        </div>
      </div>
    </Form>

    <Form
      v-if="resetProcess === stateStrings.fillingNewPassword"
      @submit="submitForm"
      class="relative flex flex-col gap-8 max-w-1/4 font-IBMPlexMono rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <div class="absolute right-5 top-5 text-sm text-red-500" v-if="authStore.error">
        {{ authStore.error }}
      </div>
      <div class="relative">
        <label class="inline-block mb-2">Новый пароль</label>
        <Field
          name="newPassword"
          type="password"
          v-model="newPassword"
          :rules="passwordRules"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
        <ErrorMessage name="newPassword" class="absolute left-2 top-[85px] text-sm text-red-500" />
        <div class="mt-10">
          <base-button :loading="authStore.loader">Отправить</base-button>
        </div>
      </div>
    </Form>

    <div 
      v-if="resetProcess === stateStrings.sendingPasswordResetEmail" 
      class="relative flex flex-col gap-6 w-96 rounded-md p-5 bg-white border border-solid shadow-sm md:w-96"
    >
      <p class="text-base text-center text-gray-600">       
        Проверьте свою электронную почту на наличие ссылки для сброса пароля. Если она не появится в течение нескольких минут, проверьте папку со спамом.
      </p>
      <EmailIcon class="self-center" />
      <base-button>
        <router-link to="/signin">Вернутся к авторизации</router-link>
      </base-button>
    </div>

    <div 
      v-if="resetProcess === stateStrings.newPasswordSaved" 
      class="relative flex flex-col gap-6 w-96 rounded-md p-5 bg-white border border-solid shadow-sm md:w-96"
    >
      <p class="text-base text-center text-gray-600">       
        Новый пароль успешно создан!
      </p>
      <base-button>
        <router-link to="/signin">Вернутся к авторизации</router-link>
      </base-button>
    </div>
  </div>
</template>
