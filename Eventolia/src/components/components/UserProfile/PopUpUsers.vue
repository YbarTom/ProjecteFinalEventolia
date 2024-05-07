<template>
    <div v-if="users !== null && ownProfile" class="container">
        <div v-for="(user, index) in users" :key="index">
            <div v-if="type === 1" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <button class="rectangular-button">unfollow</button>
                </div>
            </div>
            <div v-if="props.type === 2" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <button class="rectangular-button">ha de fer check</button>
                </div>
            </div>

        </div>
    </div>
    <div v-if="users !== null && !ownProfile" class="container">
        <div v-for="(user, index) in users" :key="index">
            <div v-if="type === 1" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <button class="rectangular-button">uwu</button>
                </div>
            </div>
            <div v-if="props.type === 2" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <button class="rectangular-button">unfollow</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useAppStore } from '@/stores/app.js'

const props = defineProps({
    type: Number,
    followers: Array,
    followed: Array,
    ownProfile: Boolean
})

const users = ref(null)
const user = ref({})

onMounted(() => {
    const appStore = useAppStore()
    user = appStore.getUser()
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

.user-container {
    display: flex;
    align-items: center;
    background-color: blue
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    display: flex;
    flex-direction: column;
}
</style>