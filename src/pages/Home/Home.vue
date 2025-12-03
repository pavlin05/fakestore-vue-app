<script setup lang="ts">
import { useProductsQuery } from '@/queries/useProducts.ts'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import { SortOrderEnum } from '@/api/products.ts'
import ProductsUtils from '@/utils/ProductsUtils.ts'
import Typography from '@/components/ui/Typography.vue'
import Select from '@/components/ui/Select.vue'

const route = useRoute()
const router = useRouter()
const category = computed(() => route.query.category as string | undefined)
const sortOrder = ref<SortOrderEnum>((route.query.sort as SortOrderEnum) || SortOrderEnum.Default)

const { data: products, isLoading } = useProductsQuery(category)

const sortedProducts = computed(() => {
  if (!products.value) return []
  return ProductsUtils.sortProducts(products.value, sortOrder.value)
})

const sortOptions = [
  {
    label: 'Default',
    value: SortOrderEnum.Default,
  },
  {
    label: 'Price: Low → High',
    value: SortOrderEnum.PriceAsc,
  },
  {
    label: 'Price: High → Low',
    value: SortOrderEnum.PriceDesc,
  },
  {
    label: 'Name: A → Z',
    value: SortOrderEnum.NameAsc,
  },
  {
    label: 'Name: Z → A',
    value: SortOrderEnum.NameDesc,
  },
]

watch(sortOrder, (value) => {
  const query = { ...route.query }

  if (value !== SortOrderEnum.Default) {
    query.sort = value
  } else {
    delete query.sort
  }

  router.replace({ query })
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
      <template v-for="product in sortedProducts" :key="product.id">
        <ProductCard :product="product" />
      </template>
    </div>
  </div>
</template>
