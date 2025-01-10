<script setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BaseHideContent from './BaseHideContent.vue'

const authStore = useAuthStore()
const emailVerified = ref(false)
const fields = ref({
  email: '',
  username: '',
  // password: '',
})
const hideContentProps = ref({
  text: 'Пожалуйста, подтвердите ваш email, чтобы продолжить',
  buttonText: 'Подтвердить email',
  actionName: 'confirmEmail',
  styles: {
    rounded: 'rounded-lg',
    bgColor: 'bg-slate-800',
    bgOpacity: 'bg-opacity-90',
  },
})

const updateProfile = () => {
  if (!emailVerified.value) {
    console.log('email not verified')
    return
  }

  const fieldsList = Object.entries(fields.value)
  const filledFields = fieldsList.filter(([_, field]) => field)

  if (filledFields.length === 0) {
    console.log('Должно быть заполнено хотя бы одно поле!')
    return
  }

  filledFields.forEach(async ([key, value]) => {
    switch (key) {
      case 'email':
        console.log(key, value)
        const response = await authStore.changeEmail(value)
        fields.value.email = value
        console.log(response)
        break
      case 'username':
        console.log('Здесь должно происходить обновление username')
        break
      default:
        throw new Error(`Неизвестное поле: ${key}`)
    }
  })
}

const handleEmailConfirmation = async () => {
  try {
    await authStore.handleEmailVerification()
  } catch (err) {
    console.error('Ошибка при подтверждении email:', err)
  }
  // Менять контент в компоненте BaseHideContent после того как успешно срабатывает запрос
}

onMounted(async () => {
  const user = await authStore.getUserData()

  fields.value.email = user.email
  emailVerified.value = user.emailVerified
})
</script>

<template>
  <div class="relative bg-white p-6 border border-solid border-gray-200 rounded-lg shadow-sm">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Редактировать профиль</h3>

    <!-- TODO: Добавить иконки к input -->
    <!-- TODO: Реализовать форму через vee-validate -->
    <!-- TODO: Реализовать возможность сохранения аватара в Firebase Storage -->
    <!-- TODO: Реализовать возможность добавления юзернейма -->
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="fields.email"
          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
        />
      </div>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700"
          >Имя пользователя</label
        >
        <input
          type="text"
          id="username"
          v-model="fields.username"
          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
        />
      </div>

      <!-- <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Новый пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
        />
      </div> -->
      <!-- <div>
        <label for="avatar" class="block text-sm font-medium text-gray-700">Аватар</label>
        <input type="file" id="avatar" accept="image/*" class="mt-1 block w-full" />
      </div>
      <div>
        <label for="headerBackground" class="block text-sm font-medium text-gray-700"
          >Фон шапки</label
        >
        <input type="file" id="headerBackground" accept="image/*" class="mt-1 block w-full" />
      </div> -->
      <div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Сохранить
        </button>
      </div>
    </form>

    <BaseHideContent
      v-if="!emailVerified"
      :text="hideContentProps.text"
      :button-text="hideContentProps.buttonText"
      :styles="hideContentProps.styles"
      :actionName="hideContentProps.actionName"
      @confirm-email="handleEmailConfirmation"
    />
  </div>
</template>
