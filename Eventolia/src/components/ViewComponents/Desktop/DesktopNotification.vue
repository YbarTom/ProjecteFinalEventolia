<template>
    <div>
        <p v-for="notification in props.notifications">{{ notification.notificator }}</p>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    notifications: Array
})

console.log(props.notifications[0])
</script>

<style scoped></style>