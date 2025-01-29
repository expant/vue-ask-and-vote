<script setup>
import axiosApiInstance from '@/axios/request'
import { useAuthStore } from '@/stores/auth'
import { useCardsStore } from '@/stores/cards'
import { ref } from 'vue'

// TODO: Добавить в форму возможность добавлять #теги

const MAX_NUM_OPTIONS = 10
const authStore = useAuthStore()
const cardsStore = useCardsStore()
const name = ref('')
const options = ref([
  { text: '', id: 1 },
  { text: '', id: 2 },
])

const props = defineProps({
  showModal: { type: Boolean, default: false },
})
const emit = defineEmits('hideModal')

const addOption = () => {
  if (options.value.length >= MAX_NUM_OPTIONS) {
    return
  }

  const lastItem = options.value[options.value.length - 1]
  options.value.push({ text: '', id: lastItem.id + 1 })
}

const submitForm = async () => {
  const formattedOptions = options.value.map((option) => ({
    text: option.text,
    votes: 0,
  }))
  const data = {
    text: name.value,
    options: formattedOptions,
    createdAt: new Date().toISOString(),
    authorId: authStore.userInfo.userId,
    voterIds: [],
    totalVotes: 0,
  }

  cardsStore.addNewCard(data)
  emit('hideModal')
  // TODO: сброс формы после создания опроса
}
</script>

<template>
  <div>
    <!-- TODO: Изменить внешний вид формы, прописать валидацию -->
    <!-- Modal -->
    <div v-if="props.showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Add your icon here -->
                <svg
                  class="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Новый опрос
                </h3>
                <div class="mt-2">
                  <form @submit.prevent="submitForm">
                    <div class="space-y-4">
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700"
                          >Вопрос</label
                        >
                        <input
                          type="text"
                          id="name"
                          v-model="name"
                          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
                        />
                      </div>
                      <div v-for="option in options" :key="option.id">
                        <label :for="option.id" class="block text-sm font-medium text-gray-700"
                          >Вариант {{ option.id }}</label
                        >
                        <input
                          type="text"
                          :id="option.id"
                          v-model="option.text"
                          class="mt-1 block w-full px-2 py-1 rounded border border-solid border-gray-200 outline-none"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          @click="addOption"
                          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Добавить вариант
                        </button>
                      </div>
                    </div>
                    <div class="flex gap-2 mt-5 sm:mt-6">
                      <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Создать
                      </button>
                      <button
                        type="button"
                        @click="$emit('hideModal')"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-900 focus:outline-none"
                      >
                        Закрыть
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
