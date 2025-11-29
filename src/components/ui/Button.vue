<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import type { Component } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

const buttonStyle = tv({
  base: 'rounded-md gap-2 flex items-center justify-center border transition-colors',
  variants: {
    variant: {
      outlined: '',
      contained: '',
    },
    color: {
      default: 'bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-gray-700',
      primary: 'bg-blue-600 border-blue-600',
      secondary: 'bg-purple-600 border-purple-600',
      success: 'bg-green-600 border-green-600',
      error: 'bg-red-600 border-red-600',
      warning: 'bg-orange-600 border-orange-600',
    },
    size: {
      sm: 'h-10 px-4',
      md: 'h-12 px-5',
      lg: 'h-14 px-6',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  compoundVariants: [
    {
      variant: 'outlined',
      color: ['primary', 'secondary', 'success', 'error', 'warning', 'default'],
      class: 'bg-transparent',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'default',
    variant: 'contained',
  },
})

const textButtonStyle = tv({
  base: '',
  variants: {
    variant: {
      outlined: '',
      contained: '',
    },
    color: {
      default: 'text-gray-700 dark:text-gray-300',
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      success: 'text-green-600',
      error: 'text-red-600',
      warning: 'text-orange-600',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  compoundVariants: [
    {
      variant: 'contained',
      color: ['primary', 'secondary', 'success', 'error', 'warning'],
      class: 'text-white',
    },
  ],
  defaultVariants: {
    variant: 'contained',
    color: 'default',
  },
})

const iconButtonStyle = tv({
  base: 'flex-shrink-0',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface ButtonProps {
  title?: string
  icon?: Component
  loading?: boolean
  disabled?: boolean
  variant?: 'outlined' | 'contained'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  class?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = defineProps<ButtonProps>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="
      twMerge(buttonStyle({ variant, color, size, disabled: disabled || loading }), props.class)
    "
    @click="emit('click', $event)"
  >
    <template v-if="loading">
      <ArrowPathIcon
        :class="
          twMerge(textButtonStyle({ variant, color }), iconButtonStyle({ size }), 'animate-spin')
        "
      />
      <span v-if="title" :class="textButtonStyle({ variant, color, size })">
        {{ title }}
      </span>
    </template>

    <template v-else>
      <component
        v-if="icon"
        :is="icon"
        :class="twMerge(textButtonStyle({ variant, color }), iconButtonStyle({ size }))"
      />

      <span v-if="title" :class="textButtonStyle({ variant, color, size })">
        {{ title }}
      </span>
    </template>
  </button>
</template>

<style scoped></style>
