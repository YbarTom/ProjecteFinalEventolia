<template>
    <TextField v-model="password" text="password" />
    <button @click="checkPassword">Check</button>
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
<style scoped></style>