<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { emailRules } from '@/schemas'
import { useAuthStore } from '@/stores/auth'
import { Field, Form, ErrorMessage } from 'vee-validate'
import BaseButton from '@/components/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')

const submitForm = () => {}
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Сбросить пароль</h2>

    <Form
      @submit="submitForm"
      class="relative flex flex-col gap-8 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
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
  </div>
</template>
