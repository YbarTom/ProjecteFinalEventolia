<template>
    <div class="bg-success">
        <h1>Estructura Fotos</h1>
        <div class="estrucImg">
            <div class="bg-info">
                <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
            </div>
            <div class="bg-info">
                <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
            </div>
            <div class="bg-info">
                <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-success {
    padding: 20px;
    background-color: #28a745; /* Color de fondo verde de Bootstrap */
}

.estrucImg {
    display: flex; /* Activando flexbox para el contenedor */
    justify-content: space-around; /* Distribución con espacio alrededor */
}

.bg-info {
    flex: 1; /* Cada elemento hijo de 'estrucImg' toma el mismo espacio */
    padding: 10px; /* Espacio dentro de cada contenedor de imagen */
    background-color: #17a2b8; /* Color de fondo azul claro de Bootstrap */
    display: flex; /* Flexbox para centrar la imagen */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
}

.profile-img {
    max-width: 100%; /* La imagen ocupa como máximo el 100% de su contenedor */
    height: auto; /* Altura automática para mantener la proporción de la imagen */
}
</style>
