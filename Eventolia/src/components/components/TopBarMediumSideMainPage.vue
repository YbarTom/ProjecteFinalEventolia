<template>
  <div class="topBar">
    <div class="text-container">
      <h3 @click="emitForYouClicked">For You</h3>
      <h3 @click="emitFollowingClicked">Following</h3>
    </div>
    <div class="horizontal-bar bg-text"></div>
  </div>
</template>

<script setup>
import {  defineEmits } from 'vue';


const emits = defineEmits(['forYouClicked', 'followingClicked']);

function emitForYouClicked() {
  emits('forYouClicked');
}

function emitFollowingClicked() {
  emits('followingClicked');
}
</script>

<style scoped>
.topBar {
  height: 78px;
  width: 100%;
  position: relative;
}

.text-container {
  position: absolute;
  margin-bottom: 2px;
  bottom: 0;
  left: 0;
  display: flex;
}

.text-container h3 {
  margin: 0;
  margin-right: 20px; /* Espacio entre los textos */
  cursor: pointer; /* Cambiamos el cursor para indicar que es interactivo */
}

.horizontal-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 1px;
}
</style>
