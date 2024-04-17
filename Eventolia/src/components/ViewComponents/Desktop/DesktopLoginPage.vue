<template>
  <div class="container" :class="{ 'dark-theme': currentTheme === 'dark' }" :style="{ backgroundColor: currentBackgroundColor, color: currentTextColor }">
    <div class="left-panel"><h1>{{ greeting }}</h1></div>
    <theme-toggler :toggleTheme="toggleTheme" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { myCustomLightTheme, myCustomDarkTheme } from '@/plugins/vuetify'
  import ThemeToggler from '@/components/components/ThemeToggler.vue'

  const greeting = ref('hola')
</script>

<script>
  export default {
    components: {
      ThemeToggler,
    },
  }
</script>

<style scoped>
  .container {
    display: flex;
    height: 100vh;
    transition: background-color 0.5s ease;
  }
</style>
