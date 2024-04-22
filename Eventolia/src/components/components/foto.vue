<template>
    <div>
      <div class="user">
        <v-img :src="image" class="profile-img"></v-img>
        <v-icon class="icon primary white--text" @click="$refs.fileInput.click()">mdi-upload</v-icon>
        <input ref="fileInput" type="file" style="display: none;" @change="onFileSelect" />
      </div>
      <v-dialog v-model="dialog" width="800">
        <v-card>
          <v-card-text>
            <VueCropper
              v-show="selectedFile"
              ref="cropper"
              :src="selectedFile"
              alt="Source Image"
              :auto-crop="autoCrop"
              :aspect-ratio="750/400"
              :view-mode="1"
              :auto-crop-area="1"
              :guides="true"
              :minCropBoxWidth="468"
              :minCropBoxHeight="350"
              :maxCropBoxWidth="468"
              :maxCropBoxHeight="605"
              :cropBoxResizable="false"
              style="width: 100%; max-width: 750px; height: 400px;"
            ></VueCropper>
          </v-card-text>
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
    // Crear un URL de objeto para la imagen
    const url = URL.createObjectURL(blob);
    
    // Crear un elemento <a> temporal para simular una descarga
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'cropped_image.png'; // Puedes elegir cualquier nombre de archivo
    a.click();
    
    // Limpieza: revocar el objeto URL y remover el enlace del DOM
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Cerrar el diálogo
    this.dialog = false;
  });
}
,
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
      }
    }
  }
  </script>
  

<style scoped>
.user {
  position: relative;
  width: 468px; /* Ajuste del contenedor para la imagen */
  height: 605px;
  margin: 20px auto; /* Centrado opcional */
}
.profile-img {
  width: 100%; /* Se ajustará automáticamente a 750px por la configuración del contenedor */
  height: 100%; /* 400px, como se espera */
}
.icon {
  position: absolute;
  top: 10px;
  right: 10px; /* Un poco de espacio al borde */
  background: #ffffff;
  border: 1px solid #0000ff; /* Bordes visibles */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0000ff;
  font-size: 24px;
  cursor: pointer;
}
</style>