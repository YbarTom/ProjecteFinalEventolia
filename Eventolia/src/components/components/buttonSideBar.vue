<template>
  <div class="button">
    <div class="svg-container">
      <!-- Utilizamos la imagen de la lupa directamente -->
      <v-icon :icon="icono" class="text-text" />
    </div>
    <h3 class="text-text">{{ buttonText }}</h3>
  </div>
</template>

<script setup>
import { defineProps,ref} from 'vue';

const icono = ref('');



const props = defineProps({
  type: String,
  buttonText: String
});

// Definimos la ruta del SVG basada en el tipo proporcionado y el tema actual
if (props.type === 'home') {
  icono.value = "mdi-home";
}else if (props.type === 'lupa') {
  icono.value = "mdi-magnify";
}else if (props.type === 'add') {
  icono.value = "mdi-plus";
}else if (props.type === 'message') {
  icono.value = "mdi-message";
}else if (props.type === 'bell') {
  icono.value = "mdi-bell";
}else if (props.type === 'user') {
  icono.value = "mdi-account";
}

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

h3 {
  margin: 0;
  /* Elimina el margen predeterminado del h3 */
}
</style>
