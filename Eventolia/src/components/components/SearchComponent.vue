<template>
  <div class="container">
    <div class="div-top">
      <v-autocomplete :items="items" class="mx-auto" density="comfortable" menu-icon=""
        placeholder="Search Google or type a URL" prepend-inner-icon="mdi-magnify" variant="solo" auto-select-first
        item-props rounded></v-autocomplete>
    </div>
    <div class="grid" ref="grid">
      <!-- Aquí puedes agregar el contenido de las columnas -->
      <div class="grid-item" v-for="index in 20" :key="index"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
  // Calcula la altura para hacer coincidir con el ancho
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.style.height = `${item.offsetWidth}px`;
  });
});
</script>

<style scoped>

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
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
  max-height: 90vh; /* Altura máxima del contenedor */
  width: 100%;
  overflow-y: auto; /* Añadir barra de desplazamiento vertical si es necesario */
}

.grid::-webkit-scrollbar {
  display: none;
}
.grid-item {
  background-color: white;
  border: 1px solid black;
  text-align: center;
}
</style>
