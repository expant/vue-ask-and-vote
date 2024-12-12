<script setup>
const model = defineModel()

defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div>
    <label class="inline-block mb-2">
      <slot />
    </label>
    <input
      class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
      :type="type"
      :id="name"
      :name="name"
      :required="required"
      v-model="model"
      autocomplete
    />
  </div>
</template>
