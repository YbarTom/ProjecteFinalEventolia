<template>
  <div class="container">
    <div class="left-panel"></div>
    <div class="middle-panel"></div>
    <div class="right-panel"></div>
  </div>
</template>

<script setup>
  //
</script>

<style scoped>
  .container {
    display: flex;
    height: 100vh;
  }

  .left-panel, .middle-panel, .right-panel {
    flex: 1;
  }

  .left-panel {
    background-color: blue;
  }

  .middle-panel {
    background-color: green;
  }

  .right-panel {
    background-color: red;
  }
</style>
