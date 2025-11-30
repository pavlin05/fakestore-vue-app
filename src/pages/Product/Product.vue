<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductsByIdQuery } from '@/queries/useProducts.ts'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import Typography from '@/components/ui/Typography.vue'
import Button from '@/components/ui/Button.vue'
import { HeartIcon, PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
import { HeartIcon as HearIconOutlined } from '@heroicons/vue/24/outline'
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import useUserStore from '@/stores/user.ts'

const route = useRoute()
const id = route.params.id as string
const userStore = useUserStore()
const isInWishlist = ref(false)
const quantity = ref(1)

const { data: product, isLoading } = useProductsByIdQuery(id)

const increaseQuantity = () => quantity.value++
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <ArrowPathIcon class="size-10 animate-spin" />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="flex justify-center items-center">
        <img class="w-100 h-100 object-contain" :src="product?.image" alt="" />
      </div>
      <div class="flex flex-col gap-5 md:p-5 justify-center">
        <Typography variant="h3" bold class="uppercase">{{ product?.title }}</Typography>
        <Typography>{{ product?.description }}</Typography>
        <div class="flex items-center gap-2 justify-between">
          <Typography>€{{ product?.price }}</Typography>
          <Button :icon="isInWishlist ? HeartIcon : HearIconOutlined" size="sm" v-if="userStore.isLoggedIn" />
        </div>
        <div class="flex items-center gap-5" v-if="userStore.isLoggedIn">
          <Button @click="decreaseQuantity" :icon="MinusIcon" size="sm" />
          <Typography variant="span">{{ quantity }}</Typography>
          <Button @click="increaseQuantity" :icon="PlusIcon" size="sm" />
        </div>
        <Button
          color="primary"
          title="Add to Cart"
          class="md:w-fit"
          :icon="ShoppingCartIcon"
          v-if="userStore.isLoggedIn"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
