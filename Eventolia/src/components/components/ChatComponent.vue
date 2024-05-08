<template>
  <div class="container">
    <div class="list-container">
      <div class="users">
        <UserChat buttonText="tom.ybarguengoitia" :isSelected="selectedUser === 'tom.ybarguengoitia'"
          @selectUser="selectUser" />
        <UserChat buttonText="mikiDix" :isSelected="selectedUser === 'mikiDix'" @selectUser="selectUser" />
        <UserChat buttonText="crosmyc" :isSelected="selectedUser === 'crosmyc'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
        <UserChat buttonText="fcbarcelona" :isSelected="selectedUser === 'fcbarcelona'" @selectUser="selectUser" />
      </div>

    </div>
    <div class="input-container"
      :class="{ 'background-color-1': selectedUser === 'tom.ybarguengoitia', 'background-color-2': selectedUser === 'mikiDix', 'background-color-3': selectedUser === 'crosmyc', 'background-color-4': selectedUser === 'fcbarcelona' }">

      <ul>
        <li v-for="(message, index) in messages" :key="index"
          :class="message.user === myUser ? 'right-message' : 'left-message'"> <span class="span bg-principal text-text" >{{ message.message
          }}</span>
        </li>
      </ul>

      <div class="form">
        <input class="input" type="text" v-model="newMessage" @keyup.enter="sendMessage"
          placeholder="Type your message..."><button @click="sendMessage">Send</button>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import UserChat from './UserChat.vue';
import { useAppStore } from '@/stores/app.js'

export default {
  components: {
    UserChat
  },
  setup() {
    const socket = io('http://localhost:3001');
    const messages = ref([]);
    const newMessage = ref('');
    const selectedUser = ref(null);
    const myUser = ref(useAppStore().getUser().userName); // Declare myUser as a ref
    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        const message = {
          user: myUser.value, // Access myUser as a ref
          message: newMessage.value
        };
        socket.emit('chat message', message);
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
      myUser, // Return myUser as part of the setup return object
      sendMessage,
      selectUser
    };
  }
};

</script>


<style scoped>
.span {
  color: white;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word; /* Agregamos esta propiedad */
  max-width: 100px; /* Establece el ancho máximo del mensaje */

}

ul {
  margin-top: 10px;
  list-style: none;
  overflow-y: auto;
}
li {
  margin-bottom: 15px;
}

.right-message {

  text-align: right;
}

.left-message {
  text-align: left;
}

.form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  display: flex;
  height: 3rem;
  bottom: 0;
  width: 36.9%;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}

.input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}

.input:focus {
  outline: none;
}

.form>button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}


.users {
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
  overflow-y: auto;
  width: 70%;
}

.background-color-1 {}

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
.input-container::-webkit-scrollbar {
  width: 10px;
}
</style>
