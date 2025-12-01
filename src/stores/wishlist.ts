import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Product } from '@/api/products.ts'
import useUserStore from '@/stores/user.ts'
import { computed } from 'vue'

const useWishlistStore = defineStore('wishlist', () => {
  const userStore = useUserStore()
  const wishlist = useLocalStorage<Product[]>(`wishlist_${userStore.id}`, [])

  const addToWishlist = (product: Product) => {
    wishlist.value.push(product)
  }

  const removeFromWishlist = (productId: number) => {
    wishlist.value = wishlist.value.filter((product) => product.id !== productId)
  }

  const isInWishlist = (productId: number) => {
    return wishlist.value.some((product) => product.id === productId)
  }

  const clearWishlist = () => {
    wishlist.value = []
  }

  const totalQuantity = computed(() => wishlist.value.length)

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    totalQuantity,
  }
})

export default useWishlistStore
