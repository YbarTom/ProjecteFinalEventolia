// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: () => import('@/pages/MainPage.vue'),
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: () => import('@/pages/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
