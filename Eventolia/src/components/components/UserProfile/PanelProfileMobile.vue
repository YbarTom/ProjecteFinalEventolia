<template>
  <div class="Profile">
    <div class="perfil">
      <InfoUserProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile" />
    </div>
    <v-radio-group v-model="selectedOption" inline class="radioButton">
      <v-radio label="Posts" :value="true"></v-radio>
      <v-radio label="Events" :value="false"></v-radio>
    </v-radio-group>
    <div class="imagen">
      <grid :events="props.events" :posts="props.posts" :selectedOption="selectedOption" :key="selectedOption" />
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

const selectedOption = ref(true)
</script>

<style scoped>
.Profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  margin-top: -10%;
  /* Altura mínima para ocupar toda la altura de la ventana */
}


.imagen {
  margin-top: -20%;
  width: 100%;
  flex: 1;
  /* Ambos elementos ocupan la misma fracción del espacio disponible */
}

.radioButton {
  margin-top: 5%
}
</style>