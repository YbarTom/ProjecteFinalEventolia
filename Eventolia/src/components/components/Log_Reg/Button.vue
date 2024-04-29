<template>
    <div>
      <button @click="handleClick" class="bg-loginButton">Haz clic aquí</button>
    </div>
  </template>
  
  <script setup>
    import { defineProps, defineEmits } from 'vue';

    defineProps([]);
    const emit = defineEmits(['click']);

    function handleClick() {
        emit('click');
        console.log('El botón fue clickeado!');

    }
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
    margin: 4px 2px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  
  