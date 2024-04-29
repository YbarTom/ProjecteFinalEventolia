<template>
    <div class="imagenes">
        <div class="estrucImg">
            <div class="foto">
                <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
            </div>
            <div class="foto">
                <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
            </div>
            <div class="foto">
                <img data-v-1ed81890="" class="profile-img" src="/src/assets/images/rascacielos.jpeg" alt="Imagen de perfil">
            </div>
        </div>
    </div>
</template>

<style scoped>
.imagenes {
    padding: 20px;
}

.estrucImg {
    display: flex; /* Activando flexbox para el contenedor */
    justify-content: space-around; /* Distribución con espacio alrededor */
}

.foto {
    flex: 1; /* Cada elemento hijo de 'estrucImg' toma el mismo espacio */
    padding: 10px; /* Espacio dentro de cada contenedor de imagen */
    display: flex; /* Flexbox para centrar la imagen */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
}

.profile-img {
    max-width: 100%; /* La imagen ocupa como máximo el 100% de su contenedor */
    height: auto; /* Altura automática para mantener la proporción de la imagen */
}
</style>
