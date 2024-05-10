<template>
  <div class="ancho">
    <div class="grid" ref="grid" v-if="map">
      <!-- Aquí puedes agregar el contenido de las columnas -->
      <div class="grid-item" v-for="(post, index) in props.posts" :key="index" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, watch,nextTick } from 'vue';
import * as funcionsCM from '../../../communicationsManager.js'
import { defineProps } from "vue";

const props = defineProps({
    posts: Array,
    events: Array
})

const map = ref(true);
const publicacions = ref([]);


onMounted(() => {
  console.log(props.posts)
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
