<template>
  <div ref="divExterior" class="div-exterior bg-principal">
    <div class="profile-div bg-warning"></div>
    <img ref="image" class="profile-img" src="../../assets/images/rascacielos.jpeg" alt="Imagen de perfil" @load="adjustHeight" />
    <div ref="commentsDiv" class="comments-div bg-warning"></div>
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
    const clampedHeight = Math.min(Math.max(totalHeight, 400), 750); // Limitar la altura entre 400 y 750 píxeles
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
  width: 100%;
  height: 65px;
  border-radius: 8px 8px 0 0;
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
