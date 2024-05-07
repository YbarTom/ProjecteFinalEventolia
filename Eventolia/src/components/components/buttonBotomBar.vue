<template>
    <div class="button-side-bar">
      <!-- Pasando las rutas como propiedades -->
      <ButtonSideBar type="home"    :route="'/mainpage'" />
      <ButtonSideBar type="lupa"    :route="'/searchpage'" />
      <ButtonSideBar type="add"     :route="'/createpage'" />
      <ButtonSideBar type="message" :route="'/messagespage'" />
      <ButtonSideBar type="bell"    :route="'/notificationspage'" />
      <ButtonSideBar type="user"    :route="'/userprofile'" />
    </div>
  </template>
  
  <script setup>
  import ButtonSideBar from './buttonSideBar.vue';
  </script>
  
  <style scoped>
    .button-side-bar {
    display: flex;
    justify-content: space-around;
    margin-left: 5%;
    margin-right: auto;
    }
</style>