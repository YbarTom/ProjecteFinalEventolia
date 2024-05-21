<template>
    <div>
        <p v-for="(notification, index) in notificationsMessage" :key="index">{{ notification }}</p>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    notifications: {
        type: Array,
        required: true
    }
})

const notificationsMessage = computed(() => {
    return props.notifications.map(notification => {
        let message = "";
        switch (notification.type) {
            case "follow":
                message = `${notification.notificator} has followed you`;
                break;
            case "likePost":
                message = `${notification.notificator} has liked your post`;
                break;
            case "newComment":
                message = `${notification.notificator} has commented on your post: ${notification.text}`;
                break;
            case "newAssist":
                message = `${notification.notificator} has confirmed assistance to your event`;
                break;
            default:
                message = `Unknown notification type`;
        }
        return message;
    });
});
</script>

<style scoped></style>
