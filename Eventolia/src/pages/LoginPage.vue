<template>
    <DesktopLoginPage v-if="isDesktop"/>
    <MobileLoginPage v-else/>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import DesktopLoginPage from '@/components/ViewComponents/Desktop/DesktopLoginPage.vue';
  import MobileLoginPage from '@/components/ViewComponents/Mobile/MobileLoginPage.vue';
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
    //
  </script>
  