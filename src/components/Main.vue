<script setup lang="ts"></script>
<template>
  <main class="flex-1 w-full bg-gray-100 dark:bg-gray-900 p-5 md:p-10 2xl:p-20 overflow-auto">
    <Transition name="fade-main">
      <slot />
    </Transition>
  </main>
</template>

<style scoped>
.fade-main-enter-active,
.fade-main-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-main-enter-from,
.fade-main-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
