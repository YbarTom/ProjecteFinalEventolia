<template>
  <div class="container ">
    <!--para el icono al final de la barra de busquedea append-inner-icon="mdi-microphone"-->
    <div class="div-top">
      <v-autocomplete :items="items" class="mx-auto" density="comfortable" menu-icon=""
        placeholder="Search Google or type a URL" prepend-inner-icon="mdi-magnify" variant="solo" auto-select-first
        item-props rounded></v-autocomplete>
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
.div-top{
  width: 100%;
  align-self: flex-start; /* Esto hará que el div esté tocando la parte superior */
  margin-top: 35px; /* Esto hará que el div esté tocando la parte superior */
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 79%;
}
</style>