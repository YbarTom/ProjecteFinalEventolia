<template>
  <div class="container">
      <div class="post bg-principal" v-if="!imagePreview">
          <div>
              <div class="top-left">
                  <span class="mdi mdi-24px mdi-close" @click="$emit('close-dialog')"></span>
              </div>
              <div>
                  <p class="title text-text"><b>Create new Event</b></p>
                  <div class="horizontal-bar-create bg-background"></div>
              </div>
          </div>
          <div class="div-button">
              <label for="image-upload" class="upload-button bg-background">Select Image</label>
              <input id="image-upload" type="file" @change="handleImageUpload" style="display: none;">
          </div>
      </div>
      <div class="post bg-principal" v-if="imagePreview && !showForm" ref="post">
        <div class="top-left">
                  <span class="mdi mdi-24px mdi-close" @click="$emit('close-dialog')"></span>
              </div>  
        <div class="grid-container">
              <div class="left-side">
                  <div class="margin" style="max-height: 800px;">
                      <img :src="imagePreview" ref="image" alt="Image Preview" :class="{ 'fullscreen': isFullscreen }"
                          @click="toggleFullscreen" />
                  </div>
                  <div class="button-Siguiente">
                      <v-btn @click="showForm = true" class="bg-background">Siguiente</v-btn>
                  </div>
              </div>
          </div>
      </div>
      <div class="post bg-principal" v-if="showForm" ref="post">
          <div class="top-left">
              <span class="mdi mdi-24px mdi-close" @click="$emit('close-dialog')"></span>
          </div>
          <div class="grid-container">
            <div class="margin-25">
            <v-textarea v-model="Caption" label="Caption" variant="outlined" counter :rules="rules2" no-resize
              rows="4"></v-textarea>
            <v-btn @click="createPost" class="bg-background text-text">Post</v-btn>
          </div>
          </div>
      </div>
  </div>
</template>

  <script setup>

  import { ref, onMounted, defineProps } from 'vue';
  import * as funcionsCM from '@/communicationsManager.js'
  import { useAppStore } from '@/stores/app.js';
  
  const imagePreview = ref('');
  const image = ref(null);
  const post = ref(null);
  const rules2 = ref([v => v.length <= 140 || 'Max 140 characters']);
  const Caption = ref('');
  const showForm = ref(false);
  const emit = defineEmits(['close-dialog']);

  const props = defineProps({
    idEvent: String
  })
  
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
  
  const createPost = async () => {
    try {
      const appStore = useAppStore()
      const user = appStore.getUser()
  
      const post = {
        idUser: "zi0s21h26zlvm89j9d",
        idEvent: props.idEvent,
        caption: Caption.value,
        userName: "user1",
        image: imagePreview.value,
        type: "publicationEvent"
      }
  
      funcionsCM.createPost(post)
  
      emit('close-dialog')
    } catch (error) {
      console.error('Error creating post: ', error)
    }
  }
  
  </script>

  <style scoped>
  .input-container {
    display: flex;
    align-items: center;
  }
  
  .top-left {
    margin-right: 80%;
}
  
  .numberinput {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #525151;
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
    padding: 20px 0;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    flex-direction: column;
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
  
  .button-Siguiente {
    margin-top: 25px;
    margin-right: 45%;
}

  .post img {
    max-width: 50%;
    max-height: 50%;
    object-fit: contain;
    margin-right: 50%;
}
  </style>