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

/* Consulta de medios para pantallas medianas */
@media (max-width: 1024px) {
  .Profile {
    width: 90%;
  }
}

/* Consulta de medios para pantallas pequeñas */
@media (max-width: 768px) {
  .Profile {
    width: 95%;
  }
}

/* Consulta de medios para pantallas muy pequeñas */
@media (max-width: 480px) {
  .Profile {
    width: 100%;
  }
}
</style>
