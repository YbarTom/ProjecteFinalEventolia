<template>
    <div class="container">
      <div class="left-panel"></div>
      <div class="right-panel">
        <div class="blue-rectangle"></div>
      </div>
    </div>
  </template>
  
  <script setup>
    //
  </script>
  
  <style scoped>
    .container {
      display: flex;
      height: 100vh;
      overflow-y: hidden; /* Elimina la barra de desplazamiento vertical */
    }
  
    .left-panel, .right-panel {
      flex: 1;
    }
  
    .left-panel {
      background-color: orange;
    }
  
    .right-panel {
      background-color: green;
      position: relative;
    }
  
    .blue-rectangle {
      width: 100px;
      height: 50px;
      background-color: blue;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
  