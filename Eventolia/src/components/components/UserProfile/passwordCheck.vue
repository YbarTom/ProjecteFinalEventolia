<template>

    <div class="bg-principal centered-content">
        <TextField v-model="password" text="password" class="password-field" />
        <div class="button-container">
            <button @click="checkPassword">Check</button>
        </div>
    </div>

</template>
<script setup>
import { useAppStore } from '@/stores/app';
import TextField from '@/components/components/Log_Reg/TextField.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref("")

async function checkPassword() {
    const appStore = useAppStore()
    if (password.value === appStore.getPassword()) {
        router.push('/userEdit')
    }
}
</script>
<style scoped>
.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Esto asegura que el contenedor ocupe toda la altura de la pantalla */
}

.password-field {
    width: 200px;
}

.button-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>