<template>
    <div v-if="ownProfile && checkRender" class="container">
        <div v-if="type === 1">
            <div v-for="(user, index) in users" :key="index" class="user-container" @click="router.push('/userprofile/' + user.userName)">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow :text="checkedButtonsFollowed[index]" @click="changeFollow(index, user.id)">
                    </ButtonFollow>
                </div>
            </div>
        </div>
        <div v-if="type === 2">
            <div v-for="(user, index) in users" :key="index" class="user-container" @click="router.push('/userprofile/' + user.userName)">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow :text="checkedButtonsFollowers[index]" @click="changeFollow(index, user.id)">
                    </ButtonFollow>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!ownProfile && checkRender" class="container">
        <div v-if="type === 1">
            <div v-for="(user, index) in users" :key="index" class="user-container" @click="router.push('/userprofile/' + user.userName)">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow :text="checkedButtonsFollowed[index]" @click="changeFollow(index, user.id)">
                    </ButtonFollow>
                </div>
            </div>
        </div>
        <div v-if="type === 2">
            <div v-for="(user, index) in users" :key="index" class="user-container" @click="router.push('/userprofile/' + user.userName)">
                <img class="user-avatar" :src="user.profilePic" alt="profilePic" />
                <div class="user-info">
                    <div>{{ user.userName }}</div>
                    <ButtonFollow :text="checkedButtonsFollowers[index]" @click="changeFollow(index, user.id)">
                    </ButtonFollow>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useAppStore } from '@/stores/app.js'
import ButtonFollow from './ButtonFollow.vue';
import * as funcionsCM from '@/communicationsManager.js'
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    type: Number,
    followers: Array,
    followed: Array,
    ownProfile: Boolean,
    changeFollowed: Function,
    changeFollowers: Function
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
        if (props.ownProfile) {
            for (let i = 0; i < checkedButtonsFollowed.value.length; i++) {
                checkedButtonsFollowed.value[i] = "unfollow"
            }
        }
        else {
            for (let i = 0; i < users.value.length; i++) {
                for (let j = 0; j < user.value.followed.length; j++) {
                    if (users.value[i].id === user.value.followed[j]) {
                        checkedButtonsFollowed.value[i] = "unfollow"
                    }
                    else if (users.value[i].id === user.value.id) {
                        checkedButtonsFollowed.value[i] = "you"
                    }
                }
            }
        }
    }
    else if (props.type === 2) {
        if (props.ownProfile) {
            for (let i = 0; i < checkedButtonsFollowers.value.length; i++) {
                checkedButtonsFollowers.value[i] = "eliminate"
            }
        }
        else {
            for (let i = 0; i < users.value.length; i++) {
                for (let j = 0; j < user.value.followers.length; j++) {
                    if (users.value[i].id === user.value.followers[j]) {
                        checkedButtonsFollowers.value[i] = "unfollow"
                    }
                    else if (users.value[i].id === user.value.id) {
                        checkedButtonsFollowed.value[i] = "you"
                    }
                }
            }
        }
    }

    checkRender.value = true
}

async function changeFollow(index, id) {
    const data = { idFollower: user.value.id, idFollowed: id }
    if (props.type === 1) {
        if (checkedButtonsFollowed.value[index] == "follow") {
            checkedButtonsFollowed.value[index] = "unfollow"
            funcionsCM.followUser(data)
            if (props.ownProfile) {
                props.changeFollowed(id, true)
            }
        }
        else {
            checkedButtonsFollowed.value[index] = "follow"
            funcionsCM.unfollowUser(data)
            if (props.ownProfile) {
                props.changeFollowed(id, false)
            }
        }
    }
    else if (props.type === 2) {
        if (checkedButtonsFollowers.value[index] == "follow") {
            checkedButtonsFollowers.value[index] = "unfollow"
            funcionsCM.followUser(data)
        }
        else if (checkedButtonsFollowers.value[index] == "unfollow") {
            checkedButtonsFollowers.value[index] = "follow"
            funcionsCM.unfollowUser(data)

        }
        else {
            props.changeFollowers(id)
            funcionsCM.unfollowUser({ idFollower: id, idFollowed: user.value.id })
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.user-container {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
    max-width: 600px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: background-color 0.3s;
}

.user-container:hover {
    background-color: #e0e0e0;
}

.user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
}

.user-info h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
}

button {
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>
