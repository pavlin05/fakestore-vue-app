import { SortOrderEnum } from '@/api/products.ts'
import { ref, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const useSortProduct = () => {
  const route = useRoute()
  const sortOrder = ref<SortOrderEnum>((route.query.sort as SortOrderEnum) || SortOrderEnum.Default)

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
    void router.replace({ query })
  })

  watch(
    () => route.query.sort,
    (sort) => {
      sortOrder.value = (sort as SortOrderEnum) || SortOrderEnum.Default
    },
  )

  return {
    sortOptions,
    sortOrder,
  }
}

export default useSortProduct
