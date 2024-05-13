<template>
    <div id="map"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        // Inicializar el mapa
        const map = L.map('map').setView([51.505, -0.09], 13);
  
        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
  
        // Añadir marcador
        L.marker([51.5, -0.09]).addTo(map)
          .bindPopup('¡Hola! Este es un marcador de ejemplo.')
          .openPopup();
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    height: 400px;
  }
  </style>
  