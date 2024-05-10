<template>
    <div class="todo">
        <ImagenUsuario />
        <div class="usuario-info">
            <h1>{{ props.userProfile.userName }}</h1>
        </div>
        <div class="numeros">
            <div>
                <button @click="mostrarPopUp(props.userProfile.followed, 1)">
                    <h4>Seguidos</h4>
                    <h3>{{ props.userProfile.followed.length }}</h3>
                </button>
            </div>
            <div>
                <button @click="mostrarPopUp(props.userProfile.followers, 2)">
                    <h4>Seguidores</h4>
                    <h3>{{ props.userProfile.followers.length }}</h3>
                </button>
            </div>
            <div>
                <h4>Publicaciones</h4>
                <h3>{{ props.userProfile.posts.length + props.userProfile.events.length }}</h3>
            </div>
        </div>
        <div class="btn-seguir">
            <BtnSeguir />
        </div>
    </div>
    <v-dialog v-model="showPopUp" width="79%">    
        <PopUpUsers :type="typePopUp" :followers="followers" :followed="followed" :ownProfile="props.ownProfile"/>
    </v-dialog>
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

const changeFollowed = async (id, check) => {
  console.log(props.userProfile.followed)
  if(check){
    props.userProfile.followed.push(id)
  }else {
    props.userProfile.followed = props.userProfile.followed.filter(item => item != id)
  }
}
const changeFollowers = async (id) => {
  props.userProfile.followers = props.userProfile.followers.filter(item => item != id)
}
</script>

<style scoped>
.todo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-left: 100px;
    margin-top: -250px;
}

.numeros {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.numeros>div {
    margin: 0 10px;
}

.numeros h3,
.numeros h4 {
    font-size: calc(1em + 1vw);
}
</style>