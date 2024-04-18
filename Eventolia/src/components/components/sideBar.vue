<template>
  <div class="button-side-bar">
    <!-- Usamos el componente Button con las rutas y textos pasados como atributos -->
    <ButtonSideBar type="home" buttonText="Home" />
    <ButtonSideBar type="lupa" buttonText="Search" />
    <ButtonSideBar type="add" buttonText="Create" />
    <ButtonSideBar type="message" buttonText="Message" />
    <ButtonSideBar type="bell" buttonText="Notification" />
    <ButtonSideBar type="user" buttonText="Profile" />


  </div>
</template>

<script setup>
import ButtonSideBar from './buttonSideBar.vue';

// Aquí puedes añadir tu lógica JavaScript si es necesario
</script>

<style scoped>
.button-side-bar {
  margin-left: 20px;
}
</style>
