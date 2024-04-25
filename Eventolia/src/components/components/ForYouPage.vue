<template>
  <div class="div">

    <Publication />
    <Publication />

  </div>
</template>

<script setup>
import Publication from './Publication.vue';
</script>

<style scoped>
.div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  width: 100%;
  height: calc(100% - 78px);
  justify-content: center; /* Centramos horizontalmente el contenido */
  flex-direction: column;
  overflow-y: auto; /* Habilitamos el desplazamiento vertical */

}
/* Ocultar la barra de desplazamiento */
.div::-webkit-scrollbar {
  display: none;
}
</style>
