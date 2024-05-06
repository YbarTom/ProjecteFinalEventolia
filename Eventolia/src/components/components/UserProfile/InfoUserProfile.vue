<template>
    <div class="info-user-profile">
        <div class="ususrio">
            <div class="datos-usuario"><InfoUserProfile/></div>
        </div>
    </div>
</template>

<script setup>
    import InfoUserProfile from '@/components/components/UserProfile/DatosUsuario.vue'
</script>

<style>
.ususrio {
    align-items: center; /* Alinea verticalmente los elementos al centro */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
}



/* Asegúrate de que la imagen no se deforme o se estire demasiado */
.img-usuario img {
    width: 100%; /* Hace que la imagen se expanda para llenar el contenedor */
    height: auto; /* Mantiene la relación de aspecto de la imagen */
    max-width: 150px; /* Limita el tamaño máximo de la imagen */
}


</style>
