import ProductsApi from '@/api/products.ts'
import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const useProductsQuery = (category: Ref<string | undefined>) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => {
      if (category?.value) return ProductsApi.getProductsByCategory(category.value)
      return ProductsApi.getProducts()
    },
  })
}

const useProductsByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductsApi.getProductById(Number(id)),
    enabled: !!id,
  })
}
export { useProductsQuery, useProductsByIdQuery }
