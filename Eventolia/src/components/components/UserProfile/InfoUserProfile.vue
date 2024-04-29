<template>
    <div class="info-user-profile">

        <div class="ususrio">
            <div class="img-usuario"><ImagenUsuario/></div>
            <div class="datos-usuario"><InfoUserProfile/></div>
        </div>
    </div>
</template>

<script setup>
    import ImagenUsuario from '@/components/components/foto.vue'
    import InfoUserProfile from '@/components/components/UserProfile/DatosUsuario.vue'
</script>

<style>
.ususrio {
    display: flex; /* Activa Flexbox */
    align-items: center; /* Alinea verticalmente los elementos al centro */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
}

.img-usuario,
.datos-usuario {
    flex: 1; /* Permite que cada elemento ocupe un espacio equitativo */
    padding: 10px; /* Añade un poco de espacio alrededor de los elementos para evitar que se toquen */
}

/* Asegúrate de que la imagen no se deforme o se estire demasiado */
.img-usuario img {
    width: 100%; /* Hace que la imagen se expanda para llenar el contenedor */
    height: auto; /* Mantiene la relación de aspecto de la imagen */
    max-width: 150px; /* Limita el tamaño máximo de la imagen */
}

.info-user-profile {
    padding: 20px; /* Añade algo de padding alrededor del contenido para mejor visualización */
}
</style>
