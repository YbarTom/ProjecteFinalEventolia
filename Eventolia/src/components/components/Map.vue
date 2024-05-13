<template>
    <div id="map"></div>
</template>

<script>
import L from 'leaflet';
import { useAppStore } from '@/stores/app';
import * as funcionsCM from '../../communicationsManager.js'

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

            // Añadir marcador del usuario
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('Tú')
                .openPopup();

            // Añadir marcadores de eventos
            events.forEach(event => {
                L.marker([event.latitude, event.longitude]).addTo(map)
                    .bindPopup(event.title);
            });
        },
    },
};
</script>

<style scoped>
#map {
    height: 400px;
}
</style>
