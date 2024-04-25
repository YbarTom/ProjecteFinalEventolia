<template>
  <div class="width">
    <PublicationEvent />
    
  </div>
</template>

<script setup>
import PublicationEvent from './PublicationEvent.vue';
import SimplePublication from './SimplePublication.vue'; // Importamos el componente SimplePublication
</script>


<style scoped>
.width {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
