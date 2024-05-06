<template>
  <div class="container">
    <ul>
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message...">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Cambia la URL según la ubicación de tu servidor

const messages = ref([]);
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    socket.emit('chat message', newMessage.value);
    newMessage.value = '';
  }
};

socket.on('chat message', (msg) => {
  messages.value.push(msg);
});

onMounted(() => {
  // Puedes agregar cualquier lógica adicional que necesites cuando se monta el componente
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 79%;
}
</style>
