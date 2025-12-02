<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

interface Option {
  label: string
  value: string | number
}

interface SelectProps {
  modelValue: string | number
  options: Option[]
}

defineProps<SelectProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative">
    <select
      :value="modelValue"
      @change="onChange"
      class="appearance-none border rounded-lg px-4 py-2 pr-10 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:outline-none"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <ChevronDownIcon
      class="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 size-5"
    />
  </div>
</template>
