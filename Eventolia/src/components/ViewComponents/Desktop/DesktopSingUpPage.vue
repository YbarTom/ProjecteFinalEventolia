<template>
    <div class="right-panel"><RightSideSingUpPage/></div>
    <div class="midium-panel"><MidiumSideSingUpPage/></div>
    <div class="left-panel"><LeftSideSingUpPage/></div>
</template>
  
<script setup>
    import RightSideSingUpPage from '@/components/components/Log_Reg/RightSideSingUpPage.vue'
    import MidiumSideSingUpPage from '@/components/components/Log_Reg/MidiumSideSingUpPage.vue'
    import LeftSideSingUpPage from '@/components/components/Log_Reg/LeftSideSingUpPage.vue'

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
  