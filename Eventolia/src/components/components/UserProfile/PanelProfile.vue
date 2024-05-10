<template>
  <div class="Profile">
    <div class="perfil">
      <InfoUserProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile"/>
    </div>
    <div class="imagen">
      <grid :events="props.events" :posts="props.posts"/>
    </div>
  </div>
</template>

<script setup>
import InfoUserProfile from '@/components/components/UserProfile/InfoUserProfile.vue'
import grid from '@/components/components/UserProfile/grid.vue'
import { defineProps } from "vue";

const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean,
    posts: Array,
    events: Array
})
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
  min-height: 100vh;
  /* Altura mínima para ocupar toda la altura de la ventana */
}

.perfil{
  flex: 1;
  /* Ambos elementos ocupan la misma fracción del espacio disponible */

}
.imagen {
  margin-top: -300px;
  width:79%;
  flex: 1;
  /* Ambos elementos ocupan la misma fracción del espacio disponible */
}</style>
