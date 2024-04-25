<template>
  <div class="container">
    <div class="left-panel"><LeftSideMainPage/></div>
    <div class="middle-panel"><MediumSideMainPage/></div>
    <div class="right-panel"><RightSideMainPage/></div>
  </div>
</template>

<script setup>
import LeftSideMainPage from "@/components/components/LeftSideMainPage.vue";
import MediumSideMainPage from "@/components/components/MediumSideMainPage.vue";
import RightSideMainPage from "@/components/components/RightSideMainPage.vue";

</script>

<style scoped>
  .container {
    display: flex;
    height: 100vh;
  }

  .left-panel, .middle-panel, .right-panel {
    flex: 1;
  }


</style>
