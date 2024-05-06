<template>
  <div class="container">
    <div class="left-panel">
      <LeftSideMainPage />
    </div>
    <div class="user-side">
      <UserSideUserProfilePage :userProfile="userProfile" :ownProfile="ownProfile"/>
    </div>
  </div>
</template>

<script setup>
import LeftSideMainPage from "@/components/components/LeftSideMainPage.vue";
import UserSideUserProfilePage from '@/components/components/UserProfile/UserSideUserProfilePage.vue'
import { defineProps } from "vue";

const props = defineProps({
  userProfile: Object,
  ownProfile: Boolean
})
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-panel {
  flex: 1;
}

.user-side {
  flex: 2;
  width: 100%;
}
</style>
