<template>
    <div class="middle-panel">
      <button class="theme-toggler" @click="toggleTheme">
        Toggle Theme
      </button>
    </div>
  </template>
  
  <script setup>
    import { defineProps } from 'vue'
  
    const { toggleTheme } = defineProps(['toggleTheme'])
    
  </script>
  
  <style scoped>  
    .theme-toggler {
      border: 2px solid #007bff; /* Cambia el color del borde */
      background-color: #007bff; /* Cambia el color de fondo */
      color: white; /* Cambia el color del texto */
      padding: 10px 20px; /* Ajusta el espacio dentro del botón */
      border-radius: 5px; /* Ajusta el radio de borde */
      font-size: 16px; /* Ajusta el tamaño del texto */
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3s, color 0.3s; /* Agrega transiciones suaves */
    }
  
    .theme-toggler:hover {
      background-color: #0056b3; /* Cambia el color de fondo al pasar el cursor sobre el botón */
      border-color: #0056b3; /* Cambia el color del borde al pasar el cursor sobre el botón */
    }
  </style>

  