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
        events: [], // Almacenar todos los eventos
        filteredEvents: [], // Almacenar eventos filtrados por radio seleccionado
      };
    },
    mounted() {
      // Obtener los eventos antes de inicializar el mapa
      funcionsCM.getEvents()
        .then(events => {
          this.events = events; // Almacenar todos los eventos
          this.initMap();
        })
        .catch(error => {
          console.error('Error al obtener los eventos:', error);
        });
    },
    methods: {
      initMap() {
        // Inicializar el mapa
        const appStore = useAppStore();
        this.latitude = appStore.getUserLatitude(); // Asignar las coordenadas del usuario a las variables de datos
        this.longitude = appStore.getUserLongitude();
        this.map = L.map('map').setView([this.latitude, this.longitude], 13);
  
        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
  
        
        // Añadir círculo alrededor del usuario para representar el área
        this.addCircle();
  
        // Filtrar y añadir marcadores de eventos dentro del radio seleccionado
        this.updateCircleRadius();
  
        // Ajustar vista del mapa para incluir todos los elementos
        const bounds = L.latLngBounds([this.latitude, this.longitude], this.circle.getBounds().getNorthEast());
        this.map.fitBounds(bounds);
      },
      addCircle() {
        const radiusInKilometers = parseInt(this.selectedRadius);
        this.circle = L.circle([this.latitude, this.longitude], {
          color: '#780F80',
          fillColor: '#780F80',
          fillOpacity: 0.2,
          radius: radiusInKilometers * 1000 // Convertir kilómetros a metros
        }).addTo(this.map);
      },
      updateCircleRadius() {
        const radiusInKilometers = parseInt(this.selectedRadius);
        this.circle.setRadius(radiusInKilometers * 1000); // Convertir kilómetros a metros
  
        // Filtrar eventos dentro del nuevo radio seleccionado
        this.filteredEvents = this.events.filter(event => {
          const distance = this.calculateDistance(this.latitude, this.longitude, event.latitude, event.longitude);
          return distance <= radiusInKilometers;
        });
  
        // Limpiar marcadores antiguos y añadir nuevos marcadores filtrados
        this.map.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
          }
        });

        const redIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        L.marker([this.latitude, this.longitude], { icon: redIcon }).addTo(this.map);
  
        
        this.filteredEvents.forEach(event => {
          L.marker([event.latitude, event.longitude]).addTo(this.map)
            .bindPopup(event.title);
        });
      },
      calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en kilómetros
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distancia en kilómetros
        return d;
      },
      deg2rad(deg) {
        return deg * (Math.PI / 180);
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    height: 400px;
  }
  </style>
  