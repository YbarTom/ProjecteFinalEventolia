<template>
  <div class="container">
    <div class="list-container">
      <div class="users">
        <UserChat v-for="(chat, index) in myChats" :key="index" :buttonText="chat.users[0]"
          :isSelected="selectedUser === chat" @selectUser="selectUser(chat)" />
      </div>
    </div>
    <div class="input-container"
      :class="{ 'background-color-1': selectedUser === 'tom.ybarguengoitia', 'background-color-2': selectedUser === 'mikiDix', 'background-color-3': selectedUser === 'crosmyc', 'background-color-4': selectedUser === 'fcbarcelona' }">
      <ul>
        <li v-for="(message, index) in messages" :key="index"
          :class="message.user === myUser && message.type==='message' ? 'right-message' : 'left-message'">

          <div v-if="message.type === 'message'"
            :class="{ 'width': true, 'bg-principal3': message.user === myUser, 'bg-principal2': message.user !== myUser, 'text-text': true }">
            <span class="span ">{{ message.message }}</span>
          </div>
          <div v-if="message.type === 'post'"
          :class="{ 'width': true, 'bg-principal3': message.user === myUser, 'bg-principal2': message.user !== myUser, 'text-text': true }">
            <PublicationEvent :post="message.message" />
          </div>
        </li>
      </ul>
      <div class="form">
        <input class="input" type="text" v-model="newMessage" @keyup.enter="sendMessage"
          placeholder="Type your message...">
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import PublicationEvent from './PublicationEvent.vue';
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import UserChat from './UserChat.vue';
import { useAppStore } from '@/stores/app.js';
import * as funcionsCM from '../../communicationsManager.js';

export default {
  components: {
    UserChat
  },
  setup() {
    const socket = io('http://localhost:3001');
    const messages = ref([]);
    const newMessage = ref('');
    const selectedUser = ref(null);
    const myUser = ref(useAppStore().getUser().email);
    const myChats = ref([]);

    const closeChat = () => {
      selectedUser.value = null;
      messages.value = [];
    };

    const loadMyChats = async () => {
      try {
        const data = await funcionsCM.getChats();
        myChats.value = data.map(chat => {
          return {
            ...chat,
            users: chat.users.filter(user => user !== myUser.value)
          };
        });

        myChats.value.forEach(async chat => {
          const nombre = await funcionsCM.getUserByEmailName(chat.users[0]);
          chat.users[0] = nombre;});


      } catch (error) {
        console.error('Error loading chats:', error);
      }
    };

    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        const message = {
          user: myUser.value,
          message: newMessage.value,
          room: selectedUser.value.room // Agrega el nombre de la sala al mensaje
        };
        socket.emit('chat message', message);
        funcionsCM.postMessageChat(selectedUser.value.room,newMessage.value, myUser.value,"message");
        newMessage.value = '';
      }
    };

    socket.on('chat message', (msg) => {
      messages.value.push(msg);
    });

    const selectUser = (chat) => {
      if (selectedUser.value === chat) {
        selectedUser.value = null;
      } else {
        selectedUser.value = chat;
        // Envía solicitud al servidor para unirse a la sala
        socket.emit('joinRoom', chat.room); // Envía el nombre de la sala al servidor

        try {
          const roomMessages = chat.messages.map(message => {
            console.log('message:', message);
            return {
              user: message.sender,
              message: message.content,
              type: message.type
            };
          });
          messages.value = roomMessages;
          console.log('roomMessages:', roomMessages);
        } catch (error) {
          console.error('Error loading room messages:', error);
        }
      }
    };

    onMounted(() => {
      loadMyChats();
    });

    return {
      messages,
      newMessage,
      selectedUser,
      myUser,
      myChats,
      closeChat,
      sendMessage,
      selectUser
    };
  }
};
</script>

<style scoped>
.span {
  color: white;
  word-wrap: break-word;
}

.width {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;
}

ul {
  margin-top: 10px;
  list-style: none;
  overflow-y: auto;
}

li {
  margin-top: 10px;
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
  margin-bottom: 70px;
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
  height: calc(100% - 120px);
  width: 70%;
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

.input-container::-webkit-scrollbar {
  width: 10px;
}</style>
