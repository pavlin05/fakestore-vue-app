<script setup lang="ts">
import type { Product } from '@/api/products.ts'
import Typography from '@/components/ui/Typography.vue'

const { product } = defineProps<{ product: Product }>()
</script>

<template>
  <router-link :to="`/product/${product.id}`">
    <div
      class="border border-gray-300 dark:border-gray-700 rounded-lg shadow bg-gray-200 dark:bg-gray-800"
    >
      <div class="flex p-5 justify-center">
        <img class="w-40 h-40 object-contain" :src="product.image" alt="product.title" />
      </div>
      <div class="flex flex-col p-5 gap-2">
        <Typography variant="h5" class="truncate" bold>{{ product.title }}</Typography>
        <Typography variant="p">€{{ product.price }}</Typography>
      </div>
    </div>
  </router-link>
</template>
