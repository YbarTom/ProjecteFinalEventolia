<template>
  <div class="width" v-if="props.post.type === 'simplePublication'">
    <SimplePublication :key="post.id" :post="post" />

  </div>
  <div class="width" v-if="props.post.type === 'publicationEvent'">
    <PublicationEvent :key="post.id" :post="post" />

  </div>
  <div class="width" v-else-if="props.post.type === 'eventPublication'">
    <EventPublication :key="post.id" :post="post" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import SimplePublication from './SimplePublication.vue';
import EventPublication from './EventPublication.vue';
import PublicationEvent from './PublicationEvent.vue';

const props = defineProps({
  post: Object
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
