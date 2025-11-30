import AuthApi from '@/api/auth.ts'
import { useMutation } from '@tanstack/vue-query'
import useUserStore from '@/stores/user.ts'


const useAuthMutation = () => {
  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      const userStore = useUserStore()
      userStore.login(data.token)
    },
    onError: () => {
      const userStore = useUserStore()
      userStore.logout()
    },
  })
}

export default useAuthMutation
