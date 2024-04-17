<template>
  <div class="container">
    <buttonSideBar/>
  </div>
</template>

<script setup>
  // Aquí puedes añadir tu lógica JavaScript si es necesario
  import buttonSideBar from './buttonSideBar.vue';
</script>

<style scoped>
.container{
  height:100vh;
  margin-left: 20px;
  width:calc(100% - 20px);
}
</style>
