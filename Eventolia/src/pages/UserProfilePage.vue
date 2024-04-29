<template>
    <DesktopUserProfilePage v-if="isDesktop" />
    <MobileMainPage v-else />
  </template>
  
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import DesktopUserProfilePage from '@/components/ViewComponents/Desktop/DesktopUserProfilePage.vue'
  import MobileUserProfilePage from '@/components/ViewComponents/Mobile/MobileUserProfile.vue'
  const isDesktop = ref(window.innerWidth > 800); // Cambia este valor según tus necesidades

  const updateWidth = () => {
    isDesktop.value = window.innerWidth > 800; // Cambia este valor según tus necesidades
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });
</script>