<template>
  <div class="div">
    <Publication v-for="post in posts" :key="post.id" :post="post" />
  </div> <!-- Nuevo div con color azul -->

</template>

<script setup>
import Publication from './Publication.vue';
import { onMounted } from 'vue';
import * as funcionsCM from '../../communicationsManager.js';
import { useAppStore } from '@/stores/app.js'

const posts = ref([])

onMounted(async () => {
  try {
    const appStore = useAppStore()
    const user = appStore.getUser()
    const data = await funcionsCM.getFollowingPage(user)
    posts.value = data;
    console.log(posts.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
.div {
  position: absolute;
  /* Posicionamos el div absolutamente dentro del contenedor */
  top: 78px;
  /* Altura del topBar */
  left: 0;
  width: 100%;
  height: calc(100% - 78px);
  overflow-y: auto;
  /* Restamos la altura del topBar */
}
.div::-webkit-scrollbar {
  display: none;
}
/* Ajustamos la posición del div azul */
</style>
