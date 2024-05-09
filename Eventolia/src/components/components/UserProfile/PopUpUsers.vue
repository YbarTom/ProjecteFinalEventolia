<template>
    <div v-if="ownProfile && checkRender" class="container">
        <div v-if="type === 1">
            <div v-for="(user, index) in users" :key="index" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow text="unfollow" @click="changeFollow(index)"></ButtonFollow>
                </div>
            </div>
        </div>
        <div v-if="type === 2">
            <div v-for="(user, index) in users" :key="index" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow text="check" @click="changeFollow(index)"></ButtonFollow>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!ownProfile && checkRender" class="container">
        <div v-if="type === 1">
            <div v-for="(user, index) in users" :key="index" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow :text="checkedButtonsFollowed[index]" @click="changeFollow(index)"></ButtonFollow>
                </div>
            </div>
        </div>
        <div v-if="type === 2">
            <div v-for="(user, index) in users" :key="index" class="user-container">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow :text="checkedButtonsFollowed[index]" @click="changeFollow(index)"></ButtonFollow>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useAppStore } from '@/stores/app.js'
import ButtonFollow from './ButtonFollow.vue';

const props = defineProps({
    type: Number,
    followers: Array,
    followed: Array,
    ownProfile: Boolean
})

const users = ref(null)
const user = ref({})
const checkedButtonsFollowed = ref([])
const checkedButtonsFollowers = ref([])
const checkRender = ref(false)

onMounted(() => {
    const appStore = useAppStore()
    user.value = appStore.getUser()
    if (props.type === 1) {
        users.value = props.followed
    }
    else if (props.type === 2) {
        users.value = props.followers
    }
    checkButtons(user, users)
});

async function checkButtons(user, users) {

    for (let i = 0; i < users.value.length; i++) {
        checkedButtonsFollowed.value.push("follow")
        checkedButtonsFollowers.value.push("follow")
    }

    if (props.type === 1) {
        for (let i = 0; i < users.value.length; i++) {
            for (let j = 0; j < user.value.followed.length; j++) {
                if (users.value[i].id === user.value.followed[j]) {
                    checkedButtonsFollowed.value[i] = "unfollow"
                }
            }
        }
    }
    else if (props.type === 2) {
        for (let i = 0; i < users.value.length; i++) {
            for (let j = 0; j < user.value.followers.length; j++) {
                if (users.value[i].id === user.value.followers[j]) {
                    checkedButtonsFollowers.value[i] = "unfollow"
                }
            }
        }
    }

    checkRender.value = true
}

async function changeFollow(index) {

}
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
    background-color: blue;
    margin-bottom: 10px;
    /* Agrega un margen inferior para separar los contenedores */
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