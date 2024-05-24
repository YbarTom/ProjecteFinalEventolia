// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app.js';

const checkAuthentication = (to, from, next) => {
  const store = useAppStore();

  if (store.isLoggedIn()) {
    next(); // El usuario está autenticado, permitir el acceso
  } else {
    next('/'); // El usuario no está autenticado, redirigir a la página de inicio de sesión
  }
};

const checkAdmin = (to, from, next) => {
  const store = useAppStore();
  if (store.isLoggedIn()) {
    if (store.getAdmin()==true){
      next();
    }
    else {
      next('/MainPage')
    }// El usuario está autenticado, permitir el acceso
  } else {
    next('/'); // El usuario no está autenticado, redirigir a la página de inicio de sesión
  }
}

const routes = [

  {
    path: '/MainPage',
    name: 'MainPage',
    component: () => import('@/pages/MainPage.vue'),
    beforeEnter: checkAuthentication,
  },
  {
    path: '/',
    name: 'LoginPage',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: () => import('@/pages/SignUpPage.vue'),
  },
  {
    path: '/UserProfile/:userName',
    name: 'UserProfile',
    component: () => import('@/pages/UserProfilePage.vue'),
    beforeEnter: checkAuthentication,
  },
  {
    path: '/MessagesPage',
    name: 'MessagesPage',
    component: () => import('@/pages/Messages.vue'),
    beforeEnter: checkAuthentication,
  },
  {
    path: '/NotificationsPage',
    name: 'NotificationsPage',
    component: () => import('@/pages/Notifications.vue'),
    beforeEnter: checkAuthentication,
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: () => import('@/pages/Search.vue'),
    beforeEnter: checkAuthentication,
  },
  {
    path: '/UserEdit',
    name: 'UserEdit',
    component: () => import('@/pages/userEdit.vue'),
    beforeEnter: checkAuthentication,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/pages/Admin.vue'),
    beforeEnter: checkAdmin,
  },
  {
    path: '/cheat',
    name: 'cheat',
    component: () => import('@/pages/cheat.vue'),
    beforeEnter: checkAuthentication,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
