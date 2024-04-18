<template>
  <div class="button">
    <div class="svg-container">
      <!-- Utilizamos la imagen de la lupa directamente -->
      <img :src="svgPath" alt="SVG Icon" />
    </div>
    <h3 class="text-text">{{ buttonText }}</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Importamos las imágenes
import lupa from '../../assets/iconsImages/lupa.svg';
import bell from '../../assets/iconsImages/bell.svg';
import home from '../../assets/iconsImages/home.svg';
import user from '../../assets/iconsImages/user.svg';
import add from '../../assets/iconsImages/add.svg';
import message from '../../assets/iconsImages/message.svg';

const props = defineProps({
  type: String,
  buttonText: String
});

// Definimos la ruta del SVG basada en el tipo proporcionado
let svgPath;
if (props.type === 'lupa') svgPath = lupa;
else if (props.type === 'bell') svgPath = bell;
else if (props.type === 'home') svgPath = home;
else if (props.type === 'user') svgPath = user;
else if (props.type === 'add') svgPath = add;
else if (props.type === 'message') svgPath = message;
</script>

<style scoped>
.button {
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
}

.svg-container {
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  /* Ajusta el espacio entre el icono y el texto */
}

h1 {
  margin: 0;
  /* Elimina el margen predeterminado del h1 */
}
</style>
