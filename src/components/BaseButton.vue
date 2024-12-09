<script setup>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    v-if="loading"
    class="w-full rounded-md px-4 py-2.5 bg-green-700"
    type="submit"
    disabled=""
  >
    <ClipLoader color="#fff" size="25px" class="flex justify-center items-center" />
  </button>
  <button
    v-else
    class="transition flex justify-center items-center w-full font-medium text-xl text-white bg-green-600 rounded-md px-4 py-2.5 hover:bg-green-700"
  >
    <slot />
  </button>
</template>
