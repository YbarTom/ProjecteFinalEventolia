<template>
    <div class="container">
      <div class="left-panel"><LeftSideSignUpPage/></div>
      <div class="middle-panel"><MidiumSideSignUpPage/></div>
      <div class="right-panel"><RightSideSingUpPage/></div>
    </div>
  </template>
  
    
  <script setup>
      import RightSideSingUpPage from '@/components/components/Log_Reg/SignUpPage/RightSideSignUpPage.vue'
      import MidiumSideSignUpPage from '@/components/components/Log_Reg/SignUpPage/MidiumSideSignUpPage.vue'
      import LeftSideSignUpPage from '@/components/components/Log_Reg/SignUpPage/LeftSideSignUpPage.vue';
  
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
    