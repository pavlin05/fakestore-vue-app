<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import Typography from '@/components/ui/Typography.vue'
import {
  MoonIcon,
  SunIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
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
</script>

<template>
  <header>
    <nav
      class="flex items-center h-20 gap-2 p-4 justify-between shadow-xl bg-gray-200 dark:bg-gray-800"
    >
      <Button
        @click="toggleMenu"
        :icon="menuOpen ? XMarkIcon : Bars3Icon"
        class="border-0 px-2 md:hidden"
      />
      <a class="flex items-center gap-2"><Typography variant="p"> Logo </Typography></a>
      <ul class="hidden md:flex gap-2">
        <li><a href="#">Home</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">Home</a></li>
      </ul>
      <div class="flex items-center">
        <Button @click="toggleTheme()" :icon="isDark ? MoonIcon : SunIcon" class="border-0 px-2" />
        <Button @click="onLogout()" :icon="ArrowLeftStartOnRectangleIcon" class="border-0 px-2" />
      </div>
    </nav>
    <ul
      :class="`fixed top-20 w-full h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 transition-transform duration-300 overflow-hidden ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`"
    >
      <li><a href="#">Home</a></li>
      <li><a href="#">Home</a></li>
      <li><a href="#">Home</a></li>
    </ul>
  </header>
</template>

<style scoped></style>
