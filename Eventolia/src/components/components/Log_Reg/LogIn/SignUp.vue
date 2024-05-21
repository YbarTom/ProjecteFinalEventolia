<template>
    <div class="container">
        <TextField text="email" v-model="email" />
    </div>
</template>
<script setup>
import TextField from '@/components/components/Log_Reg/TextField.vue'
import { ref } from 'vue';

const email = ref("")
const userName = ref("")
const password = ref("")
const password2 = ref("")
const birthDate = ref("")
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
</style>