<template>
    <div>
        <p v-for="notification in notificationsMessage">{{ notification }}</p>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    notifications: Array
})

const notificationsMessage = ref([])

console.log(props.notifications)

onMounted(async () => {
    var message
    try {
        for (let i = 0; i < props.notifications.length; i++) {
            switch (props.notifications[i].type) {
                case "follow":
                    message = props.notifications[i].notificator + " has followed you"
                    break;
                case "likePost":
                    message = props.notifications[i].notificator + " has liked your post"
                    break;
                case "newComment":
                    message = props.notifications[i].notificator + " has commented on your post: " + props.notifications[i].text
                    break;
                case "newAssist":
                    message = props.notifications[i].notificator + " has confirmed assistance to your event"
                    break;
            }
            notificationsMessage.value.push(message)
        }

    } catch (error) {
        console.error(error)
    }
})
</script>

<style scoped></style>