<template>
    <div class="container">
      <div class="middle-panel "><SearchComponent/></div>
    </div>
    <div class="bottom-bar bg-background" v-if="isMobile">
        <btnBotonBar />
    </div>
  </template>
  
  <script setup>
  import SearchComponent from "@/components/components/SearchComponent.vue";
  import btnBotonBar from '@/components/components/buttonBotomBar.vue';

  const isMobile = ref(window.innerWidth < 800);
const updateWidth = () => {
    isMobile.value = window.innerWidth < 800;
};

onMounted(() => {
    window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
  </script>
  
  <style scoped>
  .container {
  width: 100%;
  height: 100vh; /* vh es una unidad de medida relativa al viewport. 1vh es igual al 1% de la altura del viewport. */
}
  

  .middle-panel {
    flex: auto;
  }

  .bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
  </style>
  