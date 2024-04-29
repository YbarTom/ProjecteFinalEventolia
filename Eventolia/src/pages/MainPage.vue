<template>
  <DesktopMainPage v-if="isDesktop" />
  <MobileMainPage v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DesktopMainPage from '@/components/ViewComponents/Desktop/DesktopMainPage.vue';
import MobileMainPage from '@/components/ViewComponents/Mobile/MobileMainPage.vue';
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
</script>
