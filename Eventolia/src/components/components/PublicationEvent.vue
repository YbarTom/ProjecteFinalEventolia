<template>
  <div class="exterior">
    <div class="adminEvent" @click="showText = !showText">
      <div class="left">
        <div class="perfil-img"></div>
        <div>
          <p class="first-text"><b>tom.ybarguengoitia</b></p>
          <p class="second-text">El Dirty</p>
        </div>
      </div>
      <div class="right">
        <p><b>5.000</b></p>
        <v-icon icon="mdi-account-multiple" class="text-text" />
      </div>
    </div>
    <div v-if="showText">
      <p class="definition">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
    <SimplePublication />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SimplePublication from './SimplePublication.vue'; // Importamos el componente SimplePublication

const showText = ref(false); // Inicializamos showText como false

</script>


<style scoped>
.definition{
  margin-left: 10px;
  margin-right: 10px;
}
.exterior {
  border-radius: 8px;
  width: 450px;
  position: relative;
  overflow: hidden;
}
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
  justify-content: space-between;
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
}

.left{
  display: flex;
  align-items: center;
}

.right{
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>
