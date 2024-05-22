<template>
    <div class="container">
        <TextField text="email" v-model="email" />
        <TextField text="userName" v-model="userName" />
        <TextField text="password" v-model="password" />
        <TextField text="repeat password" v-model="password2" />
        <v-text-field v-model="birthDate" label="birth date" type="date"></v-text-field>
        <p v-if="showError">{{ errorMessage }}</p>
        <button @click="Register">Sign Up</button>
    </div>
</template>
<script setup>
import TextField from '@/components/components/Log_Reg/TextField.vue'
import { ref } from 'vue';
import * as funcionsCM from '@/communicationsManager.js'

const email = ref("")
const userName = ref("")
const password = ref("")
const password2 = ref("")
const birthDate = ref("")
const showError = ref(false)
const errorMessage = ref("")

async function Register() {
    if (password.value === password2.value) {
        const user = {
            email: email.value,
            userName: userName.value,
            password: password.value,
            birthDate: birthDate.value
        }
        const serverData = await funcionsCM.createUser(user)
        if (serverData !== "User created successfully") {
            errorMessage.value = serverData
            showError.value = true
        }
    } else {
        errorMessage.value = "The passwords are different"
        showError.value = true
    }

}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: aqua;
    width: 300px;
}
</style>