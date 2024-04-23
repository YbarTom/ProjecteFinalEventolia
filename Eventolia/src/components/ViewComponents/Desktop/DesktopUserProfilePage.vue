<template>
    <div class="container">
      <div class="left-panel"><LeftSideMainPage/></div>
      <div class="user-side"><UserSideUserProfilePage/></div>
    </div>
  </template>
  
  <script setup>
  import LeftSideMainPage from "@/components/components/LeftSideMainPage.vue";
  import UserSideUserProfilePage from '@/components/components/UserProfile/UserSideUserProfilePage.vue'
  </script>
  
<style scoped>
  .container {
    display: flex;
    height: 100vh;
  }

  .left-panel {
    flex: 1;
    overflow: auto; /* para el manejo de desbordamientos de contenido */
    min-width: 635px; /* No tocar es para que tenga el mismo tamaño que en la barra de la pagina Main*/
  }

  .resizer {
    cursor: ew-resize;
    background-color: #ccc;
    width: 5px;
  }

  .user-side {
    flex: 3;
    overflow: auto;
  }
</style>

  