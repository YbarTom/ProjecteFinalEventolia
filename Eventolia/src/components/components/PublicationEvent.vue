<template>
  <div class="exterior">
    <div class="adminEvent" @click="showText = !showText">
      <div class="left">
        <div class="perfil-img"></div>
        <div>
          <p class="first-text"><b>{{ event.organizer }}</b></p>
          <p class="second-text">{{ event.title }}</p>
        </div>
      </div>
      <div class="right">
        <p><b>{{ event.assistants }}</b></p>
        <v-icon icon="mdi-account-multiple" class="text-text" />
      </div>
    </div>
    <div v-if="showText">
      <p class="definition">{{ event.description }}</p>
    </div>
    <SimplePublication :key="post.id" :post="post"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SimplePublication from './SimplePublication.vue'; // Importamos el componente SimplePublication
import * as funcionsCM from '../../../communicationsManager.js'

const showText = ref(false); // Inicializamos showText como false

const props = defineProps({
  post: Object
})

const event = ref({});

onMounted(async () => {
  try {
    const data = await funcionsCM.getEventInfo(post.idEvent)
    event.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>


<style scoped>
.definition{
  margin-left: 10px;
  margin-right: 10px;
}
.exterior {
  border-radius: 8px;
  width: 450px;
  position: relative;
  overflow: hidden;
}
.first-text {
  margin-bottom: 0;
  /* Reduce el espacio debajo del primer párrafo */
}

.second-text {
  font-size: 0.8em;
  /* Hace que el segundo texto sea más pequeño */
  margin-top: 0;
  /* Reduce el espacio encima del segundo párrafo */
}

.adminEvent {
  width: 450px;
  height: 65px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px 8px 0 0;
}

.perfil-img {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background-image: url("../../assets/images/profile2.png");
  background-size: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.left{
  display: flex;
  align-items: center;
}

.right{
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>
