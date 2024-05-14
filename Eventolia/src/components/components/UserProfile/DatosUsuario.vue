<template>
  <div class="usuario-info">
    <ImagenUsuario />
    <h1>{{ props.userProfile.userName }}</h1>
  </div>
  <div class="numeros-usu">
    <div>
      <button @click="mostrarPopUp(props.userProfile.followed, 1)">
        <h2>Seguidos</h2>
        <h3>{{ props.userProfile.followed.length }}</h3>
      </button>
    </div>
    <div>
      <button @click="mostrarPopUp(props.userProfile.followers, 2)">
        <h2>Seguidores</h2>
        <h3>{{ props.userProfile.followers.length }}</h3>
      </button>
    </div>
    <div>
      <h2>Publicaciones</h2>
      <h3>{{ props.userProfile.posts.length + props.userProfile.events.length }}</h3>
    </div>
  </div>
  <div class="btn-seguir">
    <ButtonFollow :text="buttonText" @click="followState" />
  </div>

  <v-dialog v-model="showPopUp" width="79%">
    <PopUpUsers :type="typePopUp" :followers="followers" :followed="followed" :ownProfile="props.ownProfile"
      :changeFollowed="changeFollowed" :changeFollowers="changeFollowers" />
  </v-dialog>
  <v-dialog v-model="showPasswordCheck" width="79%">
    <passwordCheck/>
  </v-dialog>
</template>

<script setup>
import ImagenUsuario from '@/components/components/foto.vue'
import BtnSeguir from '@/components/components/UserProfile/btnSeguir.vue'
import PopUpUsers from './PopUpUsers.vue';
import { defineProps, onMounted } from "vue";
import * as funcionsCM from '@/communicationsManager.js'
import ButtonFollow from './ButtonFollow.vue';
import { useAppStore } from '@/stores/app';
import passwordCheck from '@/components/components/UserProfile/passwordCheck.vue'


const props = defineProps({
  userProfile: Object,
  ownProfile: Boolean
})

const showPopUp = ref(false);
const typePopUp = ref(0)
const followers = ref([]);
const followed = ref([])
const buttonText = ref("")
const showPasswordCheck = ref(false)

onMounted(() => {
  changeButtonText()
});

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
  if (check) {
    props.userProfile.followed.push(id)
  } else {
    props.userProfile.followed = props.userProfile.followed.filter(item => item != id)
  }
}

const changeFollowers = async (id) => {
  props.userProfile.followers = props.userProfile.followers.filter(item => item != id)
}

const changeButtonText = async () => {
  if (props.ownProfile) {
    buttonText.value = "Edit"
  } else {
    const appStore = useAppStore()
    console.log(appStore)
    const user = appStore.getUser()
    for (let i = 0; i < props.userProfile.followers.length; i++) {
      if (user.id == props.userProfile.followers[i]) {
        buttonText.value = "unfollow"
      }
    }
  }
  if (buttonText.value == "") {
    buttonText.value = "follow"
  }
}

async function followState() {
  var check
  const appStore = useAppStore()
  const user = appStore.getUser()
  console.log(user)
  console.log(props.userProfile)
  if (props.ownProfile) {
    showPasswordCheck.value = true
  }
  else {
    if (buttonText.value === "follow") {
      funcionsCM.followUser({ idFollower: user.id, idFollowed: props.userProfile.id })
      buttonText.value = "unfollow"
      check = true
    }
    else {
      funcionsCM.unfollowUser({ idFollower: user.id, idFollowed: props.userProfile.id })
      buttonText.value = "follow"
      check = false
    }
    var userAux = props.userProfile.followers
    if(check){
      userAux.push(user.id)
    }else {
      props.userProfile.followers = props.userProfile.followers.filter(item => item != user.id)
    }
  }
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
