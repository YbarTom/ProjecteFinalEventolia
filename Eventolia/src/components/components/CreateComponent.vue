<template>
  <div class="container">
    <div class="post bg-principal" v-if="!imagePreview">
      <div>
        <p class="title text-text"><b>Create new post</b></p>
        <div class="horizontal-bar-create bg-background"></div>
        <!-- Mover el bloque del botón aquí -->
      </div>
      <div class="div-button">
        <label for="image-upload" class="upload-button bg-background">Select Image From Computer</label>
        <input id="image-upload" type="file" @change="handleImageUpload" style="display: none;">
      </div>
    </div>
    <div class="post bg-principal" v-if="imagePreview" ref="post">

      <div class="left-side">
        <div class="margin">
          <img :src="imagePreview" ref="image" alt="Image Preview" />
        </div>
      </div>
      <div class="right-side"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imagePreview = ref('');
const image = ref(null);
const post = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.margin {
  margin: 20px;
}
.left-side {
  height: 100%;
  width: 450px;
  background-color: red;
  border-radius: 16px 0 0 16px;
}

.div-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  /* Esto colocará el botón en la parte inferior del contenedor */
  padding: 20px 0;
  /* Añadir espacio alrededor del botón */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 79%;
}

.title {
  font-size: 18px;
  margin-top: 20px;
}

.post {
  width: 80%;
  text-align: center;
  border-radius: 16px;
  height: 80vh;
  display: flex;
  /* Añadir esto para permitir el posicionamiento flex */
  flex-direction: column;
  /* Añadir esto para que los elementos internos se apilen verticalmente */
}

.horizontal-bar-create {
  width: 100%;
  height: 1px;
  margin-top: 20px;
}

.upload-button {
  font-weight: bold;
  border-radius: 16px;
  padding: 10px 20px;
}

.post img {
  max-width: 100%;
  height: auto;
  /* Hacer que la altura se ajuste automáticamente */
  margin-top: 10px;
}</style>
