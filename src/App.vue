<script setup lang="ts">
  const toggleDarkMode=()=> {
    const root = document.documentElement

    if (root.classList.contains('dark')) {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }
</script>

<template>
  <header>
    <div class="bg-red-500 dark:bg-green-500">
      Header
    </div>
    <button @click="toggleDarkMode">Toggle dark mode</button>
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
