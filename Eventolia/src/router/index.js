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
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: () => import('@/pages/SignUpPage.vue'),
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: () => import('@/pages/UserProfilePage.vue'),
  },
  {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: () => import('@/pages/Profile.vue'),
  },
  {
    path: '/CreatePage',
    name: 'CreatePage',
    component: () => import('@/pages/Create.vue'),
  },
  {
    path: '/MessagesPage',
    name: 'MessagesPage',
    component: () => import('@/pages/Messages.vue'),
  },
  {
    path: '/NotificationsPage',
    name: 'NotificationsPage',
    component: () => import('@/pages/Notifications.vue'),
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: () => import('@/pages/Search.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
