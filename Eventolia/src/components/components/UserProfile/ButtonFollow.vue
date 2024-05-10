<template>
    <div class="button">
        <p>{{ text }}</p>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String
});
</script>
<style scoped>
.button {
    background-color: green;
}
</style>