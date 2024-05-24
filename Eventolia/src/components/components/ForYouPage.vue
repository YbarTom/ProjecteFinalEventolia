<template>
  <div class="div">
    <Publication v-for="post in posts" :key="post.id" :post="post"/>
  </div>
</template>

<script setup>
import Publication from './Publication.vue';
import { onMounted } from 'vue';
import * as funcionsCM from '../../communicationsManager.js'
import { useAppStore } from '@/stores/app.js';

const posts = ref([]);

onMounted(async () => {
  try {
    const appStore = useAppStore();
    const user = appStore.getUser();

    const dataEvents = await funcionsCM.getAlgorithm(user.id);
    const posts = await funcionsCM.getPosts();

    // Intercalar los elementos de dataEvents y posts
    const combined = [];
    const maxLength = Math.max(dataEvents.length, posts.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < dataEvents.length) {
        combined.push(dataEvents[i]);
      }
      if (i < posts.length) {
        combined.push(posts[i]);
      }
    }

    console.log(combined);
    posts.value = combined;
  } catch (error) {
    console.error('Error fetching data: ', error);
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
