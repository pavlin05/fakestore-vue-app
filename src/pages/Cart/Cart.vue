<script setup lang="ts">
import useCartStore from '@/stores/cart.ts'
import Typography from '@/components/ui/Typography.vue'
import CartItemCard from '@/components/CartItemCard.vue'

const cartStore = useCartStore()
</script>

<template>
  <div v-if="!cartStore.totalQuantity" class="flex justify-center items-center p-10">
    <Typography variant="h2">My cart is empty</Typography>
  </div>

  <div v-else class="flex flex-col gap-5">
    <Typography variant="h2">My Cart</Typography>
    <div class="flex flex-col md:flex-row gap-5">
      <TransitionGroup name="fade" tag="div" class="flex flex-col gap-5 md:w-2/3">
        <CartItemCard v-for="product in cartStore.cartItem" :key="product.id" :cartItem="product" />
      </TransitionGroup>
      <div class="flex flex-col gap-5 md:w-1/3">
        <div class="flex flex-row justify-between">
          <Typography variant="h2">Total</Typography>
          <Typography variant="h2">€{{ cartStore.totalPrice }}</Typography>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
</style>
