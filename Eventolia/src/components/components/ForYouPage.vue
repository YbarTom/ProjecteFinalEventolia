<template>
  <div class="div">
    <SimplePublication v-for="post in posts" :key="post.id" :post="post"/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import SimplePublication from './SimplePublication.vue'
import * as funcionsCM from '../../../communicationsManager.js'

const posts = ref([]);

onMounted(async () => {
  try {
    const data = await funcionsCM.getPosts()
    posts.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
.div {
  position: absolute; /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px; /* Altura del topBar */
  width: 100%;
  height: calc(100% - 78px);
  justify-content: center; /* Centramos horizontalmente el contenido */
  flex-direction: column;
  overflow-y: auto; /* Habilitamos el desplazamiento vertical */

}

/* Ocultar la barra de desplazamiento */
.div::-webkit-scrollbar {
  display: none;
}
</style>
