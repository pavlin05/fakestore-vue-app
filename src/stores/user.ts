import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  sub: number
}

const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const id = ref<number | null>(token.value ? jwtDecode<JwtPayload>(token.value)?.sub : null)
  const isLoggedIn = computed<boolean>(() => !!token.value)

  const login = (newToken: string) => {
    const decodedToken = jwtDecode<JwtPayload>(newToken)
    id.value = decodedToken?.sub
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    token.value = null
    id.value = null
    localStorage.removeItem('token')
  }

  return { token, id, isLoggedIn, login, logout }
})

export default useUserStore
