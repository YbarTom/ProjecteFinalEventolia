<template>
    <div class="notification-container">
        <div v-for="(notification, index) in notificationsMessage" :key="index" class="notification">
            {{ notification }}
        </div>
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

<style scoped>
.notification-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: auto;
    padding: 1rem;
}

.notification {
    padding: 1rem;
    background-color: #F0A1F7 ;
    border: 1px solid #780F80;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.notification:hover {
    background-color: #f0f0f0;
}

.notification:nth-child(even) {
    background-color: #c55bda;
}
</style>