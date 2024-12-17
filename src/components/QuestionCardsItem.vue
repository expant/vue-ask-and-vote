<script setup>
import { onMounted, ref, watch } from 'vue'
import axiosApiInstance from '@/api'
import PersonIcon from './icons/PersonIcon.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  totalVotes: {
    type: Number,
    required: true,
  },
  voterIds: {
    type: Array,
    required: true,
  },
})

const card = ref({})
const picked = ref('')
const voted = ref(false)

const fetchVotersIds = async () => {
  const urlToVoterIds = `${import.meta.env.VITE_FIREBASE_DB_QUESTIONS_URL}/${card.value.id}/voterIds/.json`
  const responseVoterIds = await axiosApiInstance.get(urlToVoterIds)

  if (!responseVoterIds.data) {
    return
  }

  const userId = responseVoterIds.data.find((id) => id === authStore.userInfo.userId)

  console.log(responseVoterIds.data, authStore.userInfo.userId)
  if (userId) {
    voted.value = true
  }
}

onMounted(() => {
  card.value = {
    id: props.id,
    text: props.text,
    options: props.options,
    createdAt: props.createdAt,
    totalVotes: props.totalVotes,
    voterIds: props.voterIds,
  }

  fetchVotersIds()
})

const vote = async () => {
  const pickedIndex = card.value.options.map((item) => item.text).indexOf(picked.value)
  const urlToQuestion = `${import.meta.env.VITE_FIREBASE_DB_QUESTIONS_URL}/${card.value.id}/.json`
  card.value.options[pickedIndex].votersCount = card.value.options[pickedIndex].votersCount + 1
  card.value.totalVotes = card.value.totalVotes + 1
  card.value.voterIds.push(authStore.userInfo.userId)

  const data = {
    totalVotes: card.value.totalVotes,
    options: card.value.options,
    voterIds: card.value.voterIds,
  }

  try {
    fetchVotersIds()

    const response = await axiosApiInstance.patch(urlToQuestion, JSON.stringify(data))

    voted.value = true
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <li v-if="!voted" class="p-6 border border-solid border-gray-200 rounded-lg shadow-sm">
    <h3 class="font-bold text-green-600 mb-5">{{ card.text }}</h3>
    <div class="flex flex-col gap-2.5 w-full">
      <div
        v-for="(option, i) in card.options"
        :key="i"
        class="transition text-left text-sm p-2 bg-slate-100 rounded hover:bg-slate-200"
      >
        <input
          @change="vote"
          type="radio"
          :id="`option-${i}`"
          :value="option.text"
          v-model="picked"
        />
        <label :for="`option-${i}`" class="ml-2">{{ option.text }}</label>
      </div>
    </div>
    <div class="flex justify-end gap-1 text-xs text-gray-400 text-right mt-3">
      <span>{{ card.totalVotes }}</span>
      <PersonIcon size="14px" color="#9CA3AF" />
    </div>
  </li>

  <li v-if="voted" class="p-10 bg-gray-200 border border-solid border-gray-20 rounded-lg shadow-sm">
    <h3 class="font-bold text-green-600 mb-5">{{ card.text }}</h3>
    <div class="flex flex-col gap-2.5 w-full">
      <button
        v-for="(option, i) in card.options"
        :key="i"
        :class="[
          'flex justify-between transition text-left text-sm p-2 rounded',
          option.text === picked ? 'bg-slate-400' : 'bg-slate-300',
        ]"
        disabled="disabled"
      >
        <span>{{ option.text }}</span>
        <span class="text-gray-500">{{ option.votersCount }}</span>
      </button>
    </div>
    <div class="flex justify-end gap-1 text-xs text-gray-400 text-right mt-3">
      <span class="">{{ card.totalVotes }}</span>
      <PersonIcon size="14px" color="#9CA3AF" />
    </div>
  </li>
</template>
