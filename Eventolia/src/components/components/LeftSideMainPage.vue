<template>
  <div class="container">
    <div class="leftBar">
      <h1 class="title text-text">Eventolia</h1>
      <SideBar />
      <div class="bar bg-text"></div>
    </div>
  </div>
</template>

<script setup>
import SideBar from './sideBar.vue';

  // Aquí puedes añadir tu lógica JavaScript si es necesario
</script>

<style scoped>
  .container {
    height: 100vh;
  }

  .leftBar {
    width: 54%;
    height: 100vh;
    position: relative; /* Añadimos position: relative para posicionar la barra absolutamente dentro de este div */
  }

  .bar {
    width: 1px; /* Cambiamos el width para que sea una barra fina */
    height: 100vh;
    position: absolute; /* La posicionamos absolutamente dentro de leftBar */
    right: 0; /* La movemos hacia la derecha del contenedor */
    top: 0; /* Alineamos la barra vertical arriba del contenedor */
  }

  .title {
    font-size: 2rem;
    margin: 30px auto 0; /* 20px de margen superior y centrado horizontalmente */
    margin-left: 20px;
    margin-bottom: 30px;
  }
</style>
