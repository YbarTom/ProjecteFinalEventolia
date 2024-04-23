<template>
    <div class="container">
      <div class="left-panel"><LeftSideMainPage/></div>
      <div class="user-side"><UserSideUserProfilePage/></div>
    </div>
  </template>
  
  <script setup>
  import LeftSideMainPage from "@/components/components/LeftSideMainPage.vue";
  import UserSideUserProfilePage from '@/components/components/'
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
  