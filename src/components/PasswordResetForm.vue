<script setup>
import { emailRules } from '@/schemas'
import { passwordRules } from '@/schemas'
import { useAuthStore } from '@/stores/auth';
import { Field, Form, ErrorMessage } from 'vee-validate';
import BaseButton from './BaseButton.vue';
import { computed } from 'vue';

const authStore = useAuthStore()

const props = defineProps({
  fieldName: {
    type: String,
    required: true
  },
})

const getRulesByFieldName = computed(
  () => props.fieldName === 'email' ? emailRules : passwordRules
)
</script>

<template>
  <Form
    @submit="submitForm"
    class="relative flex flex-col gap-8 max-w-1/4 font-IBMPlexMono rounded-md p-5 bg-white border border-solid shadow-sm"
  >
    <div class="absolute right-5 top-5 text-sm text-red-500" v-if="authStore.error">
      {{ authStore.error }}
    </div>
    <div class="relative">
      <label class="inline-block mb-2">Email</label>
      <Field
        :name="fieldName"
        v-model="email"
        :rules="getRulesByFieldName"
        class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
      />
      <ErrorMessage :name="fieldName" class="absolute left-2 top-[85px] text-sm text-red-500" />
      <div class="mt-10">
        <base-button :loading="authStore.loader">Отправить</base-button>
      </div>
    </div>
  </Form>
</template>