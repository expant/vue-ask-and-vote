<script setup>
import { ref } from 'vue'
import axiosApiInstance from '@/api'
import PersonIcon from './icons/PersonIcon.vue'

const props = defineProps({
  id: {
    type: Number,
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
  // voted: {
  //   type: Boolean,
  //   required: true,
  // },
  totalVotes: {
    type: Number,
    required: true,
  },
})

const picked = ref('')

const vote = async () => {
  const pickedIndex = props.options.map((item) => item.title).indexOf(picked.value)
  const urlToQuestion = `${import.meta.env.VITE_FIREBASE_DB_QUESTIONS_URL}/${props.id}/.json`
  props.options[pickedIndex].votersCount = props.options[pickedIndex].votersCount + 1
  const data = {
    totalVotes: props.totalVotes + 1,
    options: props.options,
  }

  console.log(data)

  try {
    const response1 = await axiosApiInstance.patch(urlToQuestion, JSON.stringify(data))

    console.log(response1)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <li class="p-6 border border-solid border-gray-200 rounded-lg shadow-sm">
    <h3 class="font-bold text-green-600 mb-5">{{ props.text }}</h3>
    <div class="flex flex-col gap-2.5 w-full">
      <div
        v-for="(option, i) in props.options"
        :key="i"
        class="transition text-left text-sm p-2 bg-slate-100 rounded hover:bg-slate-200"
      >
        <input
          @change="vote"
          type="radio"
          :id="`option-${i}`"
          :value="option.title"
          v-model="picked"
        />
        <label :for="`option-${i}`" class="ml-2">{{ option.title }}</label>
      </div>
    </div>
    <div class="flex justify-end gap-1 text-xs text-gray-400 text-right mt-3">
      <span>{{ props.totalVotes }}</span>
      <PersonIcon size="14px" color="#9CA3AF" />
    </div>
  </li>
  <!-- <li
    v-if="props.voted"
    class="p-10 bg-gray-200 border border-solid border-gray-20 rounded-lg shadow-sm"
  >
    <h3 class="font-bold text-green-600 mb-5">{{ props.text }}</h3>
    <div class="flex flex-col gap-2.5 w-full">
      <button
        v-for="(option, i) in props.options"
        :key="i"
        class="flex justify-between transition text-left text-sm p-2 bg-slate-300 rounded"
        disabled="disabled"
      >
        <span>{{ option.title }}</span>
        <span class="text-gray-500">{{ option.votersCount }}</span>
      </button>
    </div>
    <div class="flex justify-end gap-1 text-xs text-gray-400 text-right mt-3">
      <span class="">{{ props.totalVotes }}</span>
      <PersonIcon size="14px" color="#9CA3AF" />
    </div>
  </li> -->
</template>
