<template>
  <div ref="divExterior" class="div-exterior bg-principal">
    <div class="profile-div">
      <div class="perfil-img"></div>
      <p><b>tom.ybarguengoitia</b></p>
    </div>
    <img ref="image" class="profile-img" src="../../assets/images/rascacielos.jpeg" alt="Imagen de perfil" @load="adjustHeight" />
    <div ref="commentsDiv" class="comments-div bg-principal"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const divExterior = ref(null);
const image = ref(null);
const commentsDiv = ref(null);

const adjustHeight = () => {
  if (image.value && commentsDiv.value && divExterior.value) {
    const totalHeight = image.value.offsetHeight + commentsDiv.value.offsetHeight;
    const clampedHeight = Math.min(Math.max(totalHeight, 565), 915); // Limitar la altura entre 565 y 915 píxeles
    divExterior.value.style.height = `${clampedHeight}px`;
  }
}
</script>

<style scoped>
.div-exterior {
  margin-top: 10px;
  border-radius: 8px;
  width: 468px;
  position: relative;
  overflow: hidden;
}

.profile-div {
  display: flex; /* Utilizar flexbox para el diseño */
  align-items: center; /* Centrar verticalmente los elementos hijos */
  width: 100%;
  height: 65px;
  border-radius: 8px 8px 0 0;
}

.perfil-img {
  margin-left: 10px;
  width: 40px; /* Ancho de la imagen de perfil */
  height: 40px; /* Altura de la imagen de perfil */
  background-image: url("../../assets/images/profile.png"); /* Ruta de la imagen de perfil */
  background-size: cover; /* Ajustar la imagen de perfil para cubrir completamente el contenedor */
  border-radius: 50%; /* Borde circular para la imagen de perfil */
  margin-right: 10px; /* Espacio entre la imagen de perfil y el texto */
}

.comments-div {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  border-radius: 0 0 8px 8px;
}

.profile-img {
  position: absolute;
  top: 65px;
  left: 0;
  width: 100%;
  height: auto;
  max-height: calc(100% - 65px);
  max-width: 100%;
}
</style>
