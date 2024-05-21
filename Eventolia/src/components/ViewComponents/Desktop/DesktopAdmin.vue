<template>
  <div class="container">
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <h2>Posts:</h2>
      <div class="grid-container">
        <div v-for="post in filteredPosts" :key="post.id" class="grid-item">
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
        <div v-for="event in filteredEvents" :key="event.id" class="grid-item">
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
import { ref, onMounted, computed } from 'vue';
import * as funcionsCM from '../../../communicationsManager.js';

const loading = ref(true);
const posts = ref([]);
const events = ref([]);

// Propiedades computadas para filtrar los posts y eventos aceptados
const filteredPosts = computed(() => posts.value.filter(post => !post.accepted));
const filteredEvents = computed(() => events.value.filter(event => !event.accepted));

onMounted(async () => {
  try {
    const postData = await funcionsCM.getPosts();
    const eventData = await funcionsCM.getEvents();

    if (postData && Array.isArray(postData) && eventData && Array.isArray(eventData)) {
      // Asignar todos los datos recibidos a las variables posts y events
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
  funcionsCM.acceptPost(postId);
  const postIndex = posts.value.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts.value[postIndex].accepted = true; // Marcar el post como aceptado
  }
};

const deletePost = (postId) => {
  funcionsCM.deletePost(postId);
  posts.value = posts.value.filter(post => post.id !== postId); // Eliminar el post
};

const acceptEvent = (eventId) => {
  funcionsCM.acceptEvent(eventId);
  const eventIndex = events.value.findIndex(event => event.id === eventId);
  if (eventIndex !== -1) {
    events.value[eventIndex].accepted = true; // Marcar el evento como aceptado
  }
};

const deleteEvent = (eventId) => {
 funcionsCM.deleteEvent(eventId);
 events.value = events.value.filter(event => event.id !== eventId); // Eliminar el evento
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
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
  bottom: -8px;
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
