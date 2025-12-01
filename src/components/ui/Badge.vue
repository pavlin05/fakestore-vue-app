<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const badge = tv({
  base: 'rounded-full flex items-center justify-center absolute -top-1 -right-1 text-xs',
  variants: {
    size: {
      sm: 'w-4 h-4 text-xs',
      md: 'w-6 h-6 text-sm',
      lg: 'w-8 h-8 text-base',
    },
    color: {
      primary: 'bg-blue-600 text-white',
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-yellow-600 text-white',
    },
  },
  defaultVariants: {
    size: 'sm',
    color: 'primary',
  },
})

interface BadgeProps {
  count: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'error' | 'success' | 'warning'
  class?: string | string[]
}

const props = defineProps<BadgeProps>()
</script>

<template>
  <span v-if="count > 0" :class="twMerge(badge({ size, color }), props.class)">
    {{ count }}
  </span>
</template>
