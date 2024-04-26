<template>
    <div class="bg-warning"></div>
    <button :class="buttonClass" @click="toggleFollow">{{ buttonText }}</button>
</template>

<script setup>
import { ref } from 'vue';

const buttonText = ref('Seguir');
const buttonClass = ref('follow-button');

const toggleFollow = () => {
    buttonText.value = buttonText.value === 'Seguir' ? 'Dejar de seguir' : 'Seguir';
    buttonClass.value = buttonClass.value === 'follow-button' ? 'follow-button-clicked' : 'follow-button';
};
</script>

<style scoped>
.follow-button {
    width: 600px;
    background-color: rgb(0, 0, 0);
}

.follow-button-clicked {
    width: 600px;
    background-color: blue;
}
</style>
