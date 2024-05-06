<template>
  <div class="container">
    <div class="list-container">
      <div>
        <UserChat buttonText="tom.ybarguengoitia" :isSelected="selectedUser === 'tom.ybarguengoitia'" @selectUser="selectUser"/>
        <UserChat buttonText="mikiDix" :isSelected="selectedUser === 'mikiDix'" @selectUser="selectUser"/>
        <UserChat buttonText="crosmyc" :isSelected="selectedUser === 'crosmyc'" @selectUser="selectUser"/>
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser"/>
      </div>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
    <div class="input-container">
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
      selectedUser.value = user;
    };

    onMounted(() => {
      // Puedes agregar cualquier lógica adicional que necesites cuando se monta el componente
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
  width: 70%;
  background-color: blue;
}
</style>
