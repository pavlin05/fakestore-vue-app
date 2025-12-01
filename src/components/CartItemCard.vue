<script setup lang="ts">
import useCartStore, { type CartItem } from '@/stores/cart.ts'
import Typography from '@/components/ui/Typography.vue'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Button from '@/components/ui/Button.vue'

const cartStore = useCartStore()
const { cartItem } = defineProps<{ cartItem: CartItem }>()

const onIncreaseQuantity = () => {
  cartStore.updateQuantity(cartItem.id, cartItem.quantity + 1)
}

const onDecreaseQuantity = () => {
  if (cartItem.quantity > 1) cartStore.updateQuantity(cartItem.id, cartItem.quantity - 1)
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row border border-gray-300 dark:border-gray-700 rounded-lg shadow bg-gray-200 dark:bg-gray-800"
  >
    <div class="flex p-5 justify-center items-center md:w-1/3">
      <router-link :to="`/product/${cartItem.id}`">
        <img class="w-40 h-40 object-contain" :src="cartItem.image" alt="" />
      </router-link>
    </div>
    <div class="flex flex-col p-5 gap-5 md:w-2/3">
      <div class="flex items-center justify-between gap-5">
        <Typography variant="h4" bold>{{ cartItem.title }}</Typography>
        <Button
          :icon="TrashIcon"
          size="sm"
          color="error"
          variant="outlined"
          @click="cartStore.removeFromCart(cartItem.id)"
          class="mb-auto"
        />
      </div>
      <div class="flex items-center justify-between">
        <Typography variant="p" bold>Category:</Typography>
        <Typography variant="p">{{ cartItem.category }}</Typography>
      </div>
      <div class="h-px bg-gray-300 dark:bg-gray-700" />
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-5">
          <Button @click="onDecreaseQuantity" :icon="MinusIcon" size="sm" />
          <Typography variant="span">{{ cartItem.quantity }}</Typography>
          <Button @click="onIncreaseQuantity" :icon="PlusIcon" size="sm" />
        </div>
        <Typography variant="p" bold>€{{ cartItem.price * cartItem.quantity }}</Typography>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
