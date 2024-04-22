<template>
  <div class="width">
  <div ref="divExterior" class="div-exterior bg-principal">
    <div class="profile-div">
      <div class="perfil-img"></div>
      <p><b>{{ post.userName }}</b></p>
    </div>
    <div>
      <img ref="image" class="profile-img" :src=post.image alt="Imagen de perfil"
        @load="adjustHeight" />
    </div>
    <div ref="commentsDiv" class="comments-div bg-principal">
      <div class="commentsButtons">
        <div class="left">
          <buttonPublication type="heart" />
          <buttonPublication type="chat" />
          <buttonPublication type="send" />
        </div>
        <div class="right">
          <buttonPublication type="save" />
        </div>
      </div>
      <p class="likes text-text"><b>{{ post.likes.length }} likes</b></p>
      <p class="userComments text-text"><b>{{ post.userName }}</b> {{ post.caption }}</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import buttonPublication from './buttonPublication.vue';
const divExterior = ref(null);
const image = ref(null);
const commentsDiv = ref(null);

const adjustHeight = () => {
  if (divExterior.value && image.value && commentsDiv.value) {
    const imageHeight = image.value.clientHeight;
    const profileDivHeight = divExterior.value.querySelector('.profile-div').clientHeight;
    const commentsDivHeight = commentsDiv.value.clientHeight;
    const totalHeight = imageHeight + profileDivHeight + commentsDivHeight;
    divExterior.value.style.height = `${totalHeight}px`;
  }
}

const props = defineProps({
  post: Object
});
</script>

<style scoped>
.width {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.div-exterior {
  margin-top: 10px;
  border-radius: 8px;
  max-height: 850px;
  width: 468px;
  position: relative;
  overflow: hidden;
}

.likes{
  margin-left: 10px;
}

.userComments{
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
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
  border-radius: 0 0 8px 8px;
}

.commentsButtons {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Centrado verticalmente */
}

.left,
.right {
  display: flex;
  align-items: center; /* Centrado verticalmente */
  padding: 10px;
}


</style>
