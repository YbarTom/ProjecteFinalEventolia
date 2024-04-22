<template>
  <div class="svg-container">
    <v-icon :icon="icono" class="text-text" />
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  type: String,
  buttonText: String
});

const icono = ref('');

if (props.type === 'heart') {
  icono.value = "mdi-heart-outline";
}else if (props.type === 'chat') {
  icono.value = "mdi-chat-outline";
}else if (props.type === 'send') {
  icono.value = "mdi-send";
}else if (props.type === 'save') {
  icono.value = "mdi-bookmark-outline";
}
</script>

<style scoped>
.svg-container {
  display: flex;
  align-items: center;
  margin-right: 10px; /* Ajusta el espacio entre el icono y el texto */
}
</style>
