<template>
  <div>
    <button @click="toggleTheme">
      {{ selectedTheme === 'customlight' ? 'Switch to Custom Dark' : 'Switch to Custom Light' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const selectedTheme = ref("customlight");

const toggleTheme = () => {
  if (selectedTheme.value === 'customlight') {
    selectedTheme.value = 'customdark';
    theme.global.name.value = 'myCustomDarkTheme';
  } else {
    selectedTheme.value = 'customlight';
    theme.global.name.value = 'myCustomLightTheme';
  }
};
</script>
