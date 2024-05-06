<template>
    <div class="Profile">
        <div class="perfil"><InfoUserProfile/></div>
        <div class="imagen"><EstructFoto/></div>
    </div>
</template>

<script setup>
import InfoUserProfile from '@/components/components/UserProfile/InfoUserProfile.vue'
import EstructFoto from '@/components/components/UserProfile/EstructuraFotosUserProfile.vue'
</script>

<style scoped>
.Profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    width: 79%;
    min-height: 100vh; /* Altura mínima para ocupar toda la altura de la ventana */
}

</style>
