import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import router from '@/router'

const usePaginationProducts = () => {
  const route = useRoute()
  const itemsPerPage = ref(6)
  const currentPage = ref(Number(route.query.page) > 0 ? Number(route.query.page) : 1)

  watch(currentPage, (page) => {
    const query = { ...route.query }

    if (page > 1) {
      query.page = String(page)
    } else {
      delete query.page
    }

    void router.replace({ query })
  })

  watch(
    () => route.query.page,
    (page) => {
      const parsed = Number(page)
      currentPage.value = parsed > 0 ? parsed : 1
    },
  )
  return {
    itemsPerPage,
    currentPage,
  }
}

export default usePaginationProducts
