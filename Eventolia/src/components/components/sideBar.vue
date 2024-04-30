<template>
  <div class="button-side-bar">
    <!-- Pasando las rutas como propiedades -->
    <ButtonSideBar type="home" buttonText="Home" :route="'/mainpage'" />
    <ButtonSideBar type="lupa" buttonText="Search" :route="'/searchpage'" />
    <ButtonSideBar type="add" buttonText="Create Event" :route="'/createpage'" />
    <ButtonSideBar type="message" buttonText="Message" :route="'/messagespage'" />
    <ButtonSideBar type="bell" buttonText="Notification" :route="'/notificationspage'" />
    <ButtonSideBar type="user" buttonText="Profile" :route="'/profilepage'" />
  </div>
</template>

<script setup>
import ButtonSideBar from './buttonSideBar.vue';
</script>

<style scoped>
.button-side-bar {
  margin-left: 20px;
}
</style>
