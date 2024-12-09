<script setup>

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <li class="flex flex-col gap-2.5 w-full p-10 border border-solid border-gray-200 rounded-lg shadow-sm">
    <h3 class="font-bold text-green-600">{{ props.text }}</h3>
    <div 
      v-for="(option, i) in props.options"
      :key="i"
      class="transition text-sm p-2 bg-slate-100 rounded hover:bg-slate-200"
    >
    {{ option }}
    </div>
  </li>
</template>
