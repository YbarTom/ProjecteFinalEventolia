<template>
  <div class="container">
    <TopBarMediumSideMainPage @forYouClicked="handleForYouClicked" @followingClicked="handleFollowingClicked" />
    <div v-if="showRed" class="red-div"></div> <!-- Nuevo div con color rojo -->
    <div v-if="showBlue" class="blue-div"></div> <!-- Nuevo div con color azul -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TopBarMediumSideMainPage from './TopBarMediumSideMainPage.vue';

const showRed = ref(true); // Mostrar el color rojo por defecto
const showBlue = ref(false);

function handleForYouClicked() {
  showRed.value = true;
  showBlue.value = false;
}

function handleFollowingClicked() {
  showRed.value = false;
  showBlue.value = true;
}
</script>

<style scoped>
.container {
  height: 100vh;
  position: relative; /* Aseguramos que los elementos posicionados absolutamente se basen en este contenedor */
}

.red-div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  left: 0;
  width: 100%;
  height: calc(100% - 78px); /* Restamos la altura del topBar */
  background-color: red; /* Color rojo */
}

.blue-div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  left: 0;
  width: 100%;
  height: calc(100% - 78px); /* Restamos la altura del topBar */
  background-color: blue; /* Color azul */
}

/* Ajustamos la posición del div azul */

</style>
