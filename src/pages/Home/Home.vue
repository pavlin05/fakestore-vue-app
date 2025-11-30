<script setup lang="ts">
import { useProductsQuery } from '@/queries/useProducts.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const category = computed(() => route.query.category as string | undefined)

const { data: products, isLoading } = useProductsQuery(category)
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center py-10">
    <ArrowPathIcon class="size-10 animate-spin dark:text-white" />
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>
