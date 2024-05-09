<template>
    <p>{{ text }}</p>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String
});
</script>
<style scoped></style>