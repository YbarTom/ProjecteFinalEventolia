<template>
    <div>
        <h1>tom.ybarguengoitia</h1>
    </div>
    <div class="numeros-usu">
        <div>
            <h2>Segidos</h2>
            <h3>1475</h3>
        </div>
        <div>
            <h2>Seguidores</h2>
            <h3>8579</h3>
        </div>
        <div>
            <h2>Publicaciones</h2>
            <h3>439</h3>
        </div>
    </div>
    <div class="btn-seguir"><BtnSeguir/></div>
</template>

<script setup>
 import BtnSeguir from '@/components/components/UserProfile/btnSeguir.vue'
</script>

<style scoped>
    .numeros-usu {
        display: flex;        /* Activa flexbox */
        justify-content: space-between; /* Distribuye el espacio de manera que los elementos estén separados uniformemente */
    }
    .numeros-usu > div {
        margin:  10px;      /* Añade un margen horizontal de 10px a cada div */
    }
</style>

