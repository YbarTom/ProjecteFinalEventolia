<template>
  <div class="imagenes">
    <div class="estrucImg">
      <div class="foto">
        <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
      </div>
      <div class="foto">
        <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
      </div>
      <div class="foto">
        <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
      </div>
    </div>
  </div>

    <div class="grid" ref="grid" >
      <!-- Aquí puedes agregar el contenido de las columnas -->
      <div class="grid-item" v-for="(publicacion, index) in publicacions" :key="index" :style="{ backgroundImage: 'url(' + publicacion.image + ')' }"></div>
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
.imagenes {
  padding: 20px;
}

.estrucImg {
  display: flex; /* Activando flexbox para el contenedor */
  justify-content: space-around; /* Distribución con espacio alrededor */
}

.foto {
  flex: 1; /* Cada elemento hijo de 'estrucImg' toma el mismo espacio */
  padding: 10px; /* Espacio dentro de cada contenedor de imagen */
  display: flex; /* Flexbox para centrar la imagen */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
}

.profile-img {
  max-width: 100%; /* La imagen ocupa como máximo el 100% de su contenedor */
  height: auto; /* Altura automática para mantener la proporción de la imagen */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 79%;
}

.div-top {
  width: 100%;
  align-self: flex-start;
  margin-top: 35px;
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
  background-image: url('../../../assets/images/bici.jpg');
  /* Ajustar el tamaño de la imagen */
  background-size: cover;
  background-position: center;
}

.grid::-webkit-scrollbar {
  display: none;
}
</style>
