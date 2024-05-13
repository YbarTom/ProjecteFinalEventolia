<template>
    <div class="button">
        <p :class="{ 'text-green': text === 'follow', 'text-red': text === 'unfollow' }">{{ text }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: String
});
</script>

<style scoped>
.text-green {
    color: green;
}

.text-red {
    color: red;
}
</style>