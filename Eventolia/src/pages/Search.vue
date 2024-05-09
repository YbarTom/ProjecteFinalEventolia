<template>
    <DesktopSearch v-if="isDesktop" />
    <MobileSearch v-else/>
</template>
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const isDesktop = ref(window.innerWidth > 800);

const updateWidth = () => {
  isDesktop.value = window.innerWidth > 800; 
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

import DesktopSearch from '../components/ViewComponents/Desktop/DesktopSearch.vue';
import MobileSearch from '../components/ViewComponents/Mobile/MobileSearch.vue';

//
</script>