<script setup lang="ts">
import Typography from '@/components/ui/Typography.vue'
import { useCategoriesQuery } from '@/queries/useCategories.ts'
import { useRoute } from 'vue-router'

interface HeaderDrawerProps {
  toggleMenu: () => void
  menuOpen: boolean
}

defineProps<HeaderDrawerProps>()

const route = useRoute()
const { data: categories = [] } = useCategoriesQuery()
</script>

<template>
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
            route.query.category === category ? 'bold text-blue-600 dark:text-blue-600' : '',
            'hover:text-blue-600 dark:hover:text-blue-400 capitalize',
          ]"
        >
          {{ category }}
        </Typography>
      </router-link>
    </li>
  </ul>
</template>
