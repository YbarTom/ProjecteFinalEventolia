<template>
    <div class="form-container">
      <TextField v-model="password" text="New Password" class="input-field" />
      <TextField v-model="password2" text="Repeat Password" class="input-field" />
      <TextField v-model="userName" text="New UserName" class="input-field" />
  
      <button @click="editUser" class="edit-button bg-principal">Edit</button>
  
      <p v-if="checkError" class="error-message">{{ errorMessage }}</p>
    </div>

    <div class="bottom-bar bg-background">
        <btnBotonBar />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import TextField from '@/components/components/Log_Reg/TextField.vue'

import btnBotonBar from '@/components/components/buttonBotomBar.vue';


  import { useAppStore } from '@/stores/app';
  import * as funcionsCM from '@/communicationsManager.js'
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const appStore = useAppStore()
  const password = ref("")
  const password2 = ref("")
  const userName = ref("")
  const errorMessage = ref("")
  const checkError = ref(false)
  
  async function editUser() {
      var response = appStore.getUser()
  
      if (password.value === "" && userName.value !== "") {
          response = await funcionsCM.editUserName({idUser: appStore.getUserId(), userName: userName.value})
      }
      else if (password.value !== "" && userName.value !== "") {
          if (password.value !== password2.value) {
              errorMessage.value = "The passwords are not the same"
              checkError.value = true
          }
          else {
              funcionsCM.editPassword({idUser: appStore.getUserId(), password: password.value})
              response = await funcionsCM.editUserName({idUser: appStore.getUserId(), userName: userName.value})
          }
      }
      else if (password.value !== "" && userName.value === "") {
          if (password.value !== password2.value) {
              errorMessage.value = "The passwords are not the same"
              checkError.value = true
          }
          else {
              response = await funcionsCM.editPassword({idUser: appStore.getUserId(), password: password.value})
          }
      }
  
      appStore.setUser(response)
      router.push('/MainPage')
  }
  </script>
  
  <style scoped>
  .bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
}

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 10px; 
    max-width: 400px; 
    margin: auto;
  }
  
  .input-field {
    width: 100%; 
    padding: 10px; 
    font-size: 16px; 
  }
  
  .edit-button {
    align-self: flex-start;
    padding: 10px 20px;
    font-size: 16px; 
    cursor: pointer;
    color: white; 
    border: none; 
    border-radius: 4px; 
    margin-left: 40%;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
  }
  </style>
  