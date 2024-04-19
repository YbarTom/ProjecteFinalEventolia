<template>
  <div class="red-div"></div> <!-- Nuevo div con color azul -->

</template>

<script setup>

</script>

<style scoped>

.red-div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  left: 0;
  width: 100%;
  height: calc(100% - 78px); /* Restamos la altura del topBar */
  background-color: red; /* Color azul */
}

/* Ajustamos la posición del div azul */

</style>
