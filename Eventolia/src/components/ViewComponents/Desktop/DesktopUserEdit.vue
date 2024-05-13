<template>

    <TextField v-model="password" text="New Password"/>
    <TextField v-model="password2" text="Repeat Password"/>

    <TextField v-model="userName" text="New UserName"/>

    <button @click="editUser" >Edit</button>

    <p v-if="checkError">{{ errorMessage }}</p>
</template>
<script setup>
import TextField from '@/components/components/Log_Reg/TextField.vue'
import { useAppStore } from '@/stores/app';

const appStore = useAppStore()
const password = ref("")
const password2 = ref("")
const userName = ref("")
const errorMessage = ref("")
const checkError = ref(false)

async function editUser(){
    if(password === "" && userName !== ""){
        funcionsCM.editUserName(userName)
    }
    else if(password !== "" && userName !== ""){
        if(password !== password2){
            errorMessage.value = "The passwords are not the same"
            checkError.value = true
        }
        else {
            funcionsCM.editPassword(password)
            funcionsCM.editUserName(userName)
        }
    }
    else if(password !== "" && userName === ""){
        if(password !== password2){
            errorMessage.value = "The passwords are not the same"
            checkError.value = true
        }
        else {
            funcionsCM.editPassword(password)
        }
    }
}
</script>
<style scoped></style>