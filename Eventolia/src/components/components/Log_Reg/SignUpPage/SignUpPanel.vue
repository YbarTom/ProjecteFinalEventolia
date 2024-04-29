<template>
  <div class="panel">
      <div class="bg">
          <h1>Eventolia</h1>
          <div><TextField v-model="name" text="Nom y Cognom"/></div>
          <div><TextField v-model="email" text="email"/></div>
          <div><TextField v-model="nick" text="nick"/></div>
          <div><TextField v-model="password1" text="password"/></div>
          <div><TextField v-model="password2" text="password"/></div>
          <div><Button @click="showValues"/></div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TextField from '../TextField.vue';
import Button from '../Button.vue';

const name = ref('');
const email = ref('');
const nick = ref('');
const password1 = ref('');
const password2 = ref('');

const showValues = () => {
  console.log(`Name:${name.value}, email:${email.value},Nick: ${nick.value}, Password1: ${password1.value}, Password2: ${password2.value}`);
};
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}

.bg{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
}

.bg input[type="text"] {
  margin-bottom: 10px; /* Ajusta este valor según tus necesidades */
}

</style>
