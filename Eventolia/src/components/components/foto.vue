<template>
  <div>
    <div class="user">
      <v-img :src="image" class="profile-img"></v-img>
      <v-icon class="icon primary white--text" @click="$refs.fileInput.click()">mdi-upload</v-icon>
      <input ref="fileInput" type="file" style="display: none;" @change="onFileSelect" />
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <VueCropper
          v-show="selectedFile"
          ref="cropper"
          :src="selectedFile"
          alt="Source Image"
          :aspect-ratio="1"
          :view-mode="1"
          :auto-crop-area="0.8" 
          :guides="false"
          :drag-mode="'none'"
          :cropBoxResizable="false"
          :zoomable="true"
          :wheelZoomRatio="0.1"
          style="width: 100%; max-width: 400px; height: 400px;"
        ></VueCropper>
        <v-card-actions>
          <v-btn class="primary" @click="cropAndShow()">Crop & Show</v-btn>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: { VueCropper },
  data() {
    return {
      selectedFile: null,
      image: '',
      dialog: false,
      autoCrop: true
    };
  },
  methods: {
    cropAndShow() {
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        this.image = URL.createObjectURL(blob);
        this.dialog = false;
      });
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      if (file && file.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedFile = event.target.result;
          this.dialog = true;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file.');
      }
    },
    handleZoom(event) {
      // Aquí puedes agregar lógica adicional si necesitas manejar el zoom de forma específica
      console.log('Zoom event:', event.detail.ratio);
    }
  }
}
</script>



<style scoped>
.user {
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden; /* Asegura que todo lo que sobresalga del contenedor sea ocultado */
  border-radius: 50%; /* Hace que el contenedor sea circular */
}

.profile-img {
  width: 100%; /* Ocupa toda la anchura del contenedor */
  height: 100%; /* Ocupa toda la altura del contenedor */
  object-fit: cover; /* Asegura que la imagen cubra el espacio sin distorsionarse */
  border-radius: 50%; /* Asegura que la imagen también sea circular */
}

.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 14px;
  cursor: pointer;
}

.cropper-container {
  position: relative;
}

.cropper-container::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.75);
}
</style>
