<template>
  <div ref="divExterior" class="div-exterior bg-principal">
    <div class="profile-div">
      <div class="perfil-img"></div>
      <p><b>tom.ybarguengoitia</b></p>
    </div>
    <div class="centerImage">
      <img ref="image" class="profile-img" src="../../assets/images/torre5.jpg" alt="Imagen de perfil"
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
      <p class="likes text-text"><b>2.190 likes</b></p>
      <p class="userComments text-text"><b>tom.ybarguengoitia </b>Good news! We are now taking pre-orders for our awesome new M1 downhill bike. There are limited numbers of frames available in this first run, so once they are gone, they are gone... for a good few months anyway.</p>
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
    const imageElement = image.value;
    const containerWidth = 450;
    const containerHeight = 600;

    // Obtener las dimensiones originales de la imagen
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;

    // Calcular la proporción de la imagen original
    const aspectRatio = originalWidth / originalHeight;

    // Determinar si la imagen es más ancha que alta
    let newWidth, newHeight;
    if (aspectRatio > 1) { // Imagen es más ancha que alta
      newWidth = containerWidth;
      newHeight = containerWidth / aspectRatio;
    } else { // Imagen es más alta que ancha o es cuadrada
      newHeight = containerHeight;
      newWidth = containerHeight * aspectRatio;
    }

    // Redimensionar la imagen manteniendo la proporción
    imageElement.style.width = `${newWidth}px`;
    imageElement.style.height = `${newHeight}px`;

    // Calcular la altura total y ajustarla
    const profileDivHeight = divExterior.value.querySelector('.profile-div').clientHeight;
    const commentsDivHeight = commentsDiv.value.clientHeight;
    const totalHeight = newHeight + profileDivHeight + commentsDivHeight;
    divExterior.value.style.height = `${totalHeight}px`;
  }
}
</script>


<style scoped>
.centerImage {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 600px;
}
.div-exterior {
  margin-top: 10px;
  border-radius: 8px;
  max-height: 850px;
  width: 450px;
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
