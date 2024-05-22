<template>
    <div class="notification-container bg-background">
        <div v-for="(notification, index) in notificationsMessage" :key="index" :class="['notification', notification.type]">
            <div class="content">
                <div class="message">{{ notification.message }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>

import RightSideNotification from "@/components/components/RightSideNotification.vue";

import { onMounted, ref,onUnmounted } from 'vue';
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

<style scoped>

.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-panel {
  flex: 1;
}

.right-panel {
  flex: 2; 
  display: flex;
    justify-content: center;
    align-items: center;
}

.center-content {
    width: 100%;
    max-width: 70%;
}
</style>
