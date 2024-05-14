<template>
  <div class="container">
    <div class="div-top">
      <v-autocomplete :items="items" class="mx-auto" density="comfortable" menu-icon=""
        placeholder="Search Google or type a URL" prepend-inner-icon="mdi-magnify" variant="solo" auto-select-first
        item-props rounded></v-autocomplete>
    </div>
    <div class="buttons-container">
      <button class="button" @click="map = !map">Botón 1</button>
    </div>
    <div class="grid" ref="grid" v-if="map">
      <div class="grid-item" v-for="(publicacion, index) in publicacions" :key="index" :style="{ backgroundImage: 'url(' + publicacion.image + ')' }"></div>
    </div>
    <div class="map" v-else>
      <Map />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch,nextTick } from 'vue';
import * as funcionsCM from '../../communicationsManager.js'
import Map from "./Map.vue";

const map = ref(true);
const publicacions = ref([]);

const items = ref([
  {
    prependIcon: 'mdi-clock-outline',
    title: 'recipe with chicken',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'best hiking trails near me',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'how to learn a new language',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'DIY home organization ideas',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'latest fashion trends',
  },
]);

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
    const dataEvents = await funcionsCM.getEvents();
    publicacions.value = dataEvents;
    console.log(publicacions.value)
    // Esperar a que todas las imágenes se carguen antes de ajustar la altura de los elementos
    await Promise.all(Array.from(document.querySelectorAll('.grid-item img')).map(img => img.complete ? Promise.resolve() : new Promise(resolve => img.addEventListener('load', resolve))));
    adjustGridItemHeight();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
});

</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
.div-top {
  width: 100%;
  align-self: flex-start;
  margin-top: 35px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 79%;
}
.buttons-container {
  display: flex-start;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
}
.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
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
  background-image: url('../../assets/images/bici.jpg');
  /* Ajustar el tamaño de la imagen */
  background-size: cover;
  background-position: center;
}

.grid::-webkit-scrollbar {
  display: none;
}
</style>
