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
            <div class="grid-container">
                <div class="top-left">
                    <span class="mdi mdi-24px mdi-close" @click="$emit('close-dialog')"></span>
                </div>
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
                <div class="right-side">
                    <div class="margin-25">
                        <v-textarea v-model="Title" label="Title" variant="outlined" counter :rules="rules" no-resize
                            rows="1"></v-textarea>
                        <v-textarea v-model="Description" label="Description" variant="outlined" counter :rules="rules2"
                            no-resize rows="4"></v-textarea>
                        <v-number-input v-model="AssistantsMax" :reverse="false" controlVariant="default"
                            label="Maximum Assitants" :hideInput="false" :inset="false"
                            variant="outlined"></v-number-input>
                        <v-textarea v-model="Address" label="Address" variant="outlined" counter no-resize
                            rows="1"></v-textarea>
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
import { ref, defineEmits, onMounted } from 'vue';
import * as funcionsCM from '../../communicationsManager.js'
import { useAppStore } from '@/stores/app.js';
import ButtonSideBar from './buttonSideBar.vue';

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
const showForm = ref(false); // Nueva variable reactiva
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

const isFullscreen = ref(false);



const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
};

</script>

<!-- Estilos omitidos para brevedad -->

<style scoped>
.top-left {
    margin-right: 90%;
}

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

.button-Siguiente {
    margin-top: 25px;
}

.margin-25 {
    margin: 0 28px;
}

.margin {
    margin: 0 28px;
}

.left-side {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px 16px 0 0;
    padding: 10px;
    box-sizing: border-box;
}

.right-side {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 0 0 16px 16px;
}

.div-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    margin-top: 45px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 20px;
}

.title {
    font-size: 18px;
    margin-top: 20px;
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
    margin-top: 20px;
}

.post {
    width: 100%;
    max-width: 900px;
    text-align: center;
    border-radius: 16px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
}

.post img {
    width: 100%;
    height: auto;
    max-height: 450px;
}

.post img.fullscreen {
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 100vw;
    max-height: 100vh;
    transform: translate(-50%, -50%);
    object-fit: contain;
    z-index: 1000;
}

.bg-background {
    margin-top: -25px;
}

@media (max-width: 768px) {

    .left-side,
    .right-side {
        flex-direction: column;
        border-radius: 16px;
    }

    .post {
        flex-direction: column;
    }

    .margin-25,
    .margin {
        margin: 10px;
    }
}
</style>
