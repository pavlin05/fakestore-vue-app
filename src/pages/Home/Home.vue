<script setup lang="ts">
import { useProductsQuery } from '@/queries/useProducts.ts'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import ProductsUtils from '@/utils/ProductsUtils.ts'
import Typography from '@/components/ui/Typography.vue'
import Select from '@/components/ui/Select.vue'
import useSortProduct from '@/composables/useSortProducts.ts'
import Button from '@/components/ui/Button.vue'
import usePaginationProducts from '@/composables/usePaginationProducts.ts'

const route = useRoute()
// TODO: fakeStoreAPI does not support sorting or pagination.
// these filters are simulated on the frontend, but should be handled by the BE in a real implementation.
const { sortOptions, sortOrder } = useSortProduct()
const { itemsPerPage, currentPage } = usePaginationProducts()

const category = computed(() => route.query.category as string | undefined)
const { data: products, isLoading } = useProductsQuery(category)

const sortedProducts = computed(() => {
  if (!products.value) return []
  return ProductsUtils.sortProducts(products.value, sortOrder.value)
})

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center py-10">
    <ArrowPathIcon class="size-10 animate-spin dark:text-white" />
  </div>
  <div v-else class="flex flex-col gap-4">
    <div class="flex items-center gap-2 justify-end">
      <Typography variant="h5">Sort by</Typography>
      <Select v-model="sortOrder" :options="sortOptions" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <template v-for="product in paginatedProducts" :key="product.id">
        <ProductCard :product="product" />
      </template>
    </div>
    <div class="flex gap-2 justify-center mt-4">
      <Button
        v-for="page in totalPages"
        :key="page"
        :color="page === currentPage ? 'primary' : 'default'"
        @click="currentPage = page"
        :title="page.toString()"
      />
    </div>
  </div>
</template>
