<template>
  <DesktopMessatges v-if="isDesktop" />
  <MobileMessatges v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DesktopMessatges from '@/components/ViewComponents/Desktop/DesktopMessatges.vue';
import MobileMessatges from '@/components/ViewComponents/Mobile/MobileMessatges.vue';
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
  