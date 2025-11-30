<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductsByIdQuery } from '@/queries/useProducts.ts'
import {
  ArrowPathIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from '@heroicons/vue/24/solid'
import Typography from '@/components/ui/Typography.vue'
import Button from '@/components/ui/Button.vue'
import { HeartIcon as HearIconOutlined } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import useUserStore from '@/stores/user.ts'
import useWishlistStore from '@/stores/wishlist.ts'
import type { Product } from '@/api/products.ts'
import useCartStore from '@/stores/cart.ts'

const route = useRoute()
const id = route.params.id as string
const userStore = useUserStore()
const wishListStore = useWishlistStore()
const cartStore = useCartStore()
const quantity = ref(1)

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

const onAddToCart = () => {
  cartStore.addToCart(product.value!, quantity.value)
}

const onRemoveFromCart = () => {
  cartStore.removeFromCart(product.value!.id)
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
      <img class="w-100 h-100 object-contain" :src="product.image" alt="" />
    </div>
    <div class="flex flex-col gap-5 md:p-5 justify-center">
      <Typography variant="h3" bold class="uppercase">{{ product.title }}</Typography>
      <Typography>{{ product.description }}</Typography>
      <div class="flex items-center gap-2 justify-between">
        <Typography>€{{ product.price }}</Typography>
        <Button
          :icon="wishListStore.isInWishlist(product.id) ? HeartIcon : HearIconOutlined"
          size="sm"
          v-if="userStore.isLoggedIn"
          @click="onToggleWishlist(product)"
        />
      </div>
      <div class="flex items-center gap-5" v-if="userStore.isLoggedIn">
        <Button @click="onDecreaseQuantity" :icon="MinusIcon" size="sm" />
        <Typography variant="span">{{ quantity }}</Typography>
        <Button @click="onIncreaseQuantity" :icon="PlusIcon" size="sm" />
      </div>
      <div v-if="userStore.isLoggedIn" class="flex flex-col md:flex-row gap-5 justify-between">
        <Button
          color="primary"
          title="Add to Cart"
          class="md:w-fit"
          :icon="ShoppingCartIcon"
          @click="onAddToCart"
        />
        <Button
          v-if="cartStore.isInCart(product.id)"
          color="error"
          title="Remove from Cart"
          class="md:w-fit"
          :icon="ShoppingCartIcon"
          @click="onRemoveFromCart"
        />
      </div>
    </div>
  </div>
</template>
