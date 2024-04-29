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
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  width: 150%;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  outline: none;
  margin-top: 18px;
}

.text-field:focus {
  border-color: #0056b3;
  box-shadow: 0 0 8px rgba(0,86,179,0.25);
}

@media (max-width: 600px) {
  .text-field {
    width: 100%;
  }
}
</style>