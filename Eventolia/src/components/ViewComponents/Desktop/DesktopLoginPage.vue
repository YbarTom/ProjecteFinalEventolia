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

  const currentTheme = ref('dark')
  const currentBackgroundColor = ref(myCustomDarkTheme.colors.background)
  const currentTextColor = ref(myCustomDarkTheme.colors.text)
  const greeting = ref('hola')

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    if (currentTheme.value === 'dark') {
      currentBackgroundColor.value = myCustomDarkTheme.colors.background
      currentTextColor.value = myCustomDarkTheme.colors.text
    } else {
      currentBackgroundColor.value = myCustomLightTheme.colors.background
      currentTextColor.value = myCustomLightTheme.colors.text
    }
  }
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
