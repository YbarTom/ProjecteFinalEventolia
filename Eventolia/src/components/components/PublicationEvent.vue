<template>
  <div>
    <div class="adminEvent">
      <div class="perfil-img"></div>
      <div>
        <p class="first-text"><b>tom.ybarguengoitia</b></p>
        <p class="second-text">El Dirty</p>
      </div>

    </div>
    <SimplePublication />
  </div>
</template>

<script setup>
import SimplePublication from './SimplePublication.vue'; // Importamos el componente SimplePublication
</script>


<style scoped>
.first-text {
  margin-bottom: 0;
  /* Reduce el espacio debajo del primer párrafo */
}

.second-text {
  font-size: 0.8em;
  /* Hace que el segundo texto sea más pequeño */
  margin-top: 0;
  /* Reduce el espacio encima del segundo párrafo */
}

.adminEvent {
  width: 450px;
  height: 65px;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.perfil-img {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background-image: url("../../assets/images/profile2.png");
  background-size: cover;
  border-radius: 50%;
  margin-right: 10px;
}</style>
