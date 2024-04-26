<template>
  <div class="container">
    <div class="middle-panel"><MediumSideMainPage/></div>
  </div>
</template>

<script setup>
import MediumSideMainPage from "@/components/components/MediumSideMainPage.vue";
  //
</script>

<style scoped>
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;

  }

  .left-panel, .middle-panel, .right-panel {
    flex: 1;
  }

  ::-webkit-scrollbar {
  display: none;
}

</style>
