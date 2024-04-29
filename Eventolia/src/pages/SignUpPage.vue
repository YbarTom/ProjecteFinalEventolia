<template>
  <DesktopSignUpPage v-if="isDesktop" />
  <MobileSignUpPage v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DesktopSignUpPage from '@/components/ViewComponents/Desktop/DesktopSignUp.vue';
import MobileSignUpPage from '@/components/ViewComponents/Mobile/MobileSignUp.vue';
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

