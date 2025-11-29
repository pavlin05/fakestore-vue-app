<script setup lang="ts">
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'
</script>

<template>
  <div class="flex flex-col min-h-dvh">
    <Header />
    <Main>
      <router-view />
    </Main>
  </div>
</template>

<style scoped></style>
