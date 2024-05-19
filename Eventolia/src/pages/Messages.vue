<template>
  <DesktopMessage v-if="isDesktop" />
  <Messages v-else />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import DesktopMessage from '@/components/ViewComponents/Desktop/DesktopMessage.vue';
import Messages from '@/components/ViewComponents/Mobile/MobileMessage.vue';

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
//
</script>