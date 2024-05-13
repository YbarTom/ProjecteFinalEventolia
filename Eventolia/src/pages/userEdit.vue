<template>
    <DesktopUserEdit v-if="isDesktop" />
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import DesktopUserEdit from '@/components/ViewComponents/Desktop/DesktopUserEdit.vue';
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
  
  