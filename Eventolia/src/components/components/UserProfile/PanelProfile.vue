<template>
    <div class="bg-warning">
        <h1>Panle Profile</h1>
        <div class="perfil"><InfoUserProfile/></div>
        <div class="imagen"><EstructFoto/></div>
    </div>
</template>

<script setup>
    import InfoUserProfile from '@/components/components/UserProfile/InfoUserProfile.vue'
    import EstructFoto from '@/components/components/UserProfile/EstructuraFotosUserProfile.vue'
</script>