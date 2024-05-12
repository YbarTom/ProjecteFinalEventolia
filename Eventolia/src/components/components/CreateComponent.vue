<template>
  <div class="container">
    <div class="post bg-principal" v-if="!imagePreview">
      <div>
        <p class="title text-text"><b>Create new Event</b></p>
        <div class="horizontal-bar-create bg-background"></div>
        <!-- Mover el bloque del botón aquí -->
      </div>
      <div class="div-button">
        <label for="image-upload" class="upload-button bg-background">Select Image From Computer</label>
        <input id="image-upload" type="file" @change="handleImageUpload" style="display: none;">
      </div>
    </div>
    <div class="post bg-principal" v-if="imagePreview" ref="post">
      <div class="grid-container">
        <div class="left-side">
          <div class="margin" style="max-height: 500px;">
            <img :src="imagePreview" ref="image" alt="Image Preview" />
          </div>
        </div>
        <div class="right-side">
          <div class="margin-25">
            <v-textarea v-model="Title" label="Title" variant="outlined" counter :rules="rules" no-resize
              rows="1"></v-textarea>
            <v-textarea v-model="Description" label="Description" variant="outlined" counter :rules="rules2" no-resize
              rows="4"></v-textarea>
            <v-number-input v-model="AssistantsMax" :reverse="false" controlVariant="default" label="Maximum Assitants"
              :hideInput="false" :inset="false" variant="outlined"></v-number-input>
            <v-textarea v-model="Address" label="Address" variant="outlined" counter no-resize rows="1"></v-textarea>
            <v-text-field v-model="startDate" label="Start Date" type="date"></v-text-field>
            <v-text-field v-model="endDate" label="End Date" type="date"></v-text-field>
            <v-btn @click="createEvent" class="bg-background text-text">Post</v-btn>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref,defineEmits, onMounted } from 'vue';
import * as funcionsCM from '../../communicationsManager.js'
import { useAppStore } from '@/stores/app.js';

const imagePreview = ref('');
const image = ref(null);
const post = ref(null);
const rules = ref([v => v.length <= 25 || 'Max 25 characters']);
const rules2 = ref([v => v.length <= 140 || 'Max 140 characters']);
const startDate = ref('');
const endDate = ref('');
const Title = ref('');
const Description = ref('');
const AssistantsMax = ref('');
const Address = ref('');
const emit = defineEmits(['close-dialog']);


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

const createEvent = async () => {
  try {
    const appStore = useAppStore()
    const user = { id: "zi0s21h26zlvm89j9d", userName: "user1", email: "user1@gmail.com", password: "password1", followers: [], followed: [], posts: [], events: [], profilePic: "", privacity: false }
    appStore.setUser()
    //const user = appStore.getUser()

    const event = {
      idUser: user.id,
      title: Title.value,
      description: Description.value,
      assistantsMax: AssistantsMax.value,
      organizer: user.userName,
      image: imagePreview.value,
      startDate: startDate.value,
      endDate: endDate.value,
      categories: [],
      location: Address.value
    }

    const coordinates = await funcionsCM.searchLocation(Address.value);
    event.latitude = coordinates.latitude;
    event.longitude = coordinates.longitude;
    funcionsCM.createEvent(event)

    emit('close-dialog')

  } catch (error) {
    console.error('Error creating event: ', error)
  }
}

</script>
<style scoped>
.input-container {
  display: flex;
  align-items: center;
}

.input-container label {
  margin-right: 10px;
}

.numberinput {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #525151;
}

.grid-container {
  display: grid;
  height: 80vh;

  grid-template-columns: 1fr 1fr;
  /* Dos columnas de igual tamaño */
}

.margin-25 {
  margin: 28px;
}

.margin {
  margin: 20px;
}

.left-side {
  height: 500px;
  width: 450px;
  justify-content: center;
  align-items: center;
  border-radius: 16px 0 0 16px;
}

.right-side {
  height: 100%;
  border-radius: 0 16px 16px 0;
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
  width: 100%;
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
  max-height: 700px;
  /* Hacer que la altura se ajuste automáticamente */
  margin-top: 10px;
}
</style>
