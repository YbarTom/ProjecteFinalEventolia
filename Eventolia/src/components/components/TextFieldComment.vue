<template>
  <input
    class="text-field"
    :placeholder="text"
    @input="updateValue"
    :value="modelValue"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  text: String
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la pantalla */
}

.text-field {
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  outline: none;
  margin-top: 18px;
}

@media (max-width: 600px) {
  .text-field {
    width: 100%;
  }
}
</style>
