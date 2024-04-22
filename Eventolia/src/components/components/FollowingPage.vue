<template>
  <div class="div">
    <ToggleTheme />
  </div> <!-- Nuevo div con color azul -->

</template>

<script setup>
import ToggleTheme from './ToggleTheme.vue';
</script>

<style scoped>

.div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  left: 0;
  width: 100%;
  height: calc(100% - 78px); /* Restamos la altura del topBar */
}

/* Ajustamos la posición del div azul */

</style>
