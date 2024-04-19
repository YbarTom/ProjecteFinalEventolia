<template>
  <div class="div">
    <SimplePublication />
  </div>
</template>

<script setup>
import SimplePublication from './SimplePublication.vue'; // Importamos el componente SimplePublication
</script>

<style scoped>
.div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  left: 0;
  width: 100%;
  height: calc(100% - 78px); /* Restamos la altura del topBar */
  display: flex; /* Convertimos el div en un contenedor flex */
  justify-content: center; /* Centramos horizontalmente el contenido */
}
</style>
