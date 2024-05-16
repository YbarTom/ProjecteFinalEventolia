<template>
  <div class="container">
    <div class="div-top">
      <v-autocomplete
        :items="filteredItems"
        class="mx-auto"
        density="comfortable"
        menu-icon=""
        placeholder="Search Google or type a URL"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        auto-select-first
        item-props
        rounded
        v-model="searchText"
        @input="filterItems"
      ></v-autocomplete>
    </div>
    <div class="buttons-container">
      <button class="button" @click="toggleMap">Botón 1</button>
    </div>
    <div class="grid" v-if="map">
      <div
        class="grid-item"
        v-for="(publicacion, index) in filteredPublicacions"
        :key="index"
        :style="{ backgroundImage: 'url(' + publicacion.image + ')' }"
      ></div>
    </div>
    <div class="map" v-else>
      <Map :searchText="searchText" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import * as funcionsCM from '../../communicationsManager.js';
import Map from './Map.vue';

const map = ref(true);
const searchText = ref('');
const publicacions = ref([]);
const items = ref([]);
const filteredItems = ref([]);

onMounted(async () => {
  adjustGridItemHeight();
  try {
    const dataEvents = await funcionsCM.getEvents();
    items.value = dataEvents;
    publicacions.value = dataEvents;
    filterItems(); // Initialize filtered items
    await nextTick();
    const images = document.querySelectorAll('.grid-item img');
    await Promise.all(
      Array.from(images).map((img) =>
        img.complete ? Promise.resolve() : new Promise((resolve) => img.addEventListener('load', resolve))
      )
    );
    adjustGridItemHeight();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
});

watch(map, () => {
  nextTick(adjustGridItemHeight);
});

const toggleMap = () => {
  map.value = !map.value;
};

const adjustGridItemHeight = () => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    item.style.height = `${item.offsetWidth}px`;
  });
};

const filterItems = () => {
  const searchTerm = searchText.value.toLowerCase();
  filteredItems.value = items.value.filter(item =>
    item.title.toLowerCase().includes(searchTerm)
  );
  filteredPublicacions.value = publicacions.value.filter(publicacion =>
    publicacion.title.toLowerCase().includes(searchTerm)
  );
};

const filteredPublicacions = computed(() => {
  const searchTerm = searchText.value.toLowerCase();
  return publicacions.value.filter(publicacion =>
    publicacion.title.toLowerCase().includes(searchTerm)
  );
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
  display: flex;
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
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}
.grid-item {
  text-align: center;
  background-image: url('../../assets/images/bici.jpg');
  background-size: cover;
  background-position: center;
}
.grid::-webkit-scrollbar {
  display: none;
}
</style>
