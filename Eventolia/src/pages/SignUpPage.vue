<template>
  <SignUpPage v-if="isDesktop" />
  <MobileSignUpPage v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SignUpPage from '@/components/ViewComponents/Desktop/DesktopSignUp.vue';
import MobileSignUpPage from '@/components/ViewComponents/Mobile/MobileSignUpPage.vue';
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

