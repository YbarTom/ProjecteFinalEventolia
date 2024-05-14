<template>
  <div class="width">
    <div ref="divExterior" class="div-exterior bg-principal">
      <div class="profile-div" @click="router.push('/userprofile/' + post.userName)">
        <div class="perfil-img"></div>
        <p><b>{{ post.userName }}</b></p>
      </div>
      <div>
        <img ref="image" class="profile-img" :src=post.image alt="Imagen de perfil" @load="adjustHeight" />
      </div>
      <div ref="commentsDiv" class="comments-div bg-principal">
        <div class="commentsButtons">
          <div class="left">
            <buttonPublication type="heart" @click="like" />
            <buttonPublication type="chat" />
            <buttonPublication type="send" @click="sendPost=true"/>
          </div>
          <div class="right">
            <buttonPublication type="save" />
          </div>
        </div>
        <p class="likes text-text"><b>{{ post.likes.length }} likes</b></p>
        <p class="userComments text-text"><b>{{ post.userName }}</b> {{ post.caption }}</p>
        <div class="commentField">
          <TextFieldComment text="comment" v-model="comment" />
          <buttonPublication class="send" type="send" @click="createComment" />
        </div>
        <div>
          <p style="margin-left: 10px;" @click="seeComments=true">See all comments</p>
        </div>
        <v-dialog v-model="seeComments" width="79%">
          <commentList :post="props.post" />
        </v-dialog>
        <v-dialog v-model="sendPost" >
          <SendList />
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import SendList from "./SendList.vue"
import Foto from "@/components/components/foto.vue";
import * as funcionsCM from '../../communicationsManager.js'
import { useAppStore } from "@/stores/app";
import { ref, onMounted } from 'vue';
import buttonPublication from './buttonPublication.vue';
import TextField from "./TextFieldComment.vue";
import commentList from "@/components/components/commentList.vue"
import { useRouter } from 'vue-router';

const router = useRouter();
const divExterior = ref(null);
const image = ref(null);
const commentsDiv = ref(null);
const likeCheck = ref(false)
const comment = ref("")
const seeComments = ref(false)
const sendPost = ref(false)

onMounted(async () => {
  try {
    const appStore = useAppStore()
    const user = appStore.getUser()
    for (let i = 0; i < props.post.likes.length; i++) {
      if (props.post.likes[i] == user.id) {
        likeCheck.value = true
      }
    }
  } catch (error) {
    console.error(error)
  }
})

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

const props = defineProps({
  post: Object
});

async function like() {
  const appStore = useAppStore()
  const user = appStore.getUser()

  if (likeCheck.value) {
    await funcionsCM.dislikePost({ idUser: user.id, idPost: props.post.id })
    props.post.likes = props.post.likes.filter(item => item !== user.id);
    likeCheck.value = false
  } else {
    await funcionsCM.likePost({ idUser: user.id, idPost: props.post.id })
    props.post.likes.push(user.id)
    likeCheck.value = true
  }
}


async function createComment() {
  const appStore = useAppStore()
  const user = appStore.getUser()

  if (comment.value != "") {
    await funcionsCM.createComment({ idUser: user.id, idPost: props.post.id, text: comment.value, userName: user.userName })
    comment.value = ""
  }
}
</script>


<style scoped>
.send {
  margin-right: 30px;
}
.centerImage {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.width {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  text-align: left;
}

.commentField {
  width: 100%;
  margin-left: 10px;
  display: flex;
  margin-top: -5%;
}

.userComments {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: left;
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
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
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
