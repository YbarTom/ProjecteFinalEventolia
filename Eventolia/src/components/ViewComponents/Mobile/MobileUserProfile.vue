<template>
    <div class="container">
      <div class="user-side"><UserSideUserProfilePage/></div>
    </div>
  </template>

  <script setup>
    import UserSideUserProfilePage from '@/components/components/UserProfile/UserSideUserProfilePage.vue'
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
}


</style>

