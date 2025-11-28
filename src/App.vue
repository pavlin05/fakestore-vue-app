<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',  // applica classe 'dark' al <html>
})

const toggleDarkMode2 = useToggle(isDark)
</script>

<template>
  <header>
    <div class="bg-red-500 dark:bg-green-500">Header — Dark: {{ isDark }}</div>
    <button @click="toggleDarkMode2()">Toggle dark mode</button>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Home</h1>
  </main>
</template>

<style scoped></style>
