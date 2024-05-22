<template>
    <DesktopUserEdit v-if="isDesktop" />
    <MobileUserEdit v-else />
  </template>
  
  <script setup>
  import { ref} from 'vue';
  import DesktopUserEdit from '@/components/ViewComponents/Desktop/DesktopUserEdit.vue';
  import MobileUserEdit from '@/components/ViewComponents/Mobile/MobileUserEdit.vue';

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
  
  