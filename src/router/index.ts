import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home'
import Product from '@/pages/Product'
import Wishlist from '@/pages/Wishlist'
import Cart from '@/pages/Cart'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = true

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/')
  }

  next()
})


export default router
