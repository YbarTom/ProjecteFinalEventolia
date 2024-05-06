<template>
  <div class="usuario-info">
    <ImagenUsuario />
    <h1>tom.ybarguengoitia</h1>
  </div>
  <div class="numeros-usu">
    <div>
      <h2>Segidos</h2>
      <h3>1475</h3>
    </div>
    <div>
      <h2>Seguidores</h2>
      <h3>8579</h3>
    </div>
    <div>
      <h2>Publicaciones</h2>
      <h3>439</h3>
    </div>
  </div>
  <div class="btn-seguir">
    <BtnSeguir />
  </div>
</template>

<style scoped>
.usuario-info {
  display: flex;
  align-items: center; /* Alinea verticalmente los elementos */
}

.usuario-info h1 {
  margin-left: 20px; /* Añade un margen a la izquierda del título */
  text-align: center; /* Centra el texto */
  flex-grow: 1; /* Permite que el título ocupe todo el espacio restante */
}

.numeros-usu {
  display: flex;
  justify-content: space-between;
}

.numeros-usu > div {
  margin: 10px;
}
</style>

<script setup>
import ImagenUsuario from '@/components/components/foto.vue'

import BtnSeguir from '@/components/components/UserProfile/btnSeguir.vue'
</script>

