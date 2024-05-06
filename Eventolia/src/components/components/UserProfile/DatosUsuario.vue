<template>
  <div class="usuario-info">
    <ImagenUsuario />
    <h1>{{ props.userProfile.userName }}</h1>
  </div>
  <div class="numeros-usu">
    <div>
      <h2>Segidos</h2>
      <h3>{{props.userProfile.followed.length}}</h3>
    </div>
    <div>
      <h2>Seguidores</h2>
      <h3>{{props.userProfile.followers.length}}</h3>
    </div>
    <div>
      <h2>Publicaciones</h2>
      <h3>{{props.userProfile.posts.length + props.userProfile.events.length}}</h3>
    </div>
  </div>
  <div class="btn-seguir">
    <BtnSeguir />
  </div>
</template>

<style scoped>
.usuario-info {
  display: flex;
  align-items: center;
}

.usuario-info h1 {
  margin-left: 20px;
  text-align: center;
  flex-grow: 1; /* Permite que el título ocupe todo el espacio restante */
}

.numeros-usu {
  display: flex;
  justify-content: space-around; /* Distribuye los elementos con espacio equitativo */
}

.numeros-usu > div {
  margin: 10px;
}
</style>


<script setup>
import ImagenUsuario from '@/components/components/foto.vue'
import BtnSeguir from '@/components/components/UserProfile/btnSeguir.vue'
import { defineProps } from "vue";

const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean
})

//console.log(userProfile)
</script>

