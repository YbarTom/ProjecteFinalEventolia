<template>
  <DesktopHelloWorld v-if="isDesktop" />
  <MobileHelloWorld v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DesktopHelloWorld from '@/components/ViewComponents/Desktop/DesktopHelloWorld.vue';
import MobileHelloWorld from '@/components/ViewComponents/Mobile/MobileHelloWorld.vue';

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
