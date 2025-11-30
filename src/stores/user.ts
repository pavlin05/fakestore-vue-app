import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoggedIn = computed<boolean>(() => !!token.value)

  const login = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  return { token, isLoggedIn, login, logout }
})

export default useUserStore
