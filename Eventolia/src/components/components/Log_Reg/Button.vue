<template>
  <div>
    <button @click="handleClick" class="bg-principal2">{{text}}</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: String
})
</script>


<style scoped>
button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 18px 2px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>