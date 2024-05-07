<template>
    
  </template>
  
  <script setup>
  import ImagenUsuario from '@/components/components/foto.vue'
  import BtnSeguir from '@/components/components/UserProfile/btnSeguir.vue'
  import PopUpUsers from './PopUpUsers.vue';
  import { defineProps } from "vue";
  import * as funcionsCM from '@/communicationsManager.js'
  
  const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean
  })
  
  const showPopUp = ref(false);
  const typePopUp = ref(0)
  const followers = ref([]);
  const followed = ref([])
  
  const mostrarPopUp = async (users, type) => {
  
    if (type === 1) {
      followed.value = await funcionsCM.getFollowed(users)
      typePopUp.value = 1
    }
    else if (type === 2) {
      followers.value = await funcionsCM.getFollowers(users)
      typePopUp.value = 2
    }
    showPopUp.value = true;
  }
  </script>
  
  
  <style scoped>
  .usuario-info {
    display: flex;
    align-items: center;
  }
  
  .usuario-info h1 {
    margin-left: 20px;
    text-align: center;
    flex-grow: 1;
    /* Permite que el título ocupe todo el espacio restante */
  }
  
  .numeros-usu {
    display: flex;
    justify-content: space-around;
    /* Distribuye los elementos con espacio equitativo */
  }
  
  .numeros-usu>div {
    margin: 10px;
  }
  </style>
  