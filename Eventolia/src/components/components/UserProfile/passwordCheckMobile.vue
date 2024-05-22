<template>
    <div class="container">
        <TextField v-model="password" text="password" class="textField bg-principal" />
        <button class="check-button" @click="checkPassword">Check</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import TextField from '@/components/components/Log_Reg/TextField.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref("");

async function checkPassword() {
    const appStore = useAppStore();
    if (password.value === appStore.getPassword()) {
        router.push('/userEdit');
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.textField, button {
    margin: 10px 0;
}

.check-button {
    color: #fcecfd; /* Cambia el color del texto aquí */
}
</style>
