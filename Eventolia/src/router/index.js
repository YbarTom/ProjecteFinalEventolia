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
  {
    path: '/foto',
    name: 'Foto',
    component: () => import('@/pages/foto.vue'),
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: () => import('@/pages/SignUpPage.vue'),
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: () => import('@/pages/UserProfilePage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
