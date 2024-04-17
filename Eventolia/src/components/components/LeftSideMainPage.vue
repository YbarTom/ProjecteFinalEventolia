<template>
  <div class="container">
    <div class="leftBar">
      <div class="bar bg-text"></div>
    </div>
  </div>
</template>

<script setup>
  // Aquí puedes añadir tu lógica JavaScript si es necesario
</script>

<style scoped>
  .container {
    height: 100vh;
  }

  .leftBar {
    width: 54%;
    height: 100%;
    position: relative; /* Añadimos position: relative para posicionar la barra absolutamente dentro de este div */
  }

  .bar {
    width: 1px; /* Cambiamos el width para que sea una barra fina */
    height: 100%;
    position: absolute; /* La posicionamos absolutamente dentro de leftBar */
    right: 0; /* La movemos hacia la derecha del contenedor */
    top: 0; /* Alineamos la barra vertical arriba del contenedor */
  }
</style>
