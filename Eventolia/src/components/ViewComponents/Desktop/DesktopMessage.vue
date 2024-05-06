<template>
  <div class="container">
    <div class="left-panel"><LeftSideMainPage/></div>
    <div class="middle-panel "><ChatComponent/></div>
  </div>
</template>

<script setup>
import LeftSideMainPage from "@/components/components/LeftSideMainPage.vue";
import ChatComponent from "@/components/components/ChatComponent.vue";
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

.middle-panel {
  flex: 2; /* Ocupa los dos tercios del contenedor */
}
</style>
