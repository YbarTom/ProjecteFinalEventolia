<template>
  <div class="container">
    <TopBarMediumSideMainPage @forYouClicked="handleForYouClicked" @followingClicked="handleFollowingClicked" />
    <ForYouPage v-if="showRed" />
    <FollowingPage v-if="showBlue" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TopBarMediumSideMainPage from './TopBarMediumSideMainPage.vue';
import ForYouPage from './ForYouPage.vue'; // Importamos el componente ForYouPage
import FollowingPage from './FollowingPage.vue'; // Importamos el componente FollowingPage
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
  position: relative;
  /* Aseguramos que los elementos posicionados absolutamente se basen en este contenedor */
}



/* Ajustamos la posición del div azul */</style>
