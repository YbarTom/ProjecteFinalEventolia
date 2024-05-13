<template>
    <div id="map"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import { useAppStore } from '@/stores/app';
  export default {
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        // Inicializar el mapa
        const appStore = useAppStore();

        const latitude = appStore.getUserLatitude();
        const longitude = appStore.getUserLongitude();
        console.log(latitude, longitude);
        const map = L.map('map').setView([latitude, longitude], 13);
  
        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
         
        // Añadir marcador
        L.marker([latitude, longitude]).addTo(map)
          .bindPopup('Tú')
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
  