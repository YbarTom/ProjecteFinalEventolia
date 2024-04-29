<template>
    <div class="container">
      <div class="right-panel"><RightSideLoginPage/></div>
    </div>
  </template>
  
  <script setup>
    import RightSideLoginPage from '@/components/components/Log_Reg/LogIn/RightSideLoginPage.vue'
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
  