<template>
  <DesktopNotification :notifications="notifications"/>
</template>

<script setup>
import DesktopNotification from '@/components/ViewComponents/Desktop/DesktopNotification.vue';
import { onMounted, ref } from 'vue';
import * as funcionsCM from '@/communicationsManager.js'
import { useAppStore } from '@/stores/app';

const notifications = ref([])

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