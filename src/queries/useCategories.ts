import { useQuery } from '@tanstack/vue-query'
import CategoriesApi from '@/api/categories.ts'

const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesApi.getCategories
  })
}


export {
  useCategoriesQuery
}
