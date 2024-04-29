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
.text-field {
  padding: 10px 20px;
  border-radius: 8px; /* Más redondeado */
  font-size: 16px;
  width: 350px; /* ajustable según tus necesidades */
  border: 2px solid #ccc; /* Borde más definido */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Sombra sutil */
  transition: all 0.3s ease; /* Transición suave para interacción */
  outline: none; /* Quita el borde de enfoque predeterminado */
  margin: 18px ; /* Ajusta el margen según tus necesidades */
}

.text-field:focus {
  border-color: #0056b3; /* Cambia el color del borde al enfocar */
  box-shadow: 0 0 8px rgba(0,86,179,0.25); /* Sombra más destacada al enfocar */
}
</style>

