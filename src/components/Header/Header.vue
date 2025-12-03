<script setup lang="ts">
import Typography from '@/components/ui/Typography.vue'
import { Bars3Icon, CubeIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import Button from '@/components/ui/Button.vue'
import { ref } from 'vue'
import { useCategoriesQuery } from '@/queries/useCategories.ts'
import { useRoute } from 'vue-router'
import LoginModal from '@/components/LoginModal.vue'
import HeaderDrawer from '@/components/Header/components/HeaderDrawer.vue'
import HeaderIcons from '@/components/Header/components/HeaderIcons.vue'

const route = useRoute()
const showLoginModal = ref(false)
const menuOpen = ref(false)

const { data: categories = [] } = useCategoriesQuery()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const onOpenLoginModal = () => {
  showLoginModal.value = true
}
</script>

<template>
  <header
    class="sticky top-0 h-20 shadow-xl bg-gray-200 dark:bg-gray-800 transition-colors duration-300 z-1"
  >
    <nav class="h-[inherit] flex items-center justify-between mx-auto p-4 md:p-6">
      <Button
        size="lg"
        @click="toggleMenu"
        :icon="menuOpen ? XMarkIcon : Bars3Icon"
        class="border-0 px-2 md:hidden"
      />
      <router-link to="/" class="flex items-center gap-1">
        <CubeIcon class="size-5 text-blue-600 dark:text-blue-400" />
        <Typography variant="p" text-color="primary" bold class="dark:text-blue-400"
          >MyStore
        </Typography>
      </router-link>
      <ul class="hidden md:flex gap-6">
        <li v-for="category in categories" :key="category">
          <router-link
            :to="{
              path: '/',
              query: { ...route.query, category: category },
            }"
            active-class="text-blue-600"
          >
            <Typography
              variant="span"
              :class="[
                route.query.category === category
                  ? 'font-bold text-blue-600 dark:text-blue-600'
                  : '',
                'hover:text-blue-600 dark:hover:text-blue-400 capitalize',
              ]"
            >
              {{ category }}
            </Typography>
          </router-link>
        </li>
      </ul>
      <HeaderIcons :onOpenLoginModal="onOpenLoginModal" />
    </nav>
    <HeaderDrawer :menuOpen="menuOpen" :toggleMenu="toggleMenu" />
  </header>
  <LoginModal v-model:show="showLoginModal" />
</template>
