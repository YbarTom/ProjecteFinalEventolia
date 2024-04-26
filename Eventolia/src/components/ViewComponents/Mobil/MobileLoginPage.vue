<template>
    <div class="container">
      <div class="left-panel"><LeftSideLoginPage/></div>
      <div class="right-panel"><RightSideLoginPage/></div>
      <div class="imagen"><imagen/></div>
    </div>
  </template>
  
  <script setup>
  
    import LeftSideLoginPage from '@/components/components/Log_Reg/LogIn/LeftSideLoginPage.vue'
    import RightSideLoginPage from '@/components/components/Log_Reg/LogIn/RightSideLoginPage.vue'
  
    import imagen from '@/components/components/foto.vue'
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
  