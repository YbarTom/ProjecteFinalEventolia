<template>
  <div class="Profile">
    <div class="perfil">
      <InfoUserProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile" />
    </div>
    <v-radio-group v-model="selectedOption" inline>
      <v-radio label="Posts" :value="true"></v-radio>
      <v-radio label="Events" :value="false"></v-radio>
    </v-radio-group>
    <div class="imagen">
      <grid :events="props.events" :posts="props.posts" :selectedOption="selectedOption" :key="selectedOption"/>
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
  width: 79%;
  min-height: 100vh;
  /* Altura mínima para ocupar toda la altura de la ventana */
}


.imagen {
  width: 79%;
  flex: 1;
  margin-top: -200px;
}
</style>
