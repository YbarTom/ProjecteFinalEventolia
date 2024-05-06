<template>
  <div class="ancho">
    <div class="grid" ref="grid" v-if="map">
      <!-- Aquí puedes agregar el contenido de las columnas -->
      <div class="grid-item" v-for="(publicacion, index) in publicacions" :key="index" :style="{ backgroundImage: 'url(' + publicacion.image + ')' }"></div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, watch,nextTick } from 'vue';
import * as funcionsCM from '../../../communicationsManager.js'

const map = ref(true);
const publicacions = ref([]);


onMounted(() => {
  adjustGridItemHeight();
});


watch(map, () => {
  nextTick(adjustGridItemHeight);
});

const adjustGridItemHeight = () => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.style.height = `${item.offsetWidth}px`;
  });
};

onMounted(async () => {
  try {
    const dataPosts = await funcionsCM.getPostsEvents();
    //const dataEvents = await funcionsCM.getEvents();
    publicacions.value = dataPosts;
    console.log(publicacions.value);

    // Esperar a que todas las imágenes se carguen antes de ajustar la altura de los elementos
    await Promise.all(Array.from(document.querySelectorAll('.grid-item img')).map(img => img.complete ? Promise.resolve() : new Promise(resolve => img.addEventListener('load', resolve))));
    adjustGridItemHeight();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
});

</script>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  width: 100%;
  max-height: calc(100vh - 150px); /* Altura máxima del grid, ajustada por la altura de los botones */
  overflow-y: auto; /* Añadir barra de desplazamiento vertical si es necesario */
}

.grid-item {
  text-align: center;
  background-image: url('../../../assets/images/bici.jpg');
  /* Ajustar el tamaño de la imagen */
  background-size: cover;
  background-position: center;
}

.grid::-webkit-scrollbar {
  display: none;
}
</style>
