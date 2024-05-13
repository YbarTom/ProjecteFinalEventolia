<template>
  <v-app>
    <v-main class="no-scroll">
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script setup>
  // No necesitas JavaScript para esto
</script>

<style scoped>
.no-scroll {
  overflow: hidden;
}
</style>
