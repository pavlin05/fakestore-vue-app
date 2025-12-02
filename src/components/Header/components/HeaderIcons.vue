<script setup lang="ts">
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  HeartIcon,
  MoonIcon,
  ShoppingCartIcon,
  SunIcon,
} from '@heroicons/vue/24/solid'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import useUserStore from '@/stores/user.ts'
import useCartStore from '@/stores/cart.ts'
import useWishlistStore from '@/stores/wishlist.ts'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

interface HeaderIconsProps {
  onOpenLoginModal: () => void
}

defineProps<HeaderIconsProps>()

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const isDark = useDark()
const toggleTheme = useToggle(isDark)

const onLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex items-center gap-2">
    <router-link
      to="/wishlist"
      class="border-0 px-2 text-gray-700 dark:text-gray-300 relative"
      v-if="userStore.isLoggedIn"
    >
      <HeartIcon class="size-5" />
      <Badge :count="wishlistStore.totalQuantity" size="sm" />
    </router-link>
    <router-link
      to="/cart"
      class="border-0 px-2 text-gray-700 dark:text-gray-300 relative"
      v-if="userStore.isLoggedIn"
    >
      <ShoppingCartIcon class="size-5" />
      <Badge :count="cartStore.totalQuantity" size="sm" />
    </router-link>
    <Button
      @click="toggleTheme()"
      :icon="isDark ? MoonIcon : SunIcon"
      class="border-0 px-2 rounded-full transition-transform duration-500 transform hover:rotate-180"
    />
    <Button
      v-if="userStore.isLoggedIn"
      @click="onLogout()"
      :icon="ArrowLeftStartOnRectangleIcon"
      class="border-0 px-2"
    />
    <Button
      v-else
      @click="onOpenLoginModal"
      :icon="ArrowLeftEndOnRectangleIcon"
      class="border-0 px-2"
    />
  </div>
</template>

<style scoped></style>
