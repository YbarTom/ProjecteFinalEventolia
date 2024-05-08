<template>
  <div class="button" @click="navigateToRoute">
    <div class="svg-container">
      <v-icon :icon="icono" class="text-text" />
    </div>
    <h3 class="text-text">{{ buttonText }}</h3>
  </div>
  <v-dialog
      v-model="createEvent"
      width="79%"

    >

      <CreateComponent v-if="!mobile"/>
    </v-dialog>
</template>

<script setup>

import { ref,defineProps } from 'vue';
import { useRouter } from 'vue-router';
import CreateComponent from './CreateComponent.vue';
import MobileDatosUsuario from './UserProfile/MobileDatosUsuario.vue';
const createEvent = ref(false);

const props = defineProps({
  type: String,
  buttonText: String,
  route: String, // Nueva prop para la ruta
  mobile: Boolean
});

const router = useRouter();

const icono = (() => {
  if (props.type === 'home') return "mdi-home";
  else if (props.type === 'lupa') return "mdi-magnify";
  else if (props.type === 'add') return "mdi-plus";
  else if (props.type === 'message') return "mdi-message";
  else if (props.type === 'bell') return "mdi-bell";
  else if (props.type === 'user') return "mdi-account";
})();

// Función para navegar a la ruta proporcionada
const navigateToRoute = () => {
  if(props.type==="add"){
    createEvent.value = !createEvent.value;
  }else{
    router.push(props.route);
  }
};
</script>


<style scoped>
.button {
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
}

.svg-container {
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  /* Ajusta el espacio entre el icono y el texto */
}

h3 {
  margin: 0;
  /* Elimina el margen predeterminado del h3 */
}
</style>
