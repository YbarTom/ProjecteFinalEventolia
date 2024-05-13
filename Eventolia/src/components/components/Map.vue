<template>
    <div id="map"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import { useAppStore } from '@/stores/app';
  import * as funcionsCM from '../../communicationsManager.js';
  
  export default {
    mounted() {
      // Obtener los eventos antes de inicializar el mapa
      funcionsCM.getEvents()
        .then(events => {
          this.initMap(events);
        })
        .catch(error => {
          console.error('Error al obtener los eventos:', error);
        });
    },
    methods: {
      initMap(events) {
        // Inicializar el mapa
        const appStore = useAppStore();
        const latitude = appStore.getUserLatitude();
        const longitude = appStore.getUserLongitude();
        const map = L.map('map').setView([latitude, longitude], 13);
  
        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
  
        const redIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            });

            // Añadir marcador del usuario con el icono rojo
            L.marker([latitude, longitude], { icon: redIcon }).addTo(map)
                
  
        // Añadir círculo alrededor del usuario para representar el área
        const radiusInKilometers = 5; // Cambia este valor según tus necesidades
        const circle = L.circle([latitude, longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: radiusInKilometers * 1000 // Convertir kilómetros a metros
        }).addTo(map);
  
        // Añadir marcadores de eventos
        events.forEach(event => {
          L.marker([event.latitude, event.longitude]).addTo(map)
            .bindPopup(event.title);
        });
  
        // Ajustar vista del mapa para incluir todos los elementos
        const bounds = L.latLngBounds([latitude, longitude], circle.getBounds().getNorthEast());
        map.fitBounds(bounds);
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    height: 400px;
  }
  </style>
  