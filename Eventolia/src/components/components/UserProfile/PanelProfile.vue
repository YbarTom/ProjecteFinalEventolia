<template>
    <div class="bg-warning">
        <h1>Panel Profile</h1>
        <div class="perfil"><InfoUserProfile/></div>
        <div class="imagen"><EstructFoto/></div>
    </div>
</template>

<script setup>
import InfoUserProfile from '@/components/components/UserProfile/InfoUserProfile.vue'
import EstructFoto from '@/components/components/UserProfile/EstructuraFotosUserProfile.vue'
</script>

<style scoped>
.bg-warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #ffc107; /* Color de fondo amarillo de Bootstrap para advertencia */
    padding: 20px;
    width: 82%;
    min-height: 100vh; /* Altura mínima para ocupar toda la altura de la ventana */
}
</style>
