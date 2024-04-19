<template>
  <div class="div-exterior bg-principal">
    <div class="profile-div bg-warning"></div>
    <img src="../../assets/images/rascacielos.jpeg" alt="Imagen publicacion" class="profile-img">
  </div>
</template>

<script setup>
</script>

<style scoped>
.div-exterior {
  margin-top: 10px;
  border-radius: 8px;
  height: 600px;
  width: 468px;
  position: relative; /* Añadimos posición relativa para que la imagen se posicione correctamente */
  overflow: hidden; /* Ocultamos cualquier parte de la imagen que se extienda más allá del contenedor */
}

.profile-div {
  width: 100%;
  height: 65px;
  border-radius: 8px 8px 0px 0px;
}

.profile-img {
  position: absolute; /* Posicionamos la imagen absolutamente dentro del contenedor */
  top: 65px; /* Colocamos la imagen debajo del div .profile-div */
  left: 0;
  width: 100%; /* Ajustamos el ancho de la imagen al 100% del contenedor */
  height: auto; /* Permitimos que la altura de la imagen se ajuste automáticamente */
  max-height: calc(100% - 65px); /* Establecemos la altura máxima de la imagen al espacio restante */
  max-width: 100%; /* Establecemos el ancho máximo de la imagen al 100% del contenedor */
}
</style>
