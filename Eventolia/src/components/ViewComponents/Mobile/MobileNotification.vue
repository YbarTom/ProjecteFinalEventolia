<template>
    <div class="notification-container bg-background">
        <div v-for="(notification, index) in notificationsMessage" :key="index"
            :class="['notification', notification.type]">
            <div class="content">
                <div class="message">{{ notification.message }}</div>
            </div>

        </div>
    </div>
    <div class="bottom-bar bg-background">
        <btnBotonBar />
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

import btnBotonBar from '@/components/components/buttonBotomBar.vue';

const props = defineProps({
    notifications: {
        type: Array,
        required: true
    }
})

const notificationsMessage = computed(() => {
    return props.notifications.map(notification => {
        let message = "";
        let time = new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        return {
            type: notification.type,
            message: message,
            time: time
        };
    });
});
</script>

<style scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
}
.notification {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    padding: 20px;
    margin: 0 25px;
    margin-top:25px;
    background-color: #f0f2f5;
}

.notification:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
}

.notification.follow {
    background-color: #e1f7e1;
    border-left: 4px solid #4caf50;
}

.notification.follow:before {
    border-width: 0 10px 10px 0;
    border-color: transparent #e1f7e1 transparent transparent;
    top: 0;
    left: -10px;
}

.notification.likePost {
    background-color: #ffe1b2;
    border-left: 4px solid #ff9800;
}

.notification.likePost:before {
    border-width: 0 10px 10px 0;
    border-color: transparent #ffe1b2 transparent transparent;
    top: 0;
    left: -10px;
}

.notification.newComment {
    background-color: #e1e9ff;
    border-left: 4px solid #2196f3;
}

.notification.newComment:before {
    border-width: 0 10px 10px 0;
    border-color: transparent #e1e9ff transparent transparent;
    top: 0;
    left: -10px;
}

.notification.newAssist {
    background-color: #f3e1ff;
    border-left: 4px solid #9c27b0;
}

.notification.newAssist:before {
    border-width: 0 10px 10px 0;
    border-color: transparent #f3e1ff transparent transparent;
    top: 0;
    left: -10px;
}

.notification .content {
    display: flex;
    flex-direction: column;
}

.notification .message {
    font-size: 16px;
    color: #333;
}

.notification .time {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
    align-self: flex-end;
}
</style>
