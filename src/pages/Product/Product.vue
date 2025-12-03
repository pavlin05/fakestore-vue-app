<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductsByIdQuery } from '@/queries/useProducts.ts'
import {
  ArrowPathIcon,
  CheckCircleIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/solid'
import Typography from '@/components/ui/Typography.vue'
import Button from '@/components/ui/Button.vue'
import { HeartIcon as HearIconOutlined, TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import useUserStore from '@/stores/user.ts'
import useWishlistStore from '@/stores/wishlist.ts'
import type { Product } from '@/api/products.ts'
import useCartStore from '@/stores/cart.ts'

const route = useRoute()
const userStore = useUserStore()
const wishListStore = useWishlistStore()
const cartStore = useCartStore()
const quantity = ref<number>(1)
const id = route.params.id as string

const { data: product, isLoading } = useProductsByIdQuery(id)

const onIncreaseQuantity = () => quantity.value++

const onDecreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const onToggleWishlist = (product: Product) => {
  if (wishListStore.isInWishlist(product.id)) {
    wishListStore.removeFromWishlist(product.id)
  } else {
    wishListStore.addToWishlist(product)
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center py-10">
    <ArrowPathIcon class="size-10 animate-spin dark:text-white" />
  </div>
  <div v-else-if="!product" class="flex justify-center items-center py-10">
    <Typography variant="h3">Product not found</Typography>
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div class="flex justify-center items-center">
      <img class="w-100 h-100 object-contain" :src="product.image" :alt="product.title" />
    </div>
    <div class="flex flex-col gap-5 md:p-5 justify-center">
      <Typography variant="h3" bold class="uppercase">{{ product.title }}</Typography>
      <Typography>{{ product.description }}</Typography>
      <div class="flex items-center gap-2 justify-between">
        <Typography bold>€{{ product.price }}</Typography>
        <Button
          :icon="wishListStore.isInWishlist(product.id) ? HeartIcon : HearIconOutlined"
          size="sm"
          v-if="userStore.isLoggedIn"
          @click="onToggleWishlist(product)"
        />
      </div>
      <template v-if="userStore.isLoggedIn">
        <div v-if="cartStore.isInCart(product.id)" class="flex flex-col gap-5 w-full">
          <div class="flex gap-1 items-center text-green-500">
            <CheckCircleIcon class="size-6" />
            <Typography bold variant="h4">Product added to Cart</Typography>
          </div>
          <Button
            v-if="cartStore.isInCart(product.id)"
            color="error"
            title="Remove from Cart"
            class="md:w-fit"
            :icon="TrashIcon"
            @click="cartStore.removeFromCart(product.id)"
          />
        </div>
        <div v-else class="flex flex-col gap-5 w-full">
          <div class="flex items-center gap-5">
            <Button @click="onDecreaseQuantity" :icon="MinusIcon" size="sm" />
            <Typography variant="span">{{ quantity }}</Typography>
            <Button @click="onIncreaseQuantity" :icon="PlusIcon" size="sm" />
          </div>
          <Button
            color="primary"
            title="Add to Cart"
            class="md:w-fit"
            :icon="ShoppingCartIcon"
            @click="cartStore.addToCart(product, quantity)"
          />
        </div>
      </template>
    </div>
  </div>
</template>
