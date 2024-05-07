<template>
  <div class="container">
    <div class="list-container">
      <div class="users">
        <UserChat buttonText="tom.ybarguengoitia" :isSelected="selectedUser === 'tom.ybarguengoitia'" @selectUser="selectUser"/>
        <UserChat buttonText="mikiDix" :isSelected="selectedUser === 'mikiDix'" @selectUser="selectUser"/>
        <UserChat buttonText="crosmyc" :isSelected="selectedUser === 'crosmyc'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
      </div>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div class="input-container" :class="{ 'background-color-1': selectedUser === 'tom.ybarguengoitia', 'background-color-2': selectedUser === 'mikiDix', 'background-color-3': selectedUser === 'crosmyc', 'background-color-4': selectedUser === 'fcbarcelona' }">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message...">
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import UserChat from './UserChat.vue';

export default {
  components: {
    UserChat
  },
  setup() {
    const socket = io('http://localhost:3001');

    const messages = ref([]);
    const newMessage = ref('');
    const selectedUser = ref(null);

    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        socket.emit('chat message', newMessage.value);
        newMessage.value = '';
      }
    };

    socket.on('chat message', (msg) => {
      messages.value.push(msg);
    });

    const selectUser = (user) => {
      if (selectedUser.value === user) {
        selectedUser.value = null; // Deseleccionar si ya está seleccionado
      } else {
        selectedUser.value = user; // Seleccionar el usuario
      }
    };

    onMounted(() => {
      // Lógica adicional al montar el componente
    });

    return {
      messages,
      newMessage,
      selectedUser,
      sendMessage,
      selectUser
    };
  }
};
</script>

<style scoped>
.users{
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  height: 90vh;
}
.container {
  margin-top: 70px;
  display: flex;
  height: 90vh;
  width: 79%;
}

.list-container {
  flex: 1;
  width: 30%;
}

.input-container {
  height: 90vh;
  width: 70%;
}

.background-color-1 {
  background-color: red;
}

.background-color-2 {
  background-color: green;
}

.background-color-3 {
  background-color: blue;
}

.background-color-4 {
  background-color: yellow;
}

.users::-webkit-scrollbar {
  width: 10px;
}
</style>
