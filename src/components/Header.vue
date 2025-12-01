<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import Typography from '@/components/ui/Typography.vue'
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  HeartIcon,
  MoonIcon,
  ShoppingCartIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid'
import Button from '@/components/ui/Button.vue'
import { ref } from 'vue'
import { useCategoriesQuery } from '@/queries/useCategories.ts'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/user.ts'
import LoginModal from '@/components/LoginModal.vue'
import useCartStore from '@/stores/cart.ts'
import Badge from '@/components/ui/Badge.vue'
import useWishlistStore from '@/stores/wishlist.ts'

const route = useRoute()
const menuOpen = ref(false)
const isDark = useDark()
const toggleTheme = useToggle(isDark)
const userStore = useUserStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const showLoginModal = ref(false)

const { data: categories = [] } = useCategoriesQuery()

const onLogout = () => {
  userStore.logout()
}

const onLogin = () => {
  showLoginModal.value = true
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <header class="h-20 shadow-xl bg-gray-200 dark:bg-gray-800 transition-colors duration-300 z-1">
    <nav class="h-[inherit] flex items-center justify-between mx-auto p-4 md:p-6">
      <Button
        size="lg"
        @click="toggleMenu"
        :icon="menuOpen ? XMarkIcon : Bars3Icon"
        class="border-0 px-2 md:hidden"
      />
      <router-link to="/" class="flex items-center gap-2">
        <Typography variant="p">Logo</Typography>
      </router-link>
      <ul class="hidden md:flex gap-6">
        <li v-for="category in categories" :key="category">
          <router-link :to="`/?category=${category}`" active-class="text-blue-600">
            <Typography
              variant="span"
              :class="[
                route.query.category === category
                  ? 'text-blue-600 font-bold dark:text-blue-600'
                  : 'text-gray-800 dark:text-gray-200',
                'hover:text-blue-600 dark:hover:text-blue-400 capitalize',
              ]"
            >
              {{ category }}
            </Typography>
          </router-link>
        </li>
      </ul>
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
          @click="onLogout()"
          :icon="ArrowLeftStartOnRectangleIcon"
          class="border-0 px-2"
          v-if="userStore.isLoggedIn"
        />
        <Button
          @click="onLogin()"
          :icon="ArrowLeftEndOnRectangleIcon"
          class="border-0 px-2"
          v-else
        />
      </div>
    </nav>
    <ul
      :class="`fixed top-20 w-full h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 transition-transform duration-300 overflow-hidden ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`"
    >
      <li v-for="category in categories" :key="category" class="p-8 text-center">
        <router-link @click="toggleMenu" :to="`/?category=${category}`">
          <Typography
            variant="span"
            :class="[
              route.query.category === category
                ? 'text-blue-600 font-bold dark:text-blue-600'
                : 'text-gray-800 dark:text-gray-200',
              'hover:text-blue-600 dark:hover:text-blue-400 capitalize',
            ]"
          >
            {{ category }}
          </Typography>
        </router-link>
      </li>
    </ul>
  </header>
  <LoginModal v-model:show="showLoginModal" />
</template>
