<template>
    <div class="form-container">
      <TextField v-model="password" text="New Password" />
      <TextField v-model="password2" text="Repeat Password" />
      <TextField v-model="userName" text="New UserName" />
  
      <button class="btn-editar bg-principal" @click="editUser">Edit</button>
  
      <p v-if="checkError" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import TextField from '@/components/components/Log_Reg/TextField.vue'
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
.form-container {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
}

.btn-editar {
  display: block;
  width: 100%;
  padding: 10px 0;
  margin-top: 20px;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.TextField {
  width: 100%;
  margin-bottom: 10px;
}
</style>