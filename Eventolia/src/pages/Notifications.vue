<template>
  <DesktopNotification :notifications="notifications" v-if="isDesktop"/>
  <MobileNotification :notifications="notifications" v-else/>

</template>

<script setup>


import DesktopNotification from '@/components/ViewComponents/Desktop/DesktopNotification.vue';
import MobileNotification from '@/components/ViewComponents/Mobile/MobileNotification.vue';

import { onMounted, ref,onUnmounted } from 'vue';
import * as funcionsCM from '@/communicationsManager.js'
import { useAppStore } from '@/stores/app';

const notifications = ref([])

const isDesktop = ref(window.innerWidth > 800);

const updateWidth = () => {
  isDesktop.value = window.innerWidth > 800;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

onMounted(async () => {
  try {
    const appStore = useAppStore()
    var user = appStore.getUser()
    notifications.value = await funcionsCM.getNotificationsByIdUser(user.id)
  } catch (error) {
    console.error(error)
  }
})
</script>