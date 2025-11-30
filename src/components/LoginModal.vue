<script setup lang="ts">
import { ref } from 'vue'
import useAuthMutation from '@/queries/useAuth.ts'
import Button from '@/components/ui/Button.vue'
import Typography from '@/components/ui/Typography.vue'
import { ArrowLeftEndOnRectangleIcon, XMarkIcon } from '@heroicons/vue/24/solid'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const { mutate: login, isPending } = useAuthMutation()

const close = () => {
  username.value = ''
  password.value = ''
  errorMessage.value = ''
  emit('update:show', false)
}

const onSubmit = () => {
  if (!username.value || !password.value) return
  login(
    {
      username: username.value,
      password: password.value,
    },
    {
      onSuccess: () => {
        close()
      },
      onError: (error) => {
        errorMessage.value = error.message
      },
    },
  )
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    @click.self="close"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in flex flex-col gap-10"
    >
      <div class="flex justify-between items-center">
        <Typography variant="h2" class="text-center">Login</Typography>
        <Button @click="close" :icon="XMarkIcon" class="border-0 px-2 bg-transparent" size="lg" />
      </div>
      <form class="flex flex-col gap-10" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-5">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            required
            class="border rounded px-3 py-2 text-gray-800 dark:text-gray-200"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="border rounded px-3 py-2 text-gray-800 dark:text-gray-200"
          />
          <Typography variant="span" text-color="error" v-if="errorMessage">{{
            errorMessage
          }}</Typography>
        </div>
        <div class="flex justify-end gap-5">
          <Button
            type="submit"
            title="Login"
            color="primary"
            :loading="isPending"
            :icon="ArrowLeftEndOnRectangleIcon"
          />
          <Button @click="close" title="Close" />
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.25s ease-out;
}
</style>
