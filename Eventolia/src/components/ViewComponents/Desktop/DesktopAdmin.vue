<template>
  <div class="container">
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <h2>Posts:</h2>
      <div class="grid-container">
        <div v-for="post in posts" :key="post.id" class="grid-item">
          <img :src="post.image" alt="Imagen del post">
          <p>{{ post.title }}</p>
          <div class="button-container">
            <button @click="acceptPost(post.id)">
              <span class="mdi mdi-check"></span>
            </button>
            <button @click="deletePost(post.id)">
              <span class="mdi mdi-delete"></span>
            </button>
          </div>
        </div>
      </div>
      <h2>Eventos:</h2>
      <div class="grid-container">
        <div v-for="event in events" :key="event.id" class="grid-item">
          <img :src="event.image" alt="Imagen del evento">
          <p>{{ event.name }}</p>
          <div class="button-container">
            <button @click="acceptEvent(event.id)">
              <span class="mdi mdi-check"></span>
            </button>
            <button @click="deleteEvent(event.id)">
              <span class="mdi mdi-delete"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as funcionsCM from '../../../communicationsManager.js';

const loading = ref(true);
const posts = ref([]);
const events = ref([]);

onMounted(async () => {
  try {
    const postData = await funcionsCM.getPosts();
    const eventData = await funcionsCM.getEvents();

    if (postData && Array.isArray(postData) && eventData && Array.isArray(eventData)) {
      posts.value = postData;
      events.value = eventData;
      loading.value = false;
    } else {
      console.error('Error: Invalid data format received.');
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    loading.value = false;
  }
});

const acceptPost = (postId) => {
  // Lógica para aceptar un post con el ID dado
};

const deletePost = (postId) => {
  // Lógica para borrar un post con el ID dado
};

const acceptEvent = (eventId) => {
  // Lógica para aceptar un evento con el ID dado
};

const deleteEvent = (eventId) => {
  // Lógica para borrar un evento con el ID dado
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  position: relative;
}

.grid-item img {
  max-width: 100%;
  height: auto;
}

.button-container {
  position: absolute;
  bottom: 3px;
  right: 5px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

span.mdi {
  font-size: 24px; /* Tamaño de los íconos */
  margin: 0 5px; /* Espaciado entre los íconos y el borde del botón */
}
</style>
