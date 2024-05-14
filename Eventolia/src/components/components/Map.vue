<template>
  <div>
    <div id="map"></div>
    <label for="radiusSelect">Selecciona el radio en kilómetros:</label>
    <select id="radiusSelect" v-model="selectedRadius" @change="updateCircleRadius">
      <option value="1">1 km</option>
      <option value="2">2 km</option>
      <option value="5">5 km</option>
      <option value="10">10 km</option>
      <option value="1000">1000 km</option>
      <option value="10000">10000 km</option>

      <!-- Agrega más opciones según sea necesario -->
    </select>

    <v-dialog v-model="dialogVisible" width="30%">
      <EventPublication :post="selectedEvent"/> <!-- Pasar selectedEvent en lugar de event -->
    </v-dialog>
  </div>
</template>

<script>
import L from 'leaflet';
import { useAppStore } from '@/stores/app';
import * as funcionsCM from '../../communicationsManager.js';
import EventPublication from './EventPublication.vue';

export default {
  data() {
    return {
      selectedRadius: '5',
      map: null,
      circle: null,
      latitude: 0,
      longitude: 0,
      events: [],
      filteredEvents: [],
      selectedEvent: null,
      dialogVisible: false,
    };
  },
  mounted() {
    funcionsCM.getEvents()
      .then(events => {
        this.events = events;
        this.initMap();
      })
      .catch(error => {
        console.error('Error al obtener los eventos:', error);
      });
  },
  methods: {
    initMap() {
      const appStore = useAppStore();
      this.latitude = appStore.getUserLatitude();
      this.longitude = appStore.getUserLongitude();
      this.map = L.map('map').setView([this.latitude, this.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.addCircle();

      this.updateCircleRadius();

      const bounds = L.latLngBounds([this.latitude, this.longitude], this.circle.getBounds().getNorthEast());
      this.map.fitBounds(bounds);
    },
    addCircle() {
      const radiusInKilometers = parseInt(this.selectedRadius);
      this.circle = L.circle([this.latitude, this.longitude], {
        color: '#780F80',
        fillColor: '#780F80',
        fillOpacity: 0.2,
        radius: radiusInKilometers * 1000
      }).addTo(this.map);
    },
    updateCircleRadius() {
      const radiusInKilometers = parseInt(this.selectedRadius);
      this.circle.setRadius(radiusInKilometers * 1000);

      this.filteredEvents = this.events.filter(event => {
        const distance = this.calculateDistance(this.latitude, this.longitude, event.latitude, event.longitude);
        return distance <= radiusInKilometers;
      });

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
        const marker = L.marker([event.latitude, event.longitude]).addTo(this.map);
        marker.on('click', () => {
          this.selectedEvent = event;
          this.dialogVisible = true;
        });
      });
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
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
  height: 80vh;
}
</style>
