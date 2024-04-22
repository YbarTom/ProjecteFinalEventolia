<template>
    <div>
      <div class="user">
        <v-img :src="image" class="profile-img"></v-img>
        <v-icon class="icon primary white--text" @click="$refs.fileInput.click()">mdi-upload</v-icon>
        <input ref="fileInput" type="file" style="display: none;" @change="onFileSelect" />
      </div>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-text>
            <VueCropper
              v-show="selectedFile"
              ref="cropper"
              :src="selectedFile"
              alt="Source Image"
              :auto-crop="autoCrop"
              :aspect-ratio="1"
              :view-mode="1"
              :auto-crop-area="1"
              :guides="true"
              :minCropBoxWidth="100"
              :minCropBoxHeight="500"
              :maxCropBoxWidth="2000"
              :maxCropBoxHeight="2000"
              :cropBoxResizable="false"
              style="width: 100%; max-width: 400px; height: 400px;"
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
      }
    }
  }
  </script>
  

<style scoped>
.user {
  width: 500px;
  height: 500px;
  position: relative;
}
.profile-img {
    width: 500px;
    height: 500px;
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
</style>