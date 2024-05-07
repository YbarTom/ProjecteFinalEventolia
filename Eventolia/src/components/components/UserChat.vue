<template>
  <div :class="{ button: true }" @click="selectUser">
    <div class="svg-container">
      <img class="round-image" src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Descripción de la imagen">

    </div>
    <h3 class="text-text">{{ buttonText }}</h3>
  </div>
</template>

<script>
import { ref, defineEmits } from 'vue';

export default {
  props: {
    buttonText: String,
    isSelected: Boolean // Añade la propiedad isSelected como prop
  },
  setup(props, { emit }) {
    const selectUser = () => {
      // Si el usuario actualmente seleccionado es el mismo que el usuario pulsado, emitir un evento para deseleccionar
      if (props.isSelected) {
        emit('selectUser', null); // Emitir null para deseleccionar al usuario
      } else {
        emit('selectUser', props.buttonText); // Emitir el nombre del usuario para seleccionarlo
      }
    };

    return {
      selectUser
    };
  }
};
</script>







<style scoped>

.round-image {
    border-radius: 50%;
    width: 55px;
    height: 55px;
}
.button {
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.svg-container {

  display: flex;
  align-items: center;
  margin-right: 10px;
}

h3 {
  margin: 0;
}
</style>
