<template>
  <div class="container">
    <div class="div-top">
      <v-autocomplete :items="items" class="mx-auto" density="comfortable" menu-icon=""
        placeholder="Search Google or type a URL" prepend-inner-icon="mdi-magnify" variant="solo" auto-select-first
        item-props rounded></v-autocomplete>
    </div>
    <div class="grid">
      <!-- Aquí puedes agregar el contenido de las columnas -->
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
</script>

<style scoped>
.div-top {
  width: 100%;
  align-self: flex-start;
  margin-top: 35px;
}
.container {
  display: flex;
  flex-direction: column; /* Cambiado de row a column */
  align-items: center;
  height: 100vh;
  width: 79%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  background-color: red;
  margin-top: 20px; /* Agregado margen superior */
  height: 100vh;
  width: 100%;
}
</style>
