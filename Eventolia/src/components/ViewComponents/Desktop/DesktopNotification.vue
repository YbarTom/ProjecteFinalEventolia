<template>
    <div class="container">
      <div class="left-panel"><LeftSideMainPage/></div>
      <div class="right-panel">
        <RightSideNotification :notifications="notifications" />
      </div>
    </div>
</template>

<script setup>
import LeftSideMainPage from "@/components/components/LeftSideMainPage.vue";
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
  flex: 1; 
  display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15%;
}
</style>
