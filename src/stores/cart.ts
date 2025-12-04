import type { Product } from '@/api/products.ts'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export interface CartItem extends Product {
  quantity: number
}

const useCartStore = defineStore('cart', () => {
  const cartItem = useLocalStorage<CartItem[]>('cart', [])

  const addToCart = (product: Product, quantity: number) => {
    const existingProduct = cartItem.value.find((p) => p.id === product.id)
    if (existingProduct) {
      existingProduct.quantity += quantity
    } else {
      cartItem.value.push({ ...product, quantity })
    }
  }

  const removeFromCart = (productId: number) => {
    cartItem.value = cartItem.value.filter((p) => p.id !== productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const existingProduct = cartItem.value.find((p) => p.id === productId)
    if (existingProduct) {
      existingProduct.quantity = quantity
    }
  }

  const isInCart = (productId: number) => {
    return cartItem.value.some((p) => p.id === productId)
  }

  const clearCart = () => {
    cartItem.value = []
  }

  const totalQuantity = computed(() => {
    return cartItem.value.reduce((total, product) => total + product.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItem.value.reduce((total, product) => total + product.price * product.quantity, 0)
  })

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    totalQuantity,
    totalPrice,
    cartItem,
  }
})

export default useCartStore
