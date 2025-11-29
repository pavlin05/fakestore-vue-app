<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import Typography from '@/components/ui/Typography.vue'
import {
  MoonIcon,
  SunIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/vue/24/solid'
import Button from '@/components/ui/Button.vue'
import { ref } from 'vue'

const menuOpen = ref(false)
const isDark = useDark()
const toggleTheme = useToggle(isDark)

const onLogout = () => {
  console.log('logout')
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const navLinks = [
  { name: 'Category1', path: '/category1' },
  { name: 'Category2', path: '/category2' },
  { name: 'Category3', path: '/category3' },
]
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
        <li v-for="link in navLinks" :key="link.name">
          <router-link
            :to="link.path"
            class="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>
      <div class="flex items-center gap-2">
        <router-link to="/wishlist" class="border-0 px-2 text-gray-700 dark:text-gray-300">
          <HeartIcon class="size-5" />
        </router-link>
        <router-link to="/cart" class="border-0 px-2 text-gray-700 dark:text-gray-300">
          <ShoppingCartIcon class="size-5" />
        </router-link>
        <Button
          @click="toggleTheme()"
          :icon="isDark ? MoonIcon : SunIcon"
          class="border-0 px-2 rounded-full transition-transform duration-500 transform hover:rotate-180"
        />
        <Button @click="onLogout()" :icon="ArrowLeftStartOnRectangleIcon" class="border-0 px-2" />
      </div>
    </nav>
    <ul
      :class="`fixed top-20 w-full h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 transition-transform duration-300 overflow-hidden ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`"
    >
      <li v-for="link in navLinks" :key="link.name" class="p-8 text-center">
        <router-link @click="toggleMenu" :to="link.path" class="text-gray-800 dark:text-gray-200">
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>
