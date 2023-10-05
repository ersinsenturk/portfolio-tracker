import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/Auth.vue')
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: () => import('../views/Portfolio.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('../views/News.vue')
    },
    {
      path: '/growth',
      name: 'Growth',
      component: () => import('../views/Growth.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: () => import('../views/Transactions.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/asset/:id',
      name: 'Asset',
      component: () => import('../views/Asset.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.userLoggedIn) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

export default router
