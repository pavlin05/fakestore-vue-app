<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const typography = tv({
  base: '',
  variants: {
    variant: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-semibold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-medium',
      h5: 'text-lg font-medium',
      p: 'text-base',
      span: 'text-sm',
    },
    bold: {
      true: 'font-bold',
      false: 'font-normal',
    },
    textColor: {
      default: 'text-gray-800 dark:text-gray-200',
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      success: 'text-green-600',
      error: 'text-red-600',
      white: 'text-white',
      black: 'text-black',
    },
  },
  defaultVariants: {
    variant: 'p',
    bold: false,
    textColor: 'default',
  },
})

const props = defineProps<{
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span'
  bold?: boolean
  textColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'white' | 'black'
  as?: string
  class?: string | string[]
}>()
</script>

<template>
  <component
    :is="as || variant || 'p'"
    :class="twMerge(typography({ variant, bold, textColor }), props.class)"
  >
    <slot />
  </component>
</template>

<style scoped></style>
