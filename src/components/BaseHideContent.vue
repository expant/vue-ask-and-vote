<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  styles: {
    type: Object,
    default: () => ({}),
  },
  actionName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    :class="[
      'absolute top-0 left-0 w-full h-full flex items-center justify-center',
      styles.bgColor ? styles.bgColor : 'bg-black',
      styles.bgOpacity ? styles.bgOpacity : 'bg-opacity-50',
      styles.rounded ? styles.rounded : 'rounded',
    ]"
  >
    <div class="text-center text-white">
      <p class="text-lg font-semibold mb-2">{{ text }}</p>
      <button
        @click="$emit(actionName)"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>
