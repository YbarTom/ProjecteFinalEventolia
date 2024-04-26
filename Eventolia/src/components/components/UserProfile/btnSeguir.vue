<template>
    <div class="bg-warning"></div>
    <button class="follow-button" @click="toggleFollow">{{ buttonText }}</button>
</template>

<script setup>
import { ref } from 'vue';

const buttonText = ref('Seguir');

const toggleFollow = () => {
    buttonText.value = buttonText.value === 'Seguir' ? 'Dejar de seguir' : 'Seguir';
};
</script>

<style scoped>
.follow-button {
    width: 600px;
}
</style>
