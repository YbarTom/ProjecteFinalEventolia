<template>
    <div>
      <div id="map"></div>
      <label for="radiusSelect">Selecciona el radio en kilómetros:</label>
      <select id="radiusSelect" v-model="selectedRadius" @change="updateCircleRadius">
        <option value="1">1 km</option>
        <option value="2">2 km</option>
        <option value="5">5 km</option>
        <option value="10">10 km</option>
        <!-- Agrega más opciones según sea necesario -->
      </select>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import { useAppStore } from '@/stores/app';
  import * as funcionsCM from '../../communicationsManager.js';
  
  export default {
    data() {
      return {
        selectedRadius: '5', // Valor predeterminado del selector
        map: null,
        circle: null,
        latitude: 0, // Variables para almacenar las coordenadas del usuario
        longitude: 0,
      };
    },
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
        this.latitude = appStore.getUserLatitude(); // Asignar las coordenadas del usuario a las variables de datos
        this.longitude = appStore.getUserLongitude();
        this.map = L.map('map').setView([this.latitude, this.longitude], 13);
  
        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
  
        // Añadir marcador del usuario
        const redIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        L.marker([this.latitude, this.longitude], { icon: redIcon }).addTo(this.map);
  
        // Añadir círculo alrededor del usuario para representar el área
        this.addCircle();
  
        // Añadir marcadores de eventos
        events.forEach(event => {
          L.marker([event.latitude, event.longitude]).addTo(this.map)
            .bindPopup(event.title);
        });
  
        // Ajustar vista del mapa para incluir todos los elementos
        const bounds = L.latLngBounds([this.latitude, this.longitude], this.circle.getBounds().getNorthEast());
        this.map.fitBounds(bounds);
      },
      addCircle() {
        const radiusInKilometers = parseInt(this.selectedRadius);
        this.circle = L.circle([this.latitude, this.longitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: radiusInKilometers * 1000 // Convertir kilómetros a metros
        }).addTo(this.map);
      },
      updateCircleRadius() {
        const radiusInKilometers = parseInt(this.selectedRadius);
        this.circle.setRadius(radiusInKilometers * 1000); // Convertir kilómetros a metros
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    height: 400px;
  }
  </style>
  