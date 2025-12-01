import { defineStore } from 'pinia'
import { computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { useLocalStorage } from '@vueuse/core'
import useCartStore from '@/stores/cart.ts'
import useWishlistStore from '@/stores/wishlist.ts'

interface JwtPayload {
  sub: number
}

const useUserStore = defineStore('user', () => {
  const token = useLocalStorage<string | null>('token', null)

  const id = computed<number | null>(() =>
    token.value ? jwtDecode<JwtPayload>(token.value)?.sub : null,
  )

  const isLoggedIn = computed<boolean>(() => !!token.value)

  const login = (newToken: string) => {
    token.value = newToken
  }

  const logout = () => {
    const cartStore = useCartStore()
    const wishlistStore = useWishlistStore()

    token.value = null
    localStorage.removeItem('token')

    cartStore.clearCart()
    wishlistStore.clearWishlist()
  }

  return { token, id, isLoggedIn, login, logout }
})

export default useUserStore
