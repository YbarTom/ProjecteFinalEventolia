<template>
  <div class="container">
    <TopBarMediumSideMainPage @forYouClicked="handleForYouClicked" @followingClicked="handleFollowingClicked" />
    <ForYouPage v-if="showRed" />
    <FollowingPage v-if="showBlue" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TopBarMediumSideMainPage from './TopBarMediumSideMainPage.vue';
import ForYouPage from './ForYouPage.vue';
import FollowingPage from './FollowingPage.vue';
import { useAppStore } from '@/stores/app.js';


const showRed = ref(true);
const showBlue = ref(false);

function handleForYouClicked() {
  showRed.value = true;
  showBlue.value = false;
}

function handleFollowingClicked() {
  showRed.value = false;
  showBlue.value = true;
}

function muestraPosicion(position) {
  console.log('Latitude:', position.coords.latitude);
  console.log('Longitude:', position.coords.longitude);

  const appStore = useAppStore()
  
  appStore.setUserLatitude(position.coords.latitude)
  appStore.setUserLongitude(position.coords.longitude)

}

function errorPosicion(error) {
  console.error('Geolocation error:', error);
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(muestraPosicion, errorPosicion);



  }
});
</script>

<style scoped>
.container {
  height: 100vh;
  position: relative;
}
</style>
