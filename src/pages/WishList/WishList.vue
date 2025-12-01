<script setup lang="ts">
import useWishlistStore from '@/stores/wishlist.ts'
import Typography from '@/components/ui/Typography.vue'
import ProductCard from '@/components/ProductCard.vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Button from '@/components/ui/Button.vue'

const wishlistStore = useWishlistStore()
</script>

<template>
  <div v-if="!wishlistStore.totalQuantity" class="flex justify-center items-center p-10">
    <Typography variant="h2">My WishList is empty</Typography>
  </div>
  <div v-else class="flex flex-col gap-5">
    <Typography variant="h2">My WishList</Typography>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="product in wishlistStore.wishlist" :key="product.id" class="relative">
        <Button
          class="absolute top-1 right-1 border-0 p-2 bg-transparent"
          :icon="XMarkIcon"
          @click="wishlistStore.removeFromWishlist(product.id)"
        />
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
