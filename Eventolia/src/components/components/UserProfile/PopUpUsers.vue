<template>
    <div v-if="users !== null" class="container">
        <div v-for="(user, index) in users" :key="index">
            <div v-if="props.type == 1">
                <div>{{ user.userName }}</div>
            </div>
            <div v-if="props.type == 2">
                <div>{{ user.userName }}</div>
            </div>

        </div>
    </div>
</template>
<script setup>

import { defineProps, onMounted } from 'vue';

const props = defineProps({
    type: Number,
    followers: Array,
    followed: Array
})

const users = ref(null)

onMounted(() => {
    console.log(props)
    if (props.type === 1) {
        users.value = props.followed
    }
    else if (props.type === 2) {
        users.value = props.followers
    }
});
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
}
</style>