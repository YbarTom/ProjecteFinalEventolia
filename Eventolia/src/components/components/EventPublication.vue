<template>
  <div ref="divExterior" class="div-exterior bg-principal">
    <div class="profile-div">
      <div class="perfil-img"></div>
      <p><b>{{ props.post.organizer }}</b></p>
      <div class="right">
        <p><b>{{ props.post.assistants.length }}</b></p>
        <v-icon icon="mdi-account-multiple" class="text-text" />
      </div>
    </div>

    <div ref="commentsDiv" class="comments-div bg-principal">

      <p class="likes text-text"><b>{{ props.post.likes.lenght }}</b></p>
      <p class="userComments text-text"><b>{{ props.post.description }}</b></p>
      <div class="commentsButtons">
        <div class="left">
          <buttonPublication type="heart" />
          <buttonPublication type="chat" />
          <buttonPublication type="send" />
          <buttonPublication type="add" :onClick="createPost" />
          <buttonPublication type="assistantPlus" :onClick="addAssistant" />
        </div>
        <div class="right">
          <buttonPublication type="save" />
        </div>
      </div>
    </div>
    <div class="centerImage">
      <img ref="image" :src=props.post.image alt="Imagen de perfil" @load="adjustHeight" />
    </div>

    <div>
      <v-dialog v-model="boolean" width="79%" class="desktop" v-if="isDesktop">
        <addPost :idEvent="props.post.id" />
      </v-dialog>
      <v-dialog v-model="boolean" width="79%" class="mobil" v-else>
        <addPostMobile :idEvent="props.post.id" @close-dialog="boolean = false" />
      </v-dialog>
    </div>

  </div>

</template>

<script setup>
import { ref, defineProps } from 'vue';
import buttonPublication from './buttonPublication.vue';
import addPost from './addPost.vue';
import addPostMobile from '@/components/components/addPostMobile.vue';
import * as funcionsCM from '../../communicationsManager.js'
import { useAppStore } from "@/stores/app";

const divExterior = ref(null);
const image = ref(null);
const commentsDiv = ref(null);
const boolean = ref(false);
const assistCheck = ref(false)

const props = defineProps({
  post: Object
})

console.log(props.post)

const isDesktop = ref(window.innerWidth > 800);

const updateWidth = () => {
  isDesktop.value = window.innerWidth > 800;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);

  try {
    console.log(props.post)
    const appStore = useAppStore()
    const user = appStore.getUser()
    for (let i = 0; i < props.post.assistants.length; i++) {
      if (props.post.assistants[i] == user.id) {
        assistCheck.value = true
      }
    }
  } catch (error) {
    console.error(error)
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const createPost = () => {
  boolean.value = !boolean.value;
}
const adjustHeight = () => {
  if (divExterior.value && image.value && commentsDiv.value) {
    const imageElement = image.value;
    const containerWidth = divExterior.value.clientWidth;

    // Obtener las dimensiones originales de la imagen
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;

    // Calcular la proporción de la imagen original
    const aspectRatio = originalWidth / originalHeight;

    // Calcular la nueva altura basada en el ancho del contenedor y la proporción de la imagen
    const newHeight = containerWidth / aspectRatio;

    // Redimensionar la imagen manteniendo la proporción
    imageElement.style.width = `${containerWidth}px`;
    imageElement.style.height = `${newHeight}px`;

    // Calcular la altura total y ajustarla
    const profileDivHeight = divExterior.value.querySelector('.profile-div').clientHeight;
    const commentsDivHeight = commentsDiv.value.clientHeight;
    const totalHeight = newHeight + profileDivHeight + commentsDivHeight;
    divExterior.value.style.height = `${totalHeight}px`;
  }
}

async function addAssistant() {
  const appStore = useAppStore()
  const user = appStore.getUser()

  if (assistCheck.value) {
    await funcionsCM.removeAssist({ idUser: user.id, idEvent: props.post.id })    
    props.post.assistants = props.post.assistants.filter(item => item !== user.id);
    assistCheck.value = false
  } else if(!assistCheck.value && props.post.assistantsMax !== props.post.assistants.length){
    await funcionsCM.addAssist({ idUser: user.id, idEvent: props.post.id })
    props.post.assistants.push(user.id)
    assistCheck.value = true
  }
}

</script>


<style scoped>
.centerImage {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.div-exterior {
  margin-bottom: 10px;
  border-radius: 8px;
  max-height: 850px;
  width: 450px;
  position: relative;
  overflow: hidden;
}

.likes {
  margin-left: 10px;
}

.userComments {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.profile-div {
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  border-radius: 8px 8px 0 0;
}

.perfil-img {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background-image: url("../../assets/images/profile.png");
  background-size: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.comments-div {
  position: relative;
  width: 100%;
  max-height: 180px;
  border-radius: 0 0 8px 8px;
}

.commentsButtons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Centrado verticalmente */
}

.left,
.right {
  display: flex;
  align-items: center;
  /* Centrado verticalmente */
  padding: 10px;
}
</style>
