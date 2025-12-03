<script setup lang="ts"></script>
<template>
  <main class="flex-1 w-full bg-gray-100 dark:bg-gray-900 p-5 md:p-10 2xl:p-20 overflow-auto">
    <Transition name="fade">
      <slot />
    </Transition>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
