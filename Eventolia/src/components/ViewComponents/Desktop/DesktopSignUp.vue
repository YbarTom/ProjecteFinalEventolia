<template>
    <div class="right-panel"><RightSideSingUpPage/></div>
    <div class="midium-panel"><MidiumSideSignUpPage/></div>
    <div class="left-panel"><LeftSideSignUpPage/></div>
</template>
  
<script setup>
    import RightSideSingUpPage from '@/components/components/Log_Reg/SignUpPage/RightSideSingUpPage.vue'
    import MidiumSideSignUpPage from '@/components/components/Log_Reg/MidiumSideSignUpPage.vue'
    import LeftSideSignUpPage from '@/components/components/Log_Reg/LeftSideSignUpPage.vue'

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
  