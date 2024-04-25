<template>
  <div class="width" v-if="props.type === 'simplePublication'">
    <SimplePublication />
    
  </div>
  <div class="width" v-if="props.type === 'publicationEvent'">
    <PublicationEvent />

  </div>
  <div class="width" v-else-if="props.type === 'eventPublication'">
    <EventPublication />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import SimplePublication from './SimplePublication.vue';
import EventPublication from './EventPublication.vue';
import PublicationEvent from './PublicationEvent.vue';

const props = defineProps({
  type: String
});
</script>

<style scoped>
.horizontal-bar {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 1px;
}
.width {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
