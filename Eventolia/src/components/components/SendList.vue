<template>
  <div class="background bg-background">
    <div class="chat-container">
      <UserChat
        v-for="(chat, index) in myChats"
        :key="index"
        :buttonText="chat.users[0]"
        :isSelected="selectedUser === chat"
        @selectUser="selectUser(chat)"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import UserChat from './UserChat.vue';
import { useAppStore } from '@/stores/app.js';
import * as funcionsCM from '../../communicationsManager.js';

export default {
  components: {
    UserChat,
  },
  props: {
    post: Object,
  },
  setup(props) {
    const socket = io('http://localhost:3001');
    const messages = ref([]);
    const newMessage = ref('');
    const selectedUser = ref(null);
    const myUser = ref(useAppStore().getUser().email);
    const myChats = ref([]);

    const loadMyChats = async () => {
      try {
        const data = await funcionsCM.getChats();
        myChats.value = await Promise.all(data.map(async (chat) => {
          const users = chat.users.filter(user => user !== myUser.value);
          const userNamePromises = users.map(user => funcionsCM.getUserByEmailName(user));
          const userNames = await Promise.all(userNamePromises);
          return {
            ...chat,
            users: userNames,
          };
        }));
      } catch (error) {
        console.error('Error loading chats:', error);
      }
    };

    const selectUser = (chat) => {
      if (selectedUser.value === chat) {
        selectedUser.value = null;
      } else {
        selectedUser.value = chat;
        // Envía solicitud al servidor para unirse a la sala
        socket.emit('joinRoom', chat.room); // Envía el nombre de la sala al servidor
        const message = {
          user: myUser.value,
          type: "post",
          publication: props.post,
          room: chat.room // Agrega el nombre de la sala al mensaje
        };
        socket.emit('chat message', message);
        funcionsCM.postPostChat(chat.room, message.publication, message.type,message.user);
        console.log("holaaa");
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
      selectUser,
    };
  }
};
</script>

<style scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
